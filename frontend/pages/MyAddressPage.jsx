/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports 
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";
import Footer from "../components/common/Footer";
import { CommonInput, TelephoneInput } from "../components/common/CommonInput";
import { BsFillGeoAltFill } from "react-icons/bs";
import Button from "../components/common/Button";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base 
/* ----------------------------------------------------------------------------------------------------- */
const MyAddressPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Address"}></Header>
      <Hero />
      <MyAddressContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> 
/* ----------------------------------------------------------------------------------------------------- */
const MyAddressContainerMain = () => {
  return (
    <div className="container mx-auto py-6 tracking-wider">
      <div className="flex max-md:flex-col p-6 gap-6">
        <Tabs />
        <MyAddress />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> : <MyAddress Component />.
/* ----------------------------------------------------------------------------------------------------- */
const MyAddress = () => {
  // State for managing edit mode, new address, and selected address index
  const [editMode, setEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  // Entering edit mode
  const handleEditMode = () => {
    setEditMode(true);
  };

  // Adding a new address
  const handleNewAddress = () => {
    setNewAddress(true);
  };

  const userAddresses = [
    {
      firstName: "Avanish",
      lastName: "Srivastava",
      email: "avanish@example.com",
      address1: "uttar pradesh,address,address",
      address2: "Second address line, address",
      city: "Anytown",
      phoneNumber: "123-456-7890",
      pincode: "12345",
      state: "Uttar Pradesh",
      country: "India",
    },
    {
      firstName: "Ankur",
      lastName: "Nayak",
      email: "ankur@example.com",
      address1: "my addresses and address",
      address2: "guwahati",
      city: "guwahati",
      phoneNumber: "123-456-7890",
      pincode: "12345",
      state: "Assam",
      country: "India",
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-300">
      {/* Header */}
      <div className="flex justify-between px-2 sm:px-8 py-4 font-medium ">
        <h1 className="text-lg">My Address</h1>
        <Button onClick={handleNewAddress} className="text-sm">
          + Add a new Address
        </Button>
      </div>
      {/* Conditional rendering edit mode || new address */}
      {newAddress || editMode ? (
        // Render AddressForm for editing or adding a new address
        <div className="grid lg:grid-cols-2 gap-3 px-2 sm:px-8 py-4">
          <AddressForm
            userAddress={userAddresses[selectedAddressIndex]}
            setEditMode={setEditMode}
            isNewAddress={newAddress}
            setNewAddress={setNewAddress}
          />
        </div>
      ) : (
        // Displaying existing addresses
        userAddresses.map((address, index) => (
          <MyAddressSaved
            key={index}
            onEditMode={() => {
              handleEditMode();
              setSelectedAddressIndex(index);
            }}
            userAddress={address}
          />
        ))
      )}
    </div>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> : <MyAddressSaved Component />.
/* ----------------------------------------------------------------------------------------------------- */
const MyAddressSaved = ({ onEditMode, userAddress }) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    pin,
    state,
    country,
    phoneNumber,
  } = userAddress;

  const addressFields = [address1, address2, pin, state, country, phoneNumber];
  return (
    <div className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col max-lg:gap-3">
      <div className="gap-3 flex-1">
        {/* Display user's first name and last name */}
        <div className="flex gap-3">
          <div className="capitalize text-lg font-medium">
            {firstName} {lastName}
          </div>
        </div>

        {/* address details */}
        {addressFields.map((value, index) => (
          <div key={index} className="flex gap-3 text-sm font-medium">
            <div>{value}</div>
          </div>
        ))}
      </div>
      <div className="">
        <Button
          className="py-2 px-4 bg-gray-900 text-white font-medium text-sm lg:rounded-full max-lg:rounded-md"
          onClick={onEditMode}
        >
          Edit Address
        </Button>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> : <MyAddressSaved /> > <MyAddressForm component/>.
/* ----------------------------------------------------------------------------------------------------- */
const AddressForm = ({
  userAddress,
  setEditMode,
  isNewAddress,
  setNewAddress,
}) => {
  // Initial form values based on whether it's a new address or edit mode
  const initialFormValues = isNewAddress
    ? {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
      }
    : userAddress;

  // State to manage form values
  const [newAddressForm, setNewAddressForm] = useState(initialFormValues);

  // Handle Cancel button
  const handleCancel = () => {
    // Close edit mode and new address form
    setEditMode(() => false);
    setNewAddress(() => false);
  };

  return (
    <>
      {/* Form fields based on the newAddressForm state */}
      {Object.entries(newAddressForm).map(([key, value]) =>
        key === "phoneNumber" ? (
          <TelephoneInput
            key={key}
            label="Phone number"
            divClass="border border-gray-300 rounded-full"
            inputClass="focus:outline-none p-2 h-[38px] placeholder:font-light"
            value={value}
            onChange={(e) =>
              setNewAddressForm((prevForm) => ({
                ...prevForm,
                [key]: e.target.value,
              }))
            }
          />
        ) : (
          <CommonInput
            key={key}
            label={key.toLowerCase()}
            type="text"
            placeholder={key}
            value={value}
            onChange={(e) =>
              setNewAddressForm((prevForm) => ({
                ...prevForm,
                [key]: e.target.value,
              }))
            }
          />
        )
      )}
      {/* Save or Update Address button */}
      <div className="py-6 flex gap-3">
        <Button className="p-2 text-white border border-gray-700 bg-gray-700 rounded-full font-medium text-sm">
          {isNewAddress ? "Save Address" : "Update Address"}
        </Button>
        {/* Cancel button */}
        <Button
          className="p-2 text-black bg-white border border-gray-900 rounded-full font-medium text-sm"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default MyAddressPage;
