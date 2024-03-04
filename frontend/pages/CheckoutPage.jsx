import React, { useEffect } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartApiHandler from "../apiHandlers/CartApiHandler.jsx";
import ProductApiHandler from "../apiHandlers/ProductApiHandler.jsx";
import {
  getCartItemDetails,
  totalCartSellPrice,
} from "../apiHandlers/cartUtils.js";
import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler.jsx";
import NoImage from "../assets/placeholderImg.png";
import { TailSpin } from "react-loader-spinner";

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
  // Get data passed by shipping-addresspage as navigation state
  const { state } = useLocation();
  const { cartItems, getCallerCartItems, orderPlacement, isLoading } =
    CartApiHandler();
  const { productList, getProductList } = ProductApiHandler();
  const [itemQuantities, setItemQuantities] = useState([]);
  const [priceAfterChange, setPriceAfterChange] = useState(0);
  const { userAddessList, getAddressList } = UserAddressApiHandler();

  // Increment button
  const handleIncrement = (index) => {
    setItemQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = (newQuantities[index] || 0) + 1;

      const itemSellingPrice = itemDetails[index]?.variantSellPrice || 0;
      const newPriceAfterChange = priceAfterChange + itemSellingPrice;
      setPriceAfterChange(newPriceAfterChange);
      return newQuantities;
    });
  };

  const fetchAddress = () => {
    // If address is present : state
    if (state) {
      return state;
    }
    // If CurrAdress is present : localStorage
    const localStorageAddress = JSON.parse(localStorage.getItem("CurrAddress"));
    if (localStorageAddress) {
      return localStorageAddress;
    } else if (userAddessList && userAddessList.length > 0) {
      // If CurrAdress is not in localStorage : latest address from userAddessList
      const latestAddress = userAddessList[userAddessList.length - 1][1];
      return latestAddress;
    } else {
      return null;
    }
  };

  const Address = fetchAddress();

  const handleDecrement = (index) => {
    setItemQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;

        const itemSellingPrice = itemDetails[index]?.variantSellPrice || 0;
        const newPriceAfterChange = priceAfterChange - itemSellingPrice;

        setPriceAfterChange(newPriceAfterChange);
      }
      return newQuantities;
    });
  };

  // Get CartItemDetails object : cartUtils.js
  const cartItemDetails = getCartItemDetails(cartItems, productList);
  // console.log("Cart Item Details : ", cartItemDetails);
  // Sell Price
  const initialTotalPrice = totalCartSellPrice(cartItemDetails);
  // Toal price after increase or decrease qty
  const finalTotalPrice = initialTotalPrice + priceAfterChange;
  // Extract properties from cartItemDetails
  // console.log(cartItemDetails);
  const itemDetails = cartItemDetails?.map(
    ({
      quantity,
      color,
      orderId,
      product: { category, title, slug, img },
      size,
      variantPrice,
      variantSellPrice,
      variantSellPriceBasedOnQty,
    }) => ({
      quantity,
      color,
      orderId,
      category,
      title,
      img,
      size,
      slug,
      variantPrice,
      variantSellPrice,
      variantSellPriceBasedOnQty,
    })
  );

  const handleOrderPlacement = () => {
    const products = itemDetails.map(
      ({ slug, img, title, color, size, variantSellPrice, quantity }) => {
        return {
          id: slug,
          img: img,
          title: title,
          color: color,
          size: size,
          sale_price: variantSellPrice,
          quantity: quantity,
        };
      }
    );
    const shippingAddress = Address;
    const totalAmount = finalTotalPrice;
    const subTotal = finalTotalPrice;
    const paymentMethod = selected.value;
    orderPlacement(
      products,
      shippingAddress,
      totalAmount,
      subTotal,
      paymentMethod
    );
  };

  useEffect(() => {
    // Set initial itemQuantities from itemDetails
    if (itemQuantities.length === 0 && itemDetails.length > 0) {
      setItemQuantities(itemDetails.map((item) => item.quantity));
    }
  }, [itemDetails, itemQuantities]);

  // Fetch data parallelly when the component mounts
  useEffect(() => {
    getProductList();
    getCallerCartItems();
    getAddressList();
  }, []);

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

          {itemDetails?.map((item, index) => (
            <CheckOutCard
              cartItem={item}
              key={index}
              increment={() => handleIncrement(index)}
              decrement={() => handleDecrement(index)}
              numofItems={itemQuantities[index] || 1}
            />
          ))}
          <AddressCardContainer address={Address} />

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
        </div>
        <div
          className=" flex flex-col items-start md:justify-start   
       border border-gray-300    md:ml-12 w-[100%] mt-6 md:mt-0 mr-3  md:mr-0   rounded-xl  p-2 py-2  md:w-[30%]    md:h-74"
        >
          <p className="text-xl font-bold text-gray-500 p-2">PRICE DETAILS</p>
          <p className="w-full border-t border-gray-300"></p>
          <div className="flex justify-between w-full">
            <p className="p-2 text-gray-400">
              Price(
              {itemDetails?.length > 1
                ? itemDetails?.length + " Items"
                : itemDetails?.length + " Item"}
              ):
            </p>
            <span className="font-bold text-black item-end  p-2   ">
              ${finalTotalPrice}
            </span>
          </div>
          <div className="flex justify-between w-full">
            <p className="p-2 text-gray-400"> Delivery Charges </p>
            <span className="   text-green-400   p-2  ">
              {" "}
              <s className="item-end text-gray-400">${finalTotalPrice}</s> Free
            </span>
          </div>
          <p className="w-full border-t border-dashed border-gray-300"></p>
          <div className="flex justify-between w-full">
            <p className="p-3 pt-6 text-black font-bold">Total Payable</p>
            <span className="font-bold text-black  p-3 pt-6   ">
              ${finalTotalPrice}
            </span>
          </div>
          <p className="w-full border-t border-dashed border-gray-300"></p>
          <div className="w-full flex items-center justify-center">
            <Button
              className="bg-black text-white  p-2  text-md  rounded-full min-w-full min-h-12"
              onClick={handleOrderPlacement}
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
              ) : (
                "Proceed"
              )}
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
const CheckOutCard = ({ cartItem, increment, decrement, numofItems }) => {
  return (
    <div className="py-4">
      <div className="flex border border-gray-300 rounded-xl p-4 max-lg:flex-col">
        <div className="flex gap-4 flex-1">
          <div className="flex p-1 border border-gray-300 rounded-xl">
            <img
              src={cartItem.img === "" ? NoImage : cartItem.img}
              alt={cartItem.title}
              className="max-w-24 max-h-24 object-contain rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="border border-gray-300 px-2 py-1 text-xs uppercase font-medium rounded-full max-w-max">
              {cartItem.category}
            </span>
            <p className="text-lg font-semibold capitalize">{cartItem.title}</p>
            <span className="flex gap-4">
              <p className="capitalize text-xs">Size: {cartItem.size}</p>
              <p className="capitalize text-xs">Color : {cartItem.color}</p>
            </span>
          </div>
        </div>
        <div className="flex justify-end flex-col gap-2 items-end">
          <p className="line-through text-gray-500 text-sm">
            ${cartItem.variantPrice}
          </p>
          <p className="font-medium">${cartItem.variantSellPrice}</p>
          <div className="flex gap-4">
            <Button>
              <HiOutlineTrash size={24} color="#ff8383" />
            </Button>
            <div className="flex items-center border rounded-md border-gray-300">
              <Button
                className="p-2 border-r border-r-gray-300"
                onClick={decrement}
              >
                <HiOutlineMinus size={18} />
              </Button>
              <span className="min-w-16 flex items-center justify-center">
                {numofItems}
              </span>
              <Button
                className="p-2 border-l border-l-gray-300"
                onClick={increment}
              >
                <HiOutlinePlus size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressCardContainer = ({ address }) => {
  // Check if address is provided, otherwise set default values
  const {
    firstname = "",
    lastname = "",
    phone_number = "",
    pincode = "",
    addressline1 = "",
    addressline2 = "",
    state = "",
    address_type = "",
  } = address || {};

  // By Clicking edit navigate to shipping address page again so that we can re-select address
  // const navigate = useNavigate();

  if (!address) {
    // If address is null don't show the component - or any custom
    return null; // or any other fallback content
  }

  return (
    <div className="py-4">
      <div className="border border-gray-300 rounded-xl p-4">
        <div className="flex gap-3 flex-col">
          <div className="flex-1 flex sm:items-center gap-2 max-sm:flex-col">
            <p className="font-bold capitalize min-w-max">
              {firstname} {lastname}
            </p>
            <span className="px-2 py-1 rounded-md bg-gray-300 text-gray-500 uppercase text-xs flex items-center max-w-max font-semibold">
              {address_type}
            </span>
            <p className="font-semibold">{phone_number}</p>
          </div>
          <div className="font-semibold">
            {addressline1},{addressline2},{pincode},{state}
          </div>
          <Link
            tp="/shipping-address"
            className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold max-w-max"
            // onClick={() => navigate("/shipping-address")}
          >
            Change
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
