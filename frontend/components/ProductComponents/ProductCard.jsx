import React from "react";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import Fakeprod from "../../assets/fakeprod.png";
import { BsFillStarFill } from "react-icons/bs";
import Button from "../common/Button";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component ProductCard.
/* ----------------------------------------------------------------------------------------------------- */
const ProductCard = ({ product }) => {
  if (product !== undefined) {
    // Product structure :  ['product-four-7', {…}]
    // Destructure the array to extract the product name and details
    const [productName, productDetails] = product;
    const { category, price, slug } = productDetails; // Add more properties as required

    return (
      <div className="rounded-xl  flex flex-col overflow-hidden gap-2">
        <div className="bg-gray-200 relative rounded-xl">
          <div className="absolute top-2 left-2 bg-white py-1 px-2 rounded-full text-sm cursor-pointer font-semibold">
            {category}
          </div>
          <button
            className={`absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px]`}
          >
            {/* <IoHeart className="text-[#D02F2F]" size="1.5em" /> */}
            {<IoHeartOutline size="1.5em" />}
          </button>
          <Link to={`/product/${slug}`}>
            <div className="img-hover-zoom rounded-xl  cursor-pointer">
              <img src={Fakeprod} alt="prod name" className="rounded-xl" />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-1 max-md:px-4">
          <Link
            to={`/product/${slug}`}
            className="text-lg font-semibold line-clamp-2"
          >
            {productName}
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsFillStarFill fill="#f29f41" />
              <span className="text-slate-600 text-xs font-semibold ">
                5.0(1.2K reviews)
              </span>
            </div>
            <span className="font-bold text-lg">${price}</span>
          </div>
          <div className="flex justify-between gap-2 text-sm">
            <Button className="w-full rounded-full text-black font-semibold bg-white border border-slate-500 px-4 py-2">
              Add to Cart
            </Button>
            <Button className="w-full rounded-full text-white font-semibold bg-black border border-black px-4 py-2">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="rounded-xl  flex flex-col overflow-hidden gap-2">
        <div className="bg-gray-200 relative rounded-xl">
          <div className="absolute top-2 left-2 bg-white py-1 px-2 rounded-full text-sm cursor-pointer font-semibold">
            Category
          </div>
          <button
            className={`absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px]`}
          >
            {/* <IoHeart className="text-[#D02F2F]" size="1.5em" /> */}
            {<IoHeartOutline size="1.5em" />}
          </button>
          <Link to={"/"}>
            <div className="img-hover-zoom rounded-xl  cursor-pointer">
              <img src={Fakeprod} alt="prod name" className="rounded-xl" />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-1 max-md:px-4">
          <Link to="/" className="text-lg font-semibold line-clamp-2">
            Phone Holder Shakti
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsFillStarFill fill="#f29f41" />
              <span className="text-slate-600 text-xs font-semibold ">
                5.0(1.2K reviews)
              </span>
            </div>
            <span className="font-bold text-lg">$29.90</span>
          </div>
          <div className="flex justify-between gap-2 text-sm">
            <Button className="w-full rounded-full text-black font-semibold bg-white border border-slate-500 px-4 py-2">
              Add to Cart
            </Button>
            <Button className="w-full rounded-full text-white font-semibold bg-black border border-black px-4 py-2">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;
