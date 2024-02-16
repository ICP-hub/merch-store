import React, { useEffect, useState } from "react";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import Button from "../common/Button";
import SmoothList from "react-smooth-list";
import { Link, useNavigate } from "react-router-dom";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";

const fakecategories = ["All", "Home", "Music", "Phone", "Storage", "Other"];

// Hide Scrollbar : https://stackoverflow.com/a/68111307/18721948
export const scrollStyle = {
  msOverflowStyle: "none", // hide scrollbar for IE, Edge, and Firefox
  scrollbarWidth: "none", // hide scrollbar for Firefox
  "&::WebkitScrollbar": {
    display: "none", // hide scrollbar for Chrome, Safari, and Opera
  },
  scrollSnapType: "x proximity", // enable horizontal scrolling with snap points
  WebkitOverflowScrolling: "touch", // Optional: Enables smooth scrolling on iOS devices
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ CategoryList 
/* ----------------------------------------------------------------------------------------------------- */
const CategoryList = () => {
  // const { categoryList, getCategoryList } = ProductApiHandler();

  // useEffect(() => {
  //   getCategoryList();
  // }, []);

  // console.log(categoryList);
  // Categories Vertical Product Page
  const CategoriesVertical = () => {
    const [filterSize, setFilterSize] = useState(true);
    const [filterColor, setFiterColor] = useState(false);

    return (
      <SmoothList
        delay={200}
        className="flex flex-col min-w-40 gap-1 max-md:w-full"
      >
        <h1 className="text-lg font-bold">Categories</h1>
        <div>
          <Button
            className="focus:outline-none py-2 px-4 rounded-full focus:bg-black hover:text-white hover:bg-black focus:text-white flex items-start font-semibold max-md:text-sm w-full"
            onClick={() => setFilterSize(!filterSize)}
          >
            Size
          </Button>
          {filterSize ? (
            <div className="flex flex-col px-4 py-1">
              <span className="flex gap-1">
                <input type="checkbox" />
                <span>size one</span>
              </span>
              <span className="flex gap-1">
                <input type="checkbox" />
                <span>size two</span>
              </span>
              <span className="flex gap-1">
                <input type="checkbox" />
                <span>size three</span>
              </span>
            </div>
          ) : null}
        </div>
        <div>
          <Button
            className="focus:outline-none py-2 px-4 rounded-full focus:bg-black hover:text-white hover:bg-black focus:text-white flex items-start font-semibold max-md:text-sm w-full"
            onClick={() => setFiterColor(!filterColor)}
          >
            Colors
          </Button>
          {filterColor ? (
            <div className="flex flex-col px-4 py-1">
              <span className="flex gap-1">
                <input type="checkbox" />
                <span>Color one</span>
              </span>
              <span className="flex gap-1">
                <input type="checkbox" />
                <span>Color two</span>
              </span>
              <span className="flex gap-1">
                <input type="checkbox" />
                <span>Color three</span>
              </span>
            </div>
          ) : null}
        </div>
      </SmoothList>
    );
  };

  // Categories Horizontal HomePage
  const CategoriesHorizontal = () => {
    const navigate = useNavigate();
    return (
      <SmoothList
        delay={200}
        className="flex justify-between  max-md:flex-col gap-2"
      >
        <SmoothList
          delay={200}
          className="flex gap-2 max-md:overflow-x-auto snap-proximity snap-x scroll-container"
          style={scrollStyle}
        >
          {fakecategories.map((category, index) => (
            <Button
              key={index}
              className="px-4 py-1 rounded-full hover:border hover:border-black focus:border focus:border-black  focus:bg-black hover:text-white hover:bg-black focus:text-white border border-slate-500 bg-white flex items-start font-semibold text-sm focus:outline-none"
              autoFocus={index === 0}
            >
              {category}
            </Button>
          ))}
        </SmoothList>
        <Button
          onClick={() => navigate("/products")}
          className="md:block px-4 py-1 rounded-full hover:border hover:border-black focus:border focus:border-black  focus:bg-black hover:text-white hover:bg-black focus:text-white border border-slate-500 bg-white flex items-start font-semibold text-sm max-w-max"
        >
          See All Products
        </Button>
      </SmoothList>
    );
  };

  return { CategoriesHorizontal, CategoriesVertical };
};

export default CategoryList;
