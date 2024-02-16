import React, { useEffect, useRef } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import "intl-tel-input/build/js/utils.js";
import "./Styles/itelinput.css";
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
}) => {
  return (
    <div className=" flex flex-col gap-1 w-full items-center">
      <label className=" h-full flex items-center w-full font-medium  uppercase text-xs px-3">
        {label}
      </label>
      <div className="w-full flex">
        <input
          type={type}
          placeholder={placeholder}
          className="focus:outline-none flex-1 px-3 py-2 border border-gray-300 h-full rounded-full text-black w-full placeholder:capitalize placeholder:font-light"
          value={value}
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
const TelephoneInput = ({ divClass, inputClass, label, disabled }) => {
  const phoneInputRef = useRef(null);
  // Reference : https://github.com/jackocnr/intl-tel-input
  useEffect(() => {
    const iti = intlTelInput(phoneInputRef.current, {
      showSelectedDialCode: true,
      countrySearch: false,
    });

    return () => {
      iti.destroy();
    };
  }, []);

  return (
    <div>
      {/*If no label no space will be there */}
      {label !== undefined || null ? (
        <label className=" w-full font-medium  uppercase text-xs px-3 mb-1">
          {label}
        </label>
      ) : null}

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

export { CommonInput, TelephoneInput };
