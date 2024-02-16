import React from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import { FaArrowRight } from "react-icons/fa";
import Button from "../components/common/Button.jsx";

const ShippingAddressPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"ADDRESS"} />
      <AddressDetail></AddressDetail>

      <Footer></Footer>
    </AnimationView>
  );
};
const AddressDetail = () => {
  const [Address, setAddress] = useState([
    {
      id: 1,
      name: "Avanish ranjan srivastava",
      address: "Tarapur colony sector no-1 House no-138 jaunpur",
      pin: "222002",
      phone: "9554524783",
    },
    {
      id: 2,
      name: "Avanish ranjan srivastava",
      address: "Tarapur colony sector no-1 House no-138 jaunpur",
      pin: "222002",
      phone: "9554524783",
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="container mx-auto px-6 mt-4 flex items-center md:items-start justify-between md:flex-row flex-col">
        <div className="md:w-[70%] w-[100%]  ">
          <div className="flex items-center justify-between border   border-gray-300  mt-2   bg-black rounded-xl  p-5 w-[100%]">
            <div className="flex  ">
              <p className="w-6 text-black bg-white flex justify-center  rounded-md items-center ">
                1
              </p>
              <p className="ml-2   text-bold  text-white ">DELIVERY ADDRESS</p>
            </div>
          </div>

          {Address.map((item) => (
            <AddressCard key={item.id} item={item} />
          ))}

          <div className="border border-gray-300    mt-6 p-2 py-2 w-full rounded-xl">
            <Button
              className="bg-black text-white ml-4  p-2 m-2 text-xs md:text-sm   rounded-full w-36 md:w-36 xl:w-48   "
              onClick={() => setShowForm(!showForm)}
            >
              <i className="fas fa-plus"></i> Add New Address
            </Button>
          </div>
          {/* Form */}
          <form
            className={`border border-gray-300  rounded-xl mt-6 p-2 py-2 w-full ${
              showForm ? "block" : "hidden"
            }`}
          >
            <h3 className="text-lg font-bold mb-4">Add New Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="border border-gray-300 p-2 rounded-xl w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="border border-gray-300 rounded-xl p-2 w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-1">
                  Email
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="border border-gray-300 rounded-xl p-2 w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="border border-gray-300 rounded-xl p-2 w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="border border-gray-300 rounded-xl p-2 w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="border border-gray-300 p-2 rounded-xl w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="pinCode" className="block mb-1">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  className="border border-gray-300 rounded-xl p-2 w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="border border-gray-300  rounded-xl p-2 w-full"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-black text-white mt-4 p-2 ml-4 rounded-full text-sm w-36 md:w-36 xl:w-48"
            >
              Submit
            </Button>
          </form>
        </div>
        <div
          className=" flex flex-col items-start md:justify-start   
       border border-gray-300  max:m-10  md:ml-12 w-[100%] mt-12 md:mt-2 rounded-xl  p-2 py-2  md:w-[30%]    md:h-74"
        >
          <p className="text-xl font-bold text-gray-500 p-2">PRICE DETAILS</p>
          <p className="w-full border-t border-gray-300"></p>
          <div className="flex justify-between w-full">
            <p className="p-2 text-gray-400">Price(2 items):</p>
            <span className="font-bold text-black item-end  p-2   ">$109</span>
          </div>
          <div className="flex justify-between w-full">
            <p className="p-2 text-gray-400"> Delivery Charges </p>
            <span className="   text-green-400   p-2  ">
              {" "}
              <s className="item-end text-gray-400">$109</s> Free
            </span>
          </div>
          <p className="w-full border-t border-dashed border-gray-300"></p>
          <div className="flex justify-between w-full">
            <p className="p-3 pt-6 text-black font-bold">Total Payable</p>
            <span className="font-bold text-black  p-3 pt-6   ">$109</span>
          </div>
          <p className="w-full border-t border-dashed border-gray-300"></p>
          <p className="text-green-400   mt-3 mb-2 ">
            Your total saving on this order is 2237
          </p>
          <div className="flex items-center justify-center w-full">
            <Button className="bg-black text-white  m-auto  py-2 px-4 rounded-full  flex items-center justify-center  text-xs  md:text-sm w-full ">
              Continue
              <span className="ml-2  ">
                <FaArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const AddressCard = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className=" md:flex flex-wrap items-center md: justify-between border border-gray-300    mt-4  rounded-xl   p-2 py-2 w-[100%]">
      <div>
        <label className="flex flex-wrap ">
          <input
            type="checkbox"
            className="form-checkbox h-5 md:w-5 md:m-2  mt-2 rounded-none "
            name="selectItem"
            onChange={handleCheckboxChange}
          />
          <p className="m-2 font-bold">{item.name}</p>

          <p className="border border-gray-300 bg-gray-300 rounded-md m-1 ml-5 md:ml-0 text-gray-500 w-16 flex items-center justify-center">
            Home
          </p>
          <span className="m-2 ml-5 md:ml-2 font-bold">{item.phone}</span>
          <p className="m-2 ml-5 md:ml-11">
            {item.address} <strong>{item.pin}</strong>
          </p>
        </label>

        {isChecked && (
          <>
            <div className="flex ml-11"></div>
            <Button className="bg-black text-white ml-4 p-2 text-xs rounded-full md:text-sm w-36 md:w-36 xl:w-48">
              DELIVER HERE
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShippingAddressPage;
