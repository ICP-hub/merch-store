import { useCanister } from "@connect2ic/react";
import { useState } from "react";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

// API handler for product-related functionality
const ProductApiHandler = () => {
  // Init backend
  const [backend] = useBackend();

  // State variables for product list, loading status, and category list
  const [productList, setProductList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState(null);

  // Fetch and set the list of all products
  const getProductList = async () => {
    try {
      setIsLoading(true);
      const response = await backend.listallProducts();
      setProductList(response);
    } catch (err) {
      console.error("Error fetching product list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Homepage : Search for products by category and update the product list
  const searchProductByCategory = async (searchInput) => {
    try {
      setIsLoading(true);
      const productsFound = await backend.searchproductsbycategory(searchInput);
      setProductList(productsFound);
    } catch (err) {
      console.error("Error searching by category:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Homepage : Fetch and set the list of categories
  const getCategoryList = async () => {
    try {
      const categorylist = await backend.listCategories();
      setCategoryList(categorylist);
    } catch (err) {
      console.error("Error Fetching Category List", err);
    }
  };

  // Return the state variables and functions : use in other components
  return {
    productList,
    isLoading,
    getProductList,
    categoryList,
    searchProductByCategory,
    getCategoryList,
  };
};

export default ProductApiHandler;
