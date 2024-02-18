// ProductDetailPage.js

import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import Button from "../components/common/Button.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ConnectButton,
  ConnectDialog,
  useCanister,
  useConnect,
  useDialog,
} from "@connect2ic/react";

const shirtList = [
  {
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
    category: "Clothing and Accessories",
    subCategory: "Topwear",
    type: "T-shirts",
    gender: "Men's",
    brand: "BLIVE",
    name: "Typography Men Round Neck Brown,Black T-Shirt",
    description:
      "Pack of 2 Men Typography Round Neck Cotton Blend Brown, Black T-Shirt",
    specialPrice: 389,
    originalPrice: 1999,
    discountPercentage: 80,
    ratings: 3.5,
    numRatings: 22896,
    numReviews: 1514,

    sizeOptions: ["XS", "S", "M", "L", "XL", "XXL"],
    availableOffers: [
      "10% off on HSBC Bank Credit Card and EMI Transactions, up to ₹1,500 on orders of ₹5,000 and above",
      "Extra ₹500 off on HSBC Bank Credit Card EMI Transactions on products priced ₹24,990 and above",
      "5% Cashback on Flipkart Axis Bank Card",
      "Get at flat ₹389",
      // add more offers if available
    ],
    colorOptions: ["Brown", "Black", "Blue", "Orange", "Green", "Red"],
  },
  {
    name: "Red Graphic Tee",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Green Polo Shirt",
    image: " https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Yellow Striped Shirt",
    image: " https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Blue Casual Shirt",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Red Graphic Tee",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Green Polo Shirt",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Yellow Striped Shirt",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
];

const ProductDetailPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"DETAILS"} />
      <ProductDetail />

      <Footer />
    </AnimationView>
  );
};
const ProductDetail = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState("");

  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    "RED",
    "GREEN",
    "BLUE",
    "YELLOW",
    "PURPLE",
    "ORANGE",
    "PINK",
    "TEAL",
    "INDIGO",
    "CYAN",
    "LIME",
    "GRAY",
  ];

  const useBackend = () => {
    return useCanister("backend");
  };

  const getUser = async () => {
    try {
      const item = await backend.getProduct(slug);

      setData(item.ok);

      if (item.ok) {
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing user:", error);
    } finally {
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getUser();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const AddToCart = async () => {
    try {
      const res = await backend.addtoCartItems(
        slug,
        data.inventory,
        { title: data.title, slug: slug, short: "someShort" },
        { title: data.title, color: "red", slug: slug }
      );

      if ("ok" in res) {
        toast.success("item added to cart Successfully");
        console.log("     Item added successfully     ", res);
      } else {
        // Log an error if the response does not have "ok" property
        console.error("Unexpected response from backend:", res);
      }
    } catch (error) {
      // Log the error for debugging
      console.error("An error occurred adding items to cart:", error);
    } finally {
      setLoading(false);
      console.log("hello");
    }
  };

  const AddToWishlist = async () => {
    try {
      const res = await backend.addtoWishlist(slug);

      if ("ok" in res) {
        toast.success("item added to wishlist Successfully");
        console.log("     Item added  to wishlist successfully     ", res);
      } else {
        // Log an error if the response does not have "ok" property
        console.error("Unexpected response from backend:", res);
      }
    } catch (error) {
      // Log the error for debugging
      console.error("An error occurred adding items to wishlist:", error);
    } finally {
      setLoading(false);
      console.log("hello");
    }
  };
  return (
    <>
      <div className="container mx-auto xl:mt-12 mt-6 px-6 flex items-center md:items-start justify-between md:flex-col flex-col">
        <div className="flex flex-col   max-w-full  xl:ml-0  lg:flex-row">
          <div className="lg:w-2/5 xl:pr-6 relative ">
            {/* Product Image */}
            <img
              src="https://dummyimage.com/500x500/EF9A9A/fff" // Replace with the actual image source
              alt={data.title}
              className="w-full  rounded-md"
            />
            <div className="absolute top-2 left-2 bg-white py-1 px-2 rounded-full text-sm cursor-pointer font-semibold">
              {data.category}
            </div>

            <button
              className={`absolute top-2  right-2 xl:right-8 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px]`}
              onClick={AddToWishlist}
            >
              {<IoHeartOutline size="1.5em" />}
            </button>

            <div className=" w-full flex mt-4 pr-4  gap-2 ">
              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt="img1"
                className="w-1/3 rounded-md  "
              />
              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt="img2"
                className="w-1/3 rounded-md "
              />
              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt="img3"
                className="w-1/3 rounded-md "
              />
            </div>
            {/* Buy Now and Add to Cart Buttons */}
            <div className="flex mt-4">
              <Button
                className="bg-black text-white py-2 px-4 rounded-full w-full mb-2 lg:w-1/2 mr-2"
                onClick={AddToWishlist}
              >
                Buy Now
              </Button>

              <Button
                className="bg-black text-white py-2 px-4 rounded-full w-full  mb-2 lg:w-1/2"
                onClick={AddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="lg:w-3/5 mt-4 ml-6 lg:mt-0">
            {/* Product Details */}
            <h2 className="xl:text-2xl  font-bold mb-4">{data.slug}</h2>
            {/* Description */}
            <div className="mb-4">
              <p className="text-gray-700">{data.inventory}</p>
            </div>

            {/* Ratings */}
            <div className="mb-4 flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className="text-yellow-500 text-2xl inline-block"
                >
                  {index < Math.floor(shirtList[0].ratings) ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )}
                </span>
              ))}
              <p className="text-gray-800 ml-2">
                ({shirtList[0].numReviews} reviews)
              </p>
            </div>

            {/* Prices */}
            <div className="mb-4 flex items-center  text-gray-700">
              Price:
              <p className="text-green-600 mr-2">${data.price}</p>
              <p className="text-gray-600">
                <s>${shirtList[0].originalPrice}</s>
              </p>
            </div>

            {/* Color and Size Options */}
            <div className="mb-4 space-y-3">
              <div>
                <h2 className="text-sm text-gray-700   mb-2">
                  COLOR OPTIONS :{selectedColor}
                </h2>
                <div className="flex  flex-wrap">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`w-10 h-10 m-1 rounded-full bg-${color} cursor-pointer ${
                        selectedColor === color
                          ? "border-[2px] border-gray-300 shadow-md   scale-125  "
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
                <div></div>
              </div>
              <div>
                <h2 className="text-sm text-gray-700 mb-4">
                  SELECT SIZE:{selectedSize}
                </h2>
                <div className="flex flex-wrap  ">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className={`bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-md cursor-pointer mr-2 mb-2 ${
                        selectedSize === size
                          ? "border-black scale-125"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      <span
                        className={`text-${
                          selectedSize === size ? "black" : "gray-500"
                        }`}
                      >
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
                <div></div>
              </div>

              {/* {<p className="text-gray-800 mt-4">Size Options:</p>
            <div className="flex flex-wrap">
              {shirtList[0].sizeOptions.map((size, index) => (
                <div
                  key={index}
                  className=""
                >
                  {size}
                </div>
              ))}
            </div>} */}
            </div>

            {/* Available Offers */}
            <div className="mb-4">
              <p className="text-gray-800">Available Offers:</p>
              <ul className="list-disc pl-4">
                {shirtList[0].availableOffers.map((offer, index) => (
                  <li key={index} className="text-gray-700">
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Carousel />
      </div>
    </>
  );
};

const Carousel = () => {
  const responsive = {
    0: { items: 1 },
    600: { items: 3 },
    1024: { items: 4 },
  };

  return (
    <AliceCarousel
      mouseTracking
      items={shirtList.map((shirt, index) => (
        <div key={index} className=" container xl:pr-3 pr-2 mt-8 md:mt-12   ">
          <img
            src={shirt.image}
            alt={shirt.name}
            className="w-full h-60 object-cover rounded-md"
          />
          <p className="text-center mt-2">{shirt.name}</p>
        </div>
      ))}
      responsive={responsive}
    />
  );
};

export default ProductDetailPage;