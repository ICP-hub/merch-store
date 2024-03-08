import React, { useState, useEffect } from "react";
import UserAddressApiHandler from "../../apiHandlers/UserAddressApiHandler";
import useFormValidation from "../common/FormValidation";
import {
  CommonInput,
  CountryInput,
  TelephoneInput,
} from "../common/CommonInput";
import { TailSpin } from "react-loader-spinner";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : ShippingAddress page <MyAddressForm component/>.
/* ----------------------------------------------------------------------------------------------------- */
const AddressForm = ({
  onCancel,
  isNew,
  initialFormValues,
  isLoading,
  setIsLoading,
  setSuccessfulSubmit,
}) => {
  const [formValues, setFormValues] = useState(initialFormValues || {});
  const { createAddress, updateAddress } = UserAddressApiHandler();
  const [phone, setPhone] = useState(null);
  // Get location from selected input : Country, State, City
  const [locationInput, setLocationInput] = useState({});

  // Define validation rules for each form field
  const validationRules = {
    firstname: [{ required: true }],
    lastname: [{ required: true }],
    email: [
      {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
        error: "Invalid email",
      },
    ],
    // phoneNumber: [{ required: true }],
    addressline1: [{ required: true }],
    // city: [{ required: true }],
    pincode: [{ required: true }],
    // state: [{ required: true }],
    // country: [{ required: true }],
  };

  const { validationErrors, validateForm } = useFormValidation(validationRules);

  // handle Input value changes
  const handleChange = (key, value) => {
    setFormValues((prevForm) => ({ ...prevForm, [key]: value }));
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    const errors = validateForm(formValues);
    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    // Form Valid? : try catch block in UserAddressApiHanlder
    const updatedFormValues = {
      ...formValues,
      phone_number: phone.getNumber(),
      ...locationInput,
    };

    createAddress(updatedFormValues, setIsLoading, setSuccessfulSubmit);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    const errors = validateForm(formValues);
    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    // Form Valid? : try catch block in UserAddressApiHanlder
    const updatedFormValues = {
      ...formValues,
      phone_number: phone.getNumber(),
      ...locationInput,
    };

    updateAddress(updatedFormValues, setIsLoading, setSuccessfulSubmit);
  };

  const formFields = [
    { key: "firstname", label: "First Name", type: "text" },
    { key: "lastname", label: "Last Name", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "phone_number", label: "Phone Number", type: "tel" },
    { key: "addressline1", label: "Address Line 1", type: "text" },
    { key: "addressline2", label: "Address Line 2", type: "text" },
    { key: "pincode", label: "Pincode", type: "text" },
    { key: "country", label: "Country", type: "select" },
  ];

  return (
    <form
      onSubmit={isNew ? handleSubmit : handleUpdateSubmit}
      className="grid lg:grid-cols-2 gap-3 px-2 sm:px-8 py-4 border-t"
    >
      {formFields.map((field) => {
        const { key, type, label } = field;

        return type === "tel" ? (
          <TelephoneInput
            key={key}
            label={label}
            divClass="border border-gray-300 rounded-full"
            inputClass="focus:outline-none p-2 h-[38px] placeholder:font-light"
            setPhone={setPhone}
            phoneNumber={formValues?.phone_number}
          />
        ) : type === "select" ? ( // Render the CountryInput component
          <CountryInput
            key={key}
            setLocationInput={setLocationInput}
            currCountry={formValues?.country}
            currState={formValues?.state}
            currCity={formValues?.city}
          />
        ) : (
          <div key={key} className="flex flex-col gap-1 w-full">
            <div className="flex">
              <label className="h-full flex items-center w-full font-medium uppercase text-xs px-3">
                {label}
              </label>
              {validationErrors[key] && (
                <span className="text-red-500 text-xs min-w-max">
                  {validationErrors[key]}
                </span>
              )}
            </div>

            <CommonInput
              key={key}
              type="text"
              placeholder={label.toLowerCase()}
              value={formValues[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        );
      })}
      <div className="py-6 flex gap-3">
        <button
          type="submit"
          className="p-2 min-w-[126px] text-white border border-gray-700 bg-gray-700 rounded-full font-medium text-sm relative"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : isNew ? (
            "Save Address"
          ) : (
            "Update Address"
          )}
        </button>
        <button
          type="button"
          className="p-2 text-black bg-white border border-gray-900 rounded-full font-medium text-sm"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
