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
  const [initialProductList, setInitialProductList] = useState([]); // For 'all' filter in category tab
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Product related
  /* ----------------------------------------------------------------------------------------------------- */
  // Fetch and set the list of all products
  const getProductList = async () => {
    try {
      setIsLoading(true);
      const response = await backend.listallProducts();
      setProductList(response);
      setInitialProductList(response);
    } catch (err) {
      console.error("Error fetching product list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Search product by name in searchInput
  const searchProductByName = async (searchInput) => {
    try {
      // SerchInput less than || equal 3 : don't perform the search
      if (!searchInput || searchInput.length <= 3) {
        // Show all products : in this condition
        setProductList(initialProductList);
        return;
      }

      // Enable case-insensitive search .toLowerCase()
      const searchTerm = searchInput.toLowerCase();

      // Filter products that contain the searchTerm in their name
      const filteredProducts = initialProductList.filter(
        ([prodName, prodDetails]) => prodName.toLowerCase().includes(searchTerm)
      );

      // Update the productList with the filtered products
      setProductList(filteredProducts);
    } catch (err) {
      console.error("Error searching by name:", err);
    }
  };

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Category related
  /* ----------------------------------------------------------------------------------------------------- */
  //  Search for products by category and update the product list
  const searchProductByCategory = async (searchInput) => {
    // If input is all set the Product List from inital ProductList load : getProductList
    if (searchInput === "all") {
      // console.log(initialProductList);
      setProductList(initialProductList);
      return;
    }
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

  // Fetch and set the list of categories
  const getCategoryList = async () => {
    try {
      setIsLoading(true);
      const categorylist = await backend.listCategories();
      setCategoryList(categorylist);
    } catch (err) {
      console.error("Error Fetching Category List", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialProductList,
    productList,
    isLoading,
    getProductList,
    categoryList,
    searchProductByCategory,
    getCategoryList,
    searchProductByName,
  };
};

export default ProductApiHandler;
