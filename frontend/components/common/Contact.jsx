/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Contact.
/* ----------------------------------------------------------------------------------------------------- */
const Contact = () => {
  const [email, setEmail] = useState("");

  // handle email validation regex and send
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (isEmailValid(email)) {
      // Apply backend methods
      console.log("Email is valid!");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <div
      className="py-6 px-6 md:container md:mx-auto  flex flex-col justify-center items-center"
      data-aos="fade-up"
    >
      <div className="rounded-t-3xl bg-black/70 w-[80%] md:w-[90%] py-2"></div>
      <div className="rounded-t-3xl bg-black/80 w-[90%] md:w-[95%] py-2"></div>
      <div className="w-full flex px-6 py-12 bg-black bg-opacity-90 rounded-2xl flex-col gap-4 tracking-wider">
        <p className="text-4xl max-md:text-3xl font-semibold max-w-80 text-white">
          Ready to get our new stuff ?
        </p>
        <div className="flex justify-between max-md:flex-col gap-4 ">
          <div className="max-w-80">
            <SearchBar
              type="text"
              placeholder="john@doe.com"
              buttonText="send"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onSearchClick={() => handleEmailSubmit()}
            />
          </div>
          <div>
            <span className="flex flex-col items-start text-xs text-white gap-2">
              <p className="font-semibold text-sm">
                Stuffus for Homes and Needs
              </p>
              <p>
                We'll listen to your needs, identify the best approach and then
              </p>
              <p>
                create a bespoke smart EV charging solution that's right for
                you.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
