import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { RadioGroup } from "@headlessui/react";
import { FaArrowLeft } from "react-icons/fa";
import { HiCheckBadge, HiCheckCircle, HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "../components/common/Button.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartApiHandler from "../apiHandlers/CartApiHandler.jsx";
import ProductApiHandler from "../apiHandlers/ProductApiHandler.jsx";
import {
  getCartItemDetails,
  totalCartSellPrice,
} from "../apiHandlers/cartUtils.js";
import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler.jsx";
import NoImage from "../assets/placeholderImg-Small.jpeg";
import { TailSpin } from "react-loader-spinner";
import EmptyCart from "../components/ProductComponents/EmptyCart.jsx";

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

// Payment methods
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
    name: "Pay with paypal",
    value: "paypal-payment",
  },
];

/* ----------------------------------------------------------------------------------------------------- */
/*  @ checkout Container
/* ----------------------------------------------------------------------------------------------------- */
const Checkout = () => {
  const { getCallerCartItems } = CartApiHandler();
  const { productList, getProductList } = ProductApiHandler();
  const [paymentMethod, setPaymentMethod] = useState(pMethod[0]);
  const [cartItems, setCartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(1);
  const [userAddress, setUserAddress] = useState(null);
  const cartItemDetails = getCartItemDetails(cartItems, productList);
  // console.log(cartItemDetails);

  useEffect(() => {
    getProductList();
    getCallerCartItems(setIsLoading, setCartItems);
  }, []);

  useEffect(() => {
    if (cartItemDetails) {
      const total = totalCartSellPrice(cartItemDetails);
      const totalQuantity = cartItemDetails.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
      setTotalPrice(total);
      setTotalQty(totalQuantity);
    }
  }, [isLoading]);

  const proccedData = () => {
    // productList,shippingAddress,totalAmount,subTotal,paymentMethod
    // return {
    //   shippingAddress: userAddress,
    //   totalAmount: totalPrice,
    //   subTotal: totalPrice,
    //   paymentMethod: paymentMethod,
    // };
    console.log("working");
  };

  return (
    <div className="container mx-auto py-6 max-md:px-2">
      <div className="pb-4">
        <Button className="flex items-center px-4 py-2 bg-black text-white gap-2 rounded-xl uppercase text-sm font-medium max-w-max">
          <FaArrowLeft />
          Back to cart
        </Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {cartItemDetails && cartItemDetails.length > 0 ? (
            <div className="flex gap-4 tracking-wider max-md:flex-col">
              <div className="flex flex-col gap-4 flex-1">
                <span className="bg-black rounded-xl text-white py-4 px-6 font-medium">
                  Checkout
                </span>
                {cartItemDetails.map((cartItem, index) => (
                  <CheckoutCard
                    key={index}
                    cartItem={cartItem}
                    setTotalPrice={setTotalPrice}
                    totalPrice={totalPrice}
                    setTotalQty={setTotalQty}
                    totalQty={totalQty}
                  />
                ))}
                <AddressSection
                  setUserAddress={setUserAddress}
                  userAddress={userAddress}
                />
                <PaymentSection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  pMethod={pMethod}
                />
              </div>
              <div className="border-2 rounded-2xl max-h-80 lg:min-w-96">
                <BillSection
                  totalPrice={totalPrice}
                  totalQty={totalQty}
                  proccedData={proccedData}
                />
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <CheckoutCard />
/* ----------------------------------------------------------------------------------------------------- */
const CheckoutCard = ({
  cartItem,
  setTotalPrice,
  totalPrice,
  setTotalQty,
  totalQty,
}) => {
  const [prodQty, setProdQty] = useState(cartItem.quantity);
  const [checked, setChecked] = useState(false);
  const [updatedPriceNQty, setupdatedPriceNQty] = useState({
    price: totalPrice,
    qty: totalQty,
  });

  // Increment logic
  const handleIncrement = () => {
    setProdQty((prev) => prev + 1);
    setChecked(true);
    setupdatedPriceNQty((prev) => ({
      ...prev,
      price: prev.price + cartItem.variantSellPrice,
      qty: prev.qty + 1,
    }));
  };

  // Decrement logic
  const handleDecrement = () => {
    if (prodQty > 1) {
      setProdQty((prev) => prev - 1);
      setChecked(true);
      setupdatedPriceNQty((prev) => ({
        ...prev,
        price: prev.price - cartItem.variantSellPrice,
        qty: prev.qty - 1,
      }));
    }
  };

  // Total Price logic
  const updateTotalPriceNQty = () => {
    setChecked(false);
    setTotalPrice(updatedPriceNQty.price);
    setTotalQty(updatedPriceNQty.qty);
  };

  useEffect(() => {
    setProdQty(cartItem.quantity);
  }, [cartItem.quantity]);

  useEffect(() => {
    setupdatedPriceNQty((prev) => ({
      ...prev,
      price: totalPrice,
      qty: totalQty,
    }));
  }, [totalPrice]);

  return (
    <div className="border-2 rounded-2xl p-6 flex max-lg:flex-col">
      <div className="flex gap-4 flex-1">
        <div className="flex p-1 border border-gray-300 rounded-xl">
          <img
            src={cartItem.img1 === "" ? NoImage : cartItem.img1}
            alt={cartItem.product.title}
            className="max-w-24 max-h-24 object-contain rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="border border-gray-300 px-2 py-1 text-xs uppercase font-medium rounded-full max-w-max">
            {cartItem.product.category}
          </span>
          <p className="text-lg font-semibold capitalize">
            {cartItem.product.title}
          </p>
          <span className="flex gap-4">
            <p className="capitalize text-xs">Size: {cartItem.size}</p>
            <p className="capitalize text-xs">Color : {cartItem.color}</p>
          </span>
        </div>
      </div>
      <div className="flex justify-end flex-col gap-2 items-end">
        <p className="line-through text-gray-500">${cartItem.variantPrice}</p>
        <p className="font-semibold text-2xl flex">
          <span className="text-sm">$</span>
          {cartItem.variantSellPrice * prodQty}
        </p>
        <div className="flex gap-4 items-center">
          <Button>
            <HiOutlineTrash size={24} color="grey" />
          </Button>
          <div className="flex items-center border rounded-md border-gray-300">
            <Button
              className="p-2 border-r border-r-gray-300"
              onClick={handleDecrement}
            >
              <HiOutlineMinus size={18} />
            </Button>
            <span className="min-w-16 flex items-center justify-center">
              {prodQty}
            </span>
            <Button
              className="p-2 border-l border-l-gray-300"
              onClick={handleIncrement}
            >
              <HiOutlinePlus size={18} />
            </Button>
          </div>
          {checked ? (
            <HiCheckBadge
              color="green"
              size={24}
              className="cursor-pointer"
              onClick={updateTotalPriceNQty}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <AddressSection />
/* ----------------------------------------------------------------------------------------------------- */
const AddressSection = ({ setUserAddress, userAddress }) => {
  const { getAddressList } = UserAddressApiHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [userAddressList, setUserAddressList] = useState(null);

  const addressConfig = () => {
    const localStorageAddress = JSON.parse(localStorage.getItem("CurrAddress"));
    if (localStorageAddress !== null && localStorageAddress !== undefined) {
      setUserAddress(localStorageAddress);
      return;
    }
    if (userAddressList && userAddressList.length > 0) {
      setUserAddress(userAddressList[0]);
    }
  };

  useEffect(() => {
    getAddressList(setUserAddressList, setIsLoading);
    addressConfig();
  }, []);

  return (
    <div className="p-6 border-2 rounded-2xl">
      {isLoading && <p>Loading...</p>}
      {!isLoading && !userAddress && (
        <div className="flex gap-4">
          <p>No address found! Please select an addres to proceed</p>
          <Link
            to="/shipping-address"
            className="text-xs font-medium border-2 rounded-md px-4 py-2"
          >
            Select address
          </Link>
        </div>
      )}
      {!isLoading && userAddress && (
        <div className="flex max-md:flex-col justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-medium capitalize flex gap-2">
              <span>{userAddress.firstname}</span>
              <span>{userAddress.lastname}</span>
            </h1>
            <div className="flex gap-2 text-sm">
              <span>{userAddress.addressline1}</span>
              <span>{userAddress.addressline2}</span>
            </div>
            <p className="font-medium text-sm">{userAddress.phone_number}</p>
            <div className="flex font-medium text-sm">
              <span>{userAddress.pincode}</span>,
              <span>{userAddress.state}</span>
            </div>
          </div>
          <Link
            to="/shipping-address"
            className="px-4 py-2 bg-gray-900 rounded-md text-white font-medium text-xs uppercase max-h-8 max-w-max"
          >
            Edit Address
          </Link>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <PaymentSection />
/* ----------------------------------------------------------------------------------------------------- */
const PaymentSection = ({ paymentMethod, setPaymentMethod, pMethod }) => {
  return (
    <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
      <RadioGroup.Label className="text-black xl:text-sm text-xs font-semibold uppercase tracking-wider">
        Payment Method
      </RadioGroup.Label>
      <div className="grid xl:grid-cols-3 grid-cols-2 gap-4 py-4 max-sm:flex max-sm:flex-col font-medium">
        {pMethod.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ active, checked }) =>
              `border-2 p-3 rounded-xl text-sm uppercase ${
                checked ? "bg-black text-white border-black" : "bg-white"
              }`
            }
          >
            {({ checked }) => (
              <RadioGroup.Label className="flex justify-between w-full items-center">
                <p>{plan.name}</p>
                {checked && (
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#fff"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </RadioGroup.Label>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <BillSection />
/* ----------------------------------------------------------------------------------------------------- */
const BillSection = ({ totalPrice, totalQty, proccedData }) => {
  return (
    <div className="flex flex-col">
      <div className="border-b-2 py-6">
        <span className="uppercase font-semibold px-6 text-xl text-slate-500">
          Price details
        </span>
      </div>
      <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
        <div className="flex justify-between px-6 gap-2 font-medium">
          <p className="text-slate-500">
            Price
            <span className="italic">
              ({totalQty} {totalQty > 1 ? "items" : "item"})
            </span>
          </p>
          <span className="font-bold">${totalPrice}</span>
        </div>
        <div className="flex justify-between px-6 gap-2 font-medium">
          <p className="capitalize text-slate-500">Delivery charges</p>
          <span className="flex gap-2">
            <p className="text-green-700 font-bold">Free</p>
          </span>
        </div>
      </div>
      <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
        <div className="flex justify-between px-6 gap-2 font-bold">
          <p className="capitalize">Total Payable</p>
          <span>${totalPrice}</span>
        </div>
      </div>
      <div className="p-6 flex w-full">
        <Button
          className="px-4 py-2 bg-black text-white font-semibold rounded-md w-full"
          onClick={() => proccedData()}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
