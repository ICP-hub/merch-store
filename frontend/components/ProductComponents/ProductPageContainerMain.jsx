import React, { useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import SmoothList from "react-smooth-list";
import CategoryList from "./Categories";
import LoadingScreen from "../common/LoadingScreen";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";
import NoDataFound from "../common/NoDataFound";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ ProductPageContainerMain 
/* ----------------------------------------------------------------------------------------------------- */
const ProductPageContainerMain = () => {
  // Retrieve data and methods from the ProductApiHandler
  const { productList, isLoading, getProductList } = ProductApiHandler();

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products to display per page
  const [initialLoad, setInitialLoad] = useState(true); // State to prevent continuous re-renders. Only load on mount

  // useEffect hook to fetch product list on initial load
  useEffect(() => {
    if (initialLoad) {
      getProductList();
      setInitialLoad(false);
    }
  }, [getProductList, initialLoad]);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 rounded-2xl">
      {/* Top container : search bar */}
      <ProductPageContainerTop />

      {/* Main container : categories, products, and pagination : pass productList */}
      <ContainerMid
        productList={productList}
        loading={isLoading}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
      />

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
  );
};

// Top Container component
export const ProductPageContainerTop = () => {
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
      />
    </SmoothList>
  );
};

// Main container : categories, products, and pagination
const ContainerMid = ({
  productList,
  loading,
  currentPage,
  productsPerPage,
}) => {
  const { CategoriesVertical } = CategoryList();
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productList?.slice(startIndex, endIndex);

  return (
    <div className="flex gap-2 max-md:flex-col py-6">
      {/* Vertical category component */}
      <CategoriesVertical />

      <div>
        {productList?.length === 0 ? (
          // Render a message when productList is empty
          <div className="text-center text-gray-500 font-semibold">
            <NoDataFound title="No Products Found" />
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
      </div>
    </div>
  );
};

export default ProductPageContainerMain;
