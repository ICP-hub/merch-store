import React, { useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import SmoothList from "react-smooth-list";
import LoadingScreen from "../common/LoadingScreen";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";
import NoDataFound from "../common/NoDataFound";
import { CategoriesVertical } from "./Categories";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ ProductPageContainerMain 
/* ----------------------------------------------------------------------------------------------------- */
const ProductPageContainerMain = () => {
  // Retrieve data and methods from the ProductApiHandler
  const {
    productList,
    isLoading,
    getProductList,
    searchProductByCategory,
    searchProductByName,
  } = ProductApiHandler();

  // Extract category
  // State variables for pagination
  const [initialLoad, setInitialLoad] = useState(true); // State to prevent continuous re-renders. Only load on mount
  // useEffect hook to fetch product list on initial load
  useEffect(() => {
    if (initialLoad) {
      getProductList();
      setInitialLoad(false);
    }
  }, [getProductList, initialLoad]);

  return (
    <div className="container mx-auto p-6 rounded-2xl">
      {/* Top container : search bar */}
      <ProductPageContainerTop searchProductByName={searchProductByName} />
      {/* Main container : categories, products, and pagination : pass productList */}
      <ContainerMid
        productList={productList}
        loading={isLoading}
        searchProductByCategory={searchProductByCategory}
      />
    </div>
  );
};

// Top Container component
export const ProductPageContainerTop = ({ searchProductByName }) => {
  const [searchProductInput, setSearchProductInput] = useState("");

  useEffect(() => {
    searchProductByName(searchProductInput);
  }, [searchProductInput]);

  return (
    <SmoothList
      delay={200}
      className="max-md:px-2 py-6 flex items-center gap-6 max-md:flex-col max-md:items-start sm:justify-between"
    >
      <div className="font-bold text-3xl">Give All You Need</div>
      {/* Search bar component : dynamic value and change handler */}
      <SearchBar
        type="text"
        placeholder="Search on Merch Store"
        icon
        buttonText="search"
        value={searchProductInput}
        onChange={(e) => setSearchProductInput(e.target.value)}
      />
    </SmoothList>
  );
};

// Main container : categories, products, and pagination
const ContainerMid = ({ productList, loading, searchProductByCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products to display per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productList?.slice(startIndex, endIndex);
  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex gap-2 max-md:flex-col py-6">
      {/* Vertical category component */}
      <CategoriesVertical searchProductByCategory={searchProductByCategory} />

      <div className="w-full md:w-5/6">
        {productList?.length === 0 ? (
          // Render a message when productList is empty
          <div className="text-center text-gray-500 font-semibold w-full bg-gray-300 rounded-2xl">
            <NoDataFound
              title={"No Product Found"}
              bgcolor={"bg-white/50 backdrop-blur-sm"}
            />
          </div>
        ) : (
          <SmoothList
            delay={200}
            className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-4 border-b border-b-slate-500"
          >
            {loading ? (
              <LoadingScreen />
            ) : (
              currentProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            )}
          </SmoothList>
        )}
        {/* Pagination component : Render pagination only if there is more than 8 products */}
        {productList?.length > 8 ? (
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={productList?.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductPageContainerMain;
