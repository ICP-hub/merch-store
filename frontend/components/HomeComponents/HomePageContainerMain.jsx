/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React from "react";
import { ProductPageContainerTop } from "../ProductComponents/ProductPageContainerMain";
import HomePageBottom from "./HomePageBottom";
import HomePageVideo from "./HomePageViedo";
import ProductCard from "../ProductComponents/ProductCard";
import SmoothList from "react-smooth-list";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import CategoryList from "../ProductComponents/Categories";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main : HomePageContainerMain.
/* ----------------------------------------------------------------------------------------------------- */

const HomePageContainerMain = () => {
  const { CategoriesHorizontal } = CategoryList();
  return (
    <>
      {/* Homepage Top Div */}
      <div className="flex flex-col container mx-auto p-6 rounded-2xl gap-2 tracking-wider">
        <ProductPageContainerTop />
        <CategoriesHorizontal />
        <HomeProductList count={8} />
      </div>
      {/*Homepage Bot Div */}
      <HomePageBottom />
    </>
  );
};

// Homepage Product list
const HomeProductList = ({ count }) => {
  const productData = Array.from({ length: count }, (_, index) => (
    <ProductCard key={index} />
  ));

  const navigate = useNavigate();

  return (
    <SmoothList delay={200} className="mb-10">
      <SmoothList
        delay={200}
        className="product-6 grid xl:grid-cols-4 lg:grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 py-8"
      >
        {productData}
      </SmoothList>
      <div className="flex justify-center items-center">
        <Button
          onClick={() => navigate("/products")}
          className="md:hidden block px-4 py-1 rounded-full hover:border hover:border-black focus:border focus:border-black  focus:bg-black hover:text-white hover:bg-black focus:text-white border border-slate-500 bg-white flex items-start font-semibold text-sm max-w-max"
        >
          See All Products
        </Button>
      </div>
    </SmoothList>
  );
};

export default HomePageContainerMain;
