import React, { useEffect, useRef, useState } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import "intl-tel-input/build/js/utils.js";
import "./Styles/itelinput.css";
import { Country, State, City } from "country-state-city";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Common Input Component 
/* ----------------------------------------------------------------------------------------------------- */
const CommonInput = ({
  type,
  placeholder,
  label,
  value,
  onChange,
  disabled,
  divClass,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full items-center">
      <label className="h-full flex items-center w-full font-medium uppercase text-xs px-3">
        {label}
      </label>
      <div className="w-full flex">
        <input
          type={type}
          placeholder={placeholder}
          className={`focus:outline-none flex-1 px-3 py-2 border border-gray-300 h-full rounded-full text-black w-full placeholder:capitalize placeholder:font-light ${divClass}`}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Telephone Input Component ITel
/* ----------------------------------------------------------------------------------------------------- */
const TelephoneInput = ({
  divClass,
  inputClass,
  label,
  disabled,
  setPhone,
  phoneNumber,
  error,
}) => {
  const phoneInputRef = useRef(null);
  // Reference : https://github.com/jackocnr/intl-tel-input
  useEffect(() => {
    const iti = intlTelInput(phoneInputRef.current, {
      showSelectedDialCode: true,
      countrySearch: false,
      // Set Country base on Location ip address : reference : https://github.com/jackocnr/intl-tel-input > geoLookup
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            callback(data.country_code);
          })
          .catch(function () {
            callback();
          });
      },
    });
    // Set Country initially according to need
    // setPhone From main Component
    if (setPhone) {
      setPhone(iti);
    }
    if (phoneNumber !== undefined) {
      iti.setNumber(phoneNumber);
    }
    return () => {
      iti.destroy();
    };
  }, []);

  return (
    <div>
      {/*If no label no space will be there */}
      <div className="flex justify-between">
        {label !== undefined || null ? (
          <label className=" w-full font-medium  uppercase text-xs px-3 mb-1">
            {label}
          </label>
        ) : null}
        {error && (
          <span className="text-red-500 text-xs px-3 min-w-max">
            Invalid Phone Number
          </span>
        )}
      </div>

      <div className={divClass}>
        <input
          type="tel"
          id="phone"
          ref={phoneInputRef}
          className={inputClass}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ CountryInput : country-state-city : https://www.npmjs.com/package/country-state-city
/* ----------------------------------------------------------------------------------------------------- */
const CountryInput = ({
  setLocationInput,
  currCountry,
  currState,
  currCity,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(selectedCountry);

  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    // States based on the selected country
    const statesOfSelectedCountry = State.getStatesOfCountry(
      event.target.value
    );
    setSelectedState(statesOfSelectedCountry);

    // Update locationInput state in the parent component
    setLocationInput({
      country: event.target.options[event.target.selectedIndex].text,
    });
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    // Cities based on the selected country and state
    const citiesOfSelectedState = City.getCitiesOfState(
      selectedCountry,
      event.target.value
    );
    setCities(citiesOfSelectedState);

    // Get State name and update state
    setLocationInput((prev) => ({
      ...prev,
      state: event.target.options[event.target.selectedIndex].text,
    }));
  };

  const handleCityChange = (event) => {
    setLocationInput((prev) => ({
      ...prev,
      city: event.target.value,
    }));
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full items-center">
        <label className="h-full flex items-center w-full font-medium uppercase text-xs px-3">
          Country
        </label>
        <select
          className="focus:outline-none flex-1 px-3 py-2 border border-gray-300 h-full rounded-full text-black w-full placeholder:capitalize placeholder:font-light"
          name="country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">
            {currCountry ? currCountry : "Select Country"}
          </option>
          {countryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 w-full items-center">
        <label className="h-full flex items-center w-full font-medium uppercase text-xs px-3">
          State
        </label>
        <select
          className="focus:outline-none flex-1 px-3 py-2 border border-gray-300 h-full rounded-full text-black w-full placeholder:capitalize placeholder:font-light"
          name="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">{currState ? currState : "Select State"}</option>
          {stateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 w-full items-center">
        <label className="flex items-center w-full font-medium uppercase text-xs px-3">
          City
        </label>
        <select
          className="focus:outline-none flex-1 px-3 py-2 border border-gray-300 h-full rounded-full text-black w-full placeholder:capitalize placeholder:font-light"
          name="city"
          disabled={!selectedState}
          onChange={handleCityChange}
        >
          <option value="">{currCity ? currCity : "Select City"}</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export { CommonInput, TelephoneInput, CountryInput };
