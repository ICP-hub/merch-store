import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "../components/common/Button.jsx";
import toast from "react-hot-toast";
import { GoCheckCircle } from "react-icons/go";
import { FcOk } from "react-icons/fc";
import { TailSpin } from "react-loader-spinner";
import EmptyCart from "../components/ProductComponents/EmptyCart.jsx";

import NoImage from "../assets/product/p1-front.jpg";
import {
  ConnectButton,
  ConnectDialog,
  useCanister,
  useConnect,
  useDialog,
} from "@connect2ic/react";
import Total from "../components/common/Total.jsx";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ main cartpage Container
/* ----------------------------------------------------------------------------------------------------- */

const CartPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"CART"} />
      <Cart></Cart>

      <Footer></Footer>
    </AnimationView>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ cart  Container
/* ----------------------------------------------------------------------------------------------------- */

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { principal, isConnected } = useConnect();
  const [product, getProduct] = useState([]);
  const [id, setIds] = useState("");
  const [quantity, setQuantity] = useState();
  const [changedItems, setChangedItems] = useState(false);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

  const [size, setSize] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const [backend] = useCanister("backend");

  const getCartlist = async () => {
    try {
      const item = await backend.getCallerCartItems();
      const formatColor = item.map((item) => ({
        color: item[1].color,
      }));
      setColor(formatColor);
      const formatSize = item.map((item) => ({
        size: item[1].size,
      }));

      setSize(formatSize);
      const formatIds = item.map((item) => ({
        id: item[1].id,
      }));
      setIds(formatIds);
      const formatQuantity = item.map((item) => ({
        quantity: item[1].quantity,
      }));
      setQuantity(formatQuantity);

      const formattedItems = item.map((item) => ({
        slug: item[1].product_slug,
      }));

      // Update state with the formatted items array
      setCartItems(formattedItems);

      if (item.ok) {
        console.log(item);
      }
    } catch (error) {
      console.error("Error listing user:", error);
    } finally {
    }
  };

  useEffect(() => {
    getCartlist();
  }, [backend]);

  const getProductCartlist = async () => {
    try {
      {
        setLoading(true);
        const productPromises = cartItems.map(async (productId) => {
          const productResponse = await backend.getProduct(productId.slug);
          return productResponse.ok; // Assuming `ok` property contains the product details
        });

        // Wait for all promises to resolve
        const products = await Promise.all(productPromises);

        getProduct(products);

        console.log(products);
        // Access and log the title property for each product
      }
    } catch (error) {
      console.error("Error while getting wishlist ", error);
    } finally {
      setLoading(false);
    }
  };

  const increment = (index) => {
    setQuantity((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = {
        ...updatedQuantities[index],
        quantity: updatedQuantities[index].quantity + 1,
      };
      setIsQuantityChanged(true);
      setSelectedItemIndex(index);
      return updatedQuantities;
    });
  };

  const decrement = (index) => {
    setQuantity((prevQuantities) => {
      if (prevQuantities[index].quantity > 1) {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = {
          ...updatedQuantities[index],
          quantity: updatedQuantities[index].quantity - 1,
        };
        setIsQuantityChanged(true);
        setSelectedItemIndex(index);
        return updatedQuantities;
      }
      return prevQuantities;
    });
  };

  const deleteCart = async (id) => {
    try {
      console.log(id);
      const remove = await backend.deleteCartItems(id);
      if (remove) {
        getCartlist();

        toast.success("item removed successfully");
      }
      console.log(remove);
    } catch (error) {
      console.error("deletion cannot be performed", error);
    }
  };
  useEffect(() => {
    if (cartItems !== "") {
      getProductCartlist();
    }
  }, [backend, cartItems]);

  const updateQuantity = async (id, quantity, color, size) => {
    try {
      setLoadingItemId(id);
      setIsLoading(true);
      // Your update logic here
      const res = await backend.updateCartItems(id, quantity, color, size);
      setUpdateSuccess(true);

      toast.success("Quantity changed");
    } catch (error) {
      console.error("Error updating quantity:", error);
      setUpdateSuccess(false);
    } finally {
      setIsLoading(false);
      setIsQuantityChanged(false);
    }
  };

  const clearAll = async () => {
    try {
      const res = await backend.clearallcartitmesbyprincipal();

      if ("ok" in res) {
        console.log(res);

        toast.success("All items are removed");
      } else {
        console.log("error while deleting all the items", res);
        getCartlist;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // Calculate the total price based on the prices of items in the cart
    const newTotalPrice = product.reduce(
      (acc, item, index) =>
        acc +
        (item.variantColor.find(
          (variant) => variant.color === color[index]?.color
        )?.variant_sale_price || 0) *
          quantity[index]?.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [product]);

  return (
    <>
      {product.length === 0 ? (
        <EmptyCart></EmptyCart>
      ) : (
        <div className="container mx-auto mt-4 px-6 flex items-center md:items-start justify-between md:flex-row flex-col">
          <div className="md:w-[70%] w-[100%] ">
            <div className="flex items-end justify-end border border-gray-300 mt-2   rounded-xl   p-5 w-[100%]">
              <Button
                className="bg-black rounded-full text-sm text-white px-3 py-2"
                onClick={clearAll}
              >
                Clear All
              </Button>
            </div>

            <div>
              {product.map((item, index) => (
                <>
                  {loading ? (
                    <div className="   rounded-xl mb-3 mt-4 grid grid-cols-1 gap-3">
                      {[...Array(3)].map((_, index) => (
                        <div
                          className="rounded-xl xl:flex justify-between border-[1px] border-gray-200  items-center gap-2"
                          key={index}
                        >
                          <div className="flex justify-start items-start gap-2 mt-3">
                            <div className="w-24  h-24 mb-2  bg-gray-100 rounded-lg ml-2 animated-pulse"></div>
                            <div className="flex flex-col mt-2">
                              <h4 className="w-[75px] h-[20px] rounded-full bg-gray-100 animated-pulse mb-1"></h4>
                              <h4 className="w-[150px] h-[25px] rounded-full bg-gray-100 animated-pulse mb-2"></h4>
                              <div className="flex gap-2">
                                <h4 className="w-[60px] h-[15px] rounded-full bg-gray-100 animated-pulse"></h4>
                                <h4 className="w-[60px] h-[15px] rounded-full bg-gray-100 animated-pulse"></h4>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between xl:items-end h-full mt-12 mr-2 xl:mb-0 mb-2">
                            <div className="flex flex-col justify-end items-end gap-1">
                              <h4 className="w-[80px] h-[20px] rounded-full bg-gray-100 animated-pulse"></h4>
                              <h4 className="w-[80px] h-[20px] rounded-full bg-gray-100 animated-pulse"></h4>
                              <div className="w-[130px] h-[30px] rounded-full bg-gray-100 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className=" md:flex flex-wrap items-center m-0  xl: justify-between border border-gray-300 mt-4  rounded-xl  p-2 py-2 w-[100%]">
                      <div>
                        <div className="flex m-2">
                          <img
                            src={NoImage}
                            alt=""
                            className="w-24  h-24 border border-gray-300 bg-gray-400 rounded-lg ml-2"
                          />
                          <div className="md:mt-6 md:ml-2 ml-4">
                            <p className="border border-gray-300 px-2 py-1 text-xs uppercase font-medium rounded-full max-w-max">
                              {item.category}
                            </p>
                            <p>{item.title}</p>
                            <span className="text-xs xl:text:sm">
                              <span className="text-gray-400 ">size:</span>
                              {size[index]?.size}
                            </span>
                            <span className="text-xs xl:text:sm">
                              {" "}
                              <span className="text-gray-400  ">
                                color:
                              </span>{" "}
                              {color[index]?.color}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="xl:mt-4 mt-2">
                        <div className="flex flex-col items-end  ">
                          <s className="text-gray-400 text-xs">
                            $
                            {(() => {
                              const selectedVariant = item.variantColor.find(
                                (variant) =>
                                  variant.color === color[index]?.color
                              );
                              return selectedVariant
                                ? selectedVariant.variant_price *
                                    quantity[index]?.quantity
                                : null;
                            })()}
                          </s>

                          <p className="text-left">
                            $
                            {(() => {
                              const selectedVariant = item.variantColor.find(
                                (variant) =>
                                  variant.color === color[index]?.color
                              );
                              return selectedVariant
                                ? selectedVariant.variant_sale_price *
                                    quantity[index]?.quantity
                                : null;
                            })()}
                          </p>
                        </div>
                        <div className="xl:flex">
                          <div className="flex items-center justify-end">
                            <Button
                              className=""
                              onClick={() => deleteCart(id[index].id)}
                            >
                              <HiOutlineTrash className="w-5 h-5 text-gray-400 m-1 xl:m-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-end">
                            <button
                              className="bg-gray-100 py-2 px-4 border-t border-l border-b border-gray-300 rounded-l-md hover:bg-gray-200"
                              onClick={() => decrement(index)}
                            >
                              <HiOutlineMinus />
                            </button>
                            <p className="w-16 text-center py-1 px-2 border-t border-b border-gray-300 bg-gray-100">
                              {quantity[index]?.quantity}
                            </p>
                            <button
                              className="bg-gray-100 py-2 px-4 border-t border-r border-b border-gray-300 rounded-r-md hover:bg-gray-200"
                              onClick={() => increment(index)}
                            >
                              <HiOutlinePlus />
                            </button>

                            {isQuantityChanged &&
                              selectedItemIndex === index && (
                                <button
                                  className="ml-2"
                                  onClick={() =>
                                    updateQuantity(
                                      id[index].id,
                                      quantity[index]?.quantity,
                                      size[index]?.size,
                                      color[index]?.color
                                    )
                                  }
                                  disabled={isLoading}
                                >
                                  {isLoading &&
                                  loadingItemId === id[index].id ? (
                                    // Loading spinner
                                    <TailSpin
                                      height="10px"
                                      width="10px"
                                      color="black"
                                      ariaLabel="tail-spin-loading"
                                      radius="1"
                                      visible={true}
                                    />
                                  ) : (
                                    // Default icon
                                    <FcOk />
                                  )}
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          <Total totalPrice={totalPrice} />
        </div>
      )}
    </>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ cart card  Container
/* ----------------------------------------------------------------------------------------------------- */

// const CartItem = ({ item, id }) => {

//   return (
//     <div className=" md:flex flex-wrap items-center m-0  xl: justify-between border border-gray-300 mt-4  rounded-xl  p-2 py-2 w-[100%]">
//       <div>
//         <div className="flex m-2">
//           <input
//             type="checkbox"
//             className="form-checkbox h-5 w-5 text-yellow-500  rounded-none"
//             name="selectItem"
//           />
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJNcA6I9f85ESkLkHq4HKYJ-CjzIdVXQTL25Am9yjcA&s"
//             alt=""
//             className="w-24  h-24 border border-gray-300 bg-gray-400 rounded-lg ml-2"
//           />
//           <div className="md:mt-6 md:ml-2 ml-4">
//             <p className="border border-gray-300 rounded-full w-16 item-center pl-2">
//               Other
//             </p>
//             <p>{item.title}</p>
//             <span className="text-xs xl:text:sm">
//               <span className="text-gray-400 ">Type:</span> Stereo
//             </span>
//             <span className="text-xs xl:text:sm">
//               {" "}
//               <span className="text-gray-400  ">color:</span> Blue
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="xl:mt-4 mt-2">
//         <div className="flex flex-col items-end  ">
//           <s className="text-gray-400 text-xs">$50.00</s>

//           <p className="text-left">{item.price}</p>
//         </div>
//         <div className="xl:flex">
//           <div className="flex items-center justify-end">
//             <Button className="" onClick={() => deleteCart(item.id)}>
//               <HiOutlineTrash className="w-5 h-5 text-gray-400 m-1 xl:m-4" />
//             </Button>
//           </div>

//           <div class="flex items-center justify-end">
//             <button
//               class="bg-gray-100   py-2 px-4 border-t border-l border-b  border-gray-300 rounded-l-md hover:bg-gray-200"
//               onClick={decrement}
//             >
//               <HiOutlineMinus />
//             </button>
//             <p
//               type="text"
//               class="w-16 text-center  py-1 px-2 border-t border-b border-gray-300   bg-gray-100  "
//             >
//               {id[1].id}
//             </p>

//             <button
//               class="bg-gray-100   py-2 px-4 border-t border-r border-b border-gray-300  rounded-r-md hover:bg-gray-200"
//               onClick={increment}
//             >
//               <HiOutlinePlus />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CartPage;
