import React from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "../components/common/Button.jsx";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ main cartpage Container
/* ----------------------------------------------------------------------------------------------------- */

const CartPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"CART"} />
      <Cart></Cart>

      <Footer></Footer>
    </AnimationView>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ cart  Container
/* ----------------------------------------------------------------------------------------------------- */

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, brand: "xiaomi", name: " Tws Bujug", price: "40.00" },
    { id: 2, brand: "xiaomi", name: " Tws Bujug", price: "40.00" },
    { id: 3, brand: "xiaomi", name: " Tws Bujug", price: "40.00" },
  ]);

  return (
    <>
      <div className="container mx-auto mt-4 px-6 flex items-center md:items-start justify-between md:flex-row flex-col">
        <div className="md:w-[70%] w-[100%] ">
          <div className="flex items-center justify-between border border-gray-300 mt-2   rounded-xl   p-5 w-[100%]">
            <label className="flex ">
              <input
                type="checkbox"
                className="form-checkbox h-5 md:w-5    text-yellow-500  rounded-none"
                name="selectItem"
              />
              <p className="ml-2   text-bold">Select All</p>
            </label>

            <Button className="bg-black rounded-full text-sm text-white px-3 py-2">
              Clear All
            </Button>
          </div>

          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div
          className=" flex flex-col items-start justify-start
       border border-gray-300 max:m-10 w-[100%] md:mt-2  mt-8  rounded-xl  p-2 py-2  md:w-[25%]   max:h-48 "
        >
          <p className="text-xl font-bold p-2">Summary order</p>
          <div className="flex justify-between w-full">
            <p className="p-2 text-gray-400 ">Subtotal:</p>
            <span className=" p-2 font-bold text-black  ">$109</span>
          </div>

          <Button className="bg-black text-white  m-auto  py-2 px-4 rounded-full   text-xs  md:text-sm w-full md:w-36 xl:w-72">
            Place order
          </Button>
        </div>
      </div>
    </>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ cart card  Container
/* ----------------------------------------------------------------------------------------------------- */

const CartItem = ({ item }) => {
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
    <div className=" md:flex flex-wrap items-center m-0  xl: justify-between border border-gray-300 mt-4  rounded-xl  p-2 py-2 w-[100%]">
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
            <p>{item.name}</p>
            <span className="text-xs xl:text:sm">
              <span className="text-gray-400 ">Type:</span> Stereo
            </span>
            <span className="text-xs xl:text:sm">
              {" "}
              <span className="text-gray-400  ">color:</span> Blue
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
            <Button className="">
              <HiOutlineTrash className="w-5 h-5 text-gray-400 m-1 xl:m-4" />
            </Button>
          </div>

          <div class="flex items-center justify-end">
            <button
              class="bg-gray-100   py-2 px-4 border-t border-l border-b  border-gray-300 rounded-l-md hover:bg-gray-200"
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
              class="bg-gray-100   py-2 px-4 border-t border-r border-b border-gray-300  rounded-r-md hover:bg-gray-200"
              onClick={increment}
            >
              <HiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
