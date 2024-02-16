import React from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { RadioGroup } from "@headlessui/react";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "../components/common/Button.jsx";

const pMethod = [
  {
    name: "Plug Wallet",
    value: "plug-wallet",
  },
  /* {
    name: "Fiat Payment",
    value: "fiat-payment",
  }, */
  {
    name: "PAY WITH PAYPAL",
    value: "paypal-payment",
  },
];
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main checkout Container
/* ----------------------------------------------------------------------------------------------------- */

const CheckoutPage = () => {
  return (
    <>
      <AnimationView>
        <ScrollToTop />
        <Header title={"CheckOut"} />
        <Checkout />

        <Footer></Footer>
      </AnimationView>
    </>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ checkout Container
/* ----------------------------------------------------------------------------------------------------- */
const Checkout = () => {
  const [selected, setSelected] = useState(pMethod[0]);

  const [checkOut, setCheckOut] = useState([
    {
      id: 2,
      name: "Avanish ranjan srivastava",
      address: "Tarapur colony sector no-1 House no-138 jaunpur",
      pin: "222002",
      phone: "9554524783",
      product: "Tws bujug",
      price: "40.00",
    },
  ]);

  return (
    <>
      <div className="container mx-auto flex px-6 p-2 mt-4 items-start justify-between md:flex-row flex-col">
        <Button className="bg-black text-white   py-2 px-4 my-2 text-xs md:text-sm w-30 rounded-xl  md:w-36 xl:w-36  flex items-center justify-between   ">
          <FaArrowLeft /> Back to cart
        </Button>
      </div>
      <div className="container mx-auto flex px-6 items-center md:items-start justify-between md:flex-row flex-col">
        <div className="md:w-[70%] w-[100%] mr-4 md:mr-0">
          <div className="flex items-center justify-between border   border-gray-300   bg-black rounded-xl  p-5 w-[100%]">
            <div className="flex  ">
              <p className="w-6 text-black bg-white flex justify-center  rounded-md items-center ">
                1
              </p>
              <p className="ml-2   text-bold  text-white ">CheckOut</p>
            </div>
          </div>

          {checkOut.map((item) => (
            <CheckOutCard key={item.id} item={item} />
          ))}

          {/*Radio button for the payment method */}
          <div className="md:w-3/4 w-full mt-4">
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="text-black xl:text-sm  text-xs  m-font-semibold uppercase tracking-wider">
                Payment Method
              </RadioGroup.Label>
              <div className="grid xl:grid-cols-3 grid-cols-2 gap-4 mt-4">
                {pMethod.map((plan) => (
                  <RadioGroup.Option
                    key={plan.name}
                    value={plan}
                    className={({ active, checked }) =>
                      ` ${active ? "" : ""}
                          ${checked ? "bg-black text-white" : "bg-white"}
                            relative flex cursor-pointer rounded-md px-2 py-2  xl:w-48 max:w-48  focus:outline-none uppercase border-[1px] border-black tracking-widest`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className=" flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {plan.name}
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* <div className="border border-gray-300  flex mt-6 p-2 py-2 w-full rounded-xl">
              <button className="bg-black text-white   py-2 px-4 m-2 text-xs md:text-sm w-36 rounded-md  md:w-36 xl:w-48  flex items-center justify-between   ">
                Plug wallet <FaCheckCircle />
              </button>

              <button className="bg-black text-white ml-4 py-2 px-4 m-2 text-xs md:text-sm w-36 rounded-md  md:w-36 xl:w-48">
                Pay with paypal
              </button>
                            </div>*/}
        </div>
        <div
          className=" flex flex-col items-start md:justify-start   
       border border-gray-300    md:ml-12 w-[100%] mt-6 md:mt-0 mr-3  md:mr-0   rounded-xl  p-2 py-2  md:w-[30%]    md:h-74"
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
          <div className="w-full flex items-center justify-center">
            <Button className="bg-black text-white  p-2  text-md  rounded-full    w-64   ">
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  function for the radio button
/* ----------------------------------------------------------------------------------------------------- */
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------------------------------------------- */
/*   checkout card container
/* ----------------------------------------------------------------------------------------------------- */
const CheckOutCard = ({ item }) => {
  const [items, setItems] = useState(1);
  const increment = () => {
    setItems(items + 1);
  };
  const decrement = () => {
    if (items > 1) {
      setItems(items - 1);
    }
  };
  return (
    <>
      <div className=" md:flex flex-wrap items-center m-0   md: justify-between border border-gray-300 mt-4  rounded-xl  p-2 py-2 w-[100%]">
        <div>
          <div className="flex m-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-yellow-500  rounded-none"
              name="selectItem"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJNcA6I9f85ESkLkHq4HKYJ-CjzIdVXQTL25Am9yjcA&s"
              alt=""
              className="w-24  h-24 border border-gray-300 bg-gray-400 rounded-lg ml-2"
            />
            <div className="md:mt-6 md:ml-2 ml-4">
              <p className="border border-gray-300 rounded-full w-16 item-center pl-2">
                Other
              </p>
              <p>{item.product}</p>
              <span className="xl:text-sm text-xs">
                <span className="text-gray-400">Type:</span> Stereo
              </span>
              <span className="xl:text-sm text-xs">
                {" "}
                <span className="text-gray-400">color:</span> Blue
              </span>
            </div>
          </div>
        </div>
        <div className="xl:mt-4 mt-2">
          <div className="flex flex-col items-end  ">
            <s className="text-gray-400 text-xs">$50.00</s>

            <p className="text-left">{item.price}</p>
          </div>
          <div className="xl:flex">
            <div className="flex items-center justify-end">
              <button className="">
                <HiOutlineTrash className="w-5 h-5 text-gray-400 m-1 xl:m-4" />
              </button>
            </div>

            <div class="flex items-center justify-end">
              <button
                class="bg-gray-100 text-gray-700 py-2 px-4 border-t border-l border-b  border-gray-300 rounded-l-md hover:bg-gray-200"
                onClick={decrement}
              >
                <HiOutlineMinus />
              </button>
              <p
                type="text"
                class="w-16 text-center  py-1 px-2 border-t border-b border-gray-300   bg-gray-100  "
              >
                {items}
              </p>

              <button
                class="bg-gray-100 text-gray-700 py-2 px-4 border-t border-r border-b border-gray-300  rounded-r-md hover:bg-gray-200"
                onClick={increment}
              >
                <HiOutlinePlus />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" md:flex flex-wrap items-center    md: justify-between border border-gray-300    mt-4  rounded-xl   p-2 py-2 w-[100%]">
        <div className="flex     ">
          <div className="flex flex-wrap ">
            <p className="m-2 font-bold">{item.name}</p>

            <p className="border border-gray-300 bg-gray-300 rounded-md m-1 ml-5 md:ml-0 text-gray-500 w-16 flex items-center justify-center">
              Home
            </p>
            <span className="m-2 ml-5 md:ml-2 font-bold">{item.phone}</span>
            <p className="m-2    ">
              {item.address} <strong>{item.pin}</strong>
            </p>
          </div>
          <Button className="border   bg-black rounded-full m-2 ml-5 md:ml-0 text-white p-4 md:w-16 h-10 flex items-center justify-center">
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
