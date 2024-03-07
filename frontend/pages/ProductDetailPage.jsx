// ProductDetailPage.js

import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { IoHeartOutline, IoHeart } from "react-icons/io5";
import Button from "../components/common/Button.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import placeholderImg from "../assets/product/p1-front.jpg";
import img1 from "../assets/product/p2-front.jpeg";
import img2 from "../assets/product/p1-back.jpg";
import img3 from "../assets/product/p2-back.jpeg";

import { useCanister, useConnect, useDialog } from "@connect2ic/react";

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
  const { principal, isConnected } = useConnect();

  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);

  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [data, setData] = useState("");
  const [carts, setCarts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isProductInLocalCart, setProductInLocalCart] = useState(true);
  const [isProductInLocalWishlist, setProductInLocalWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();
  const { open } = useDialog();
  const [sellingPrice, setSellingPrice] = useState();
  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState();
  const [inventory, setInventory] = useState();
  const [mainImage, setMainImage] = useState("");
  const [image, setImage] = useState({
    img1: "",
    img2: "",
    img3: "",
  });

  const handleColorChange = (color) => {
    setSelectedColor(color.color === selectedColor ? null : color.color);
    if (color.inventory < 5) {
      toast(` !!! Hurry up only ${color.inventory} piece left !!!`);
    }
    setProductInLocalCart(false);
    setPrice(color.variant_sale_price);
    setSellingPrice(color.variant_price);
    setInventory(color.inventory);
    setMainImage(color.img1);

    setImage({ img1: color.img1, img2: color.img2, img3: color.img3 });
  };
  const [selectedSize, setSelectedSize] = useState();

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  // get product detail function

  const getProduct = async () => {
    try {
      const item = await backend.getProduct(slug);

      setData(item.ok);
      setSelectedColor(item.ok.variantColor[0].color);
      setSelectedSize(item.ok.variantSize[0].size);
      setSellingPrice(item.ok.variantColor[0].variant_price);
      setPrice(item.ok.variantColor[0].variant_sale_price);
      setMainImage(item.ok.variantColor[0].img1);
      setImage({
        img1: item.ok.variantColor[0].img1,
        img2: item.ok.variantColor[0].img2,
        img3: item.ok.variantColor[0].img3,
      });

      if (item.ok) {
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing product details:", error);
    } finally {
      setLoading(true);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProduct();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);
  const listCarts = async () => {
    try {
      setLoading4(false);

      const cart = await backend.getCallerCartItems();
      setCarts(cart);
    } catch (error) {
      console.error("Error listing carts:", error);
    } finally {
      setLoading4(false);
    }
  };

  useEffect(() => {
    listCarts();
  }, [backend]);

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInCart = carts.some(
      (item) =>
        item[1]?.product_slug === data?.slug &&
        item[1]?.color === selectedColor &&
        item[1]?.size === selectedSize
    );
    setProductInLocalCart(isProductInCart);
  }, [data, selectedColor, selectedSize, principal]);

  // add to cart functionality for adding items into cart
  const AddToCart = async () => {
    try {
      setLoading4(true);
      const res = await backend.addtoCartItems(
        slug,
        selectedSize,
        selectedColor,
        quantity
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
      setLoading4(false);
      listCarts();
    }
  };

  useEffect(() => {
    listWishlists();
  }, [backend]);

  const listWishlists = async () => {
    try {
      //setLoading4(true)

      const wishlist2 = await backend.listWishlistItems();
      setWishlist(wishlist2);
    } catch (error) {
      console.error("Error listing wishlist:", error);
    } finally {
      // setLoading4(false)
    }
  };

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInWishlist = wishlist.some(
      (item) =>
        item[1].product_slug === data.slug &&
        item[1].principal.toText() === principal
    );
    setProductInLocalWishlist(isProductInWishlist);
  }, [wishlist, data, principal]);
  // add to wishlist functionality for adding items to the wishlist

  const AddToWishlist = async () => {
    if (isConnected) {
      try {
        setLoading3(true);
        const res = await backend.addtoWishlist(slug);
        setProductInLocalWishlist(true);

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
        setLoading3(false);
      }
    } else {
      toast.error("please login first");
      open();
    }
  };

  const removeToWishlist = async () => {
    try {
      const wishlistItem = wishlist.filter(
        (item) =>
          item[1].product_slug === data.slug &&
          item[1].principal.toText() === principal
      );

      setLoading3(true);
      const res = await backend.deleteWishlistItems(wishlistItem[0][1].id);

      if ("ok" in res) {
        toast.success("The product has been removed to your wishlist.");
        listWishlists();
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading3(false); // Set loading to false when the update is complete (success or error)
    }
  };
  // Image gallery function for selection of better product details

  const handleImageClick1 = () => {
    setMainImage(image.img1);
  };

  const handleImageClick2 = () => {
    setMainImage(image.img2);
  };

  const handleImageClick3 = () => {
    setMainImage(image.img3);
  };

  const increment = async (item) => {
    setQuantity(quantity + 1);
  };
  const decrement = (item) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateDiscountPercentage = () => {
    if (price === 0) {
      return 0;
    }
    const discountPercentage = ((sellingPrice - price) / sellingPrice) * 100;

    return Math.round(discountPercentage);
  };
  const discount = calculateDiscountPercentage();
  return (
    <>
      <div className="container mx-auto xl:mt-12 mt-6 px-6 flex items-center md:items-start justify-between md:flex-col flex-col">
        <div className="flex flex-col   max-w-full  xl:ml-0  lg:flex-row ">
          <div className="lg:w-2/6 xl:pr-6 relative">
            {/* Product Image */}
            {!loading ? (
              <div className="w-full h-[80%] rounded-md animate-pulse bg-gray-200"></div>
            ) : (
              <img
                src={mainImage}
                alt={data.title}
                className="w-full rounded-md"
              />
            )}
            {!loading ? (
              <div className="absolute top-2 left-2 w-12 h-6 animate-pulse bg-white py-2 px-2 rounded-full text-sm cursor-pointer font-semibold"></div>
            ) : (
              <div className="absolute top-2 left-2 bg-white py-1 px-2 max:w-16 rounded-full text-xs text-center cursor-pointer font-semibold">
                {data.category}
              </div>
            )}

            {!loading ? (
              <div
                className={`absolute top-2  right-2 xl:right-8 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px]`}
              ></div>
            ) : (
              <button
                onClick={() => {
                  isProductInLocalWishlist
                    ? removeToWishlist()
                    : AddToWishlist();
                }}
                className={`absolute top-2  right-2 xl:right-8 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px] ${
                  loading3 && "opacity-50"
                }`}
                disabled={loading3 && true}
              >
                {loading3 ? (
                  <TailSpin
                    height="100%"
                    width="100%"
                    color="black"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  <>
                    {isProductInLocalWishlist ? (
                      <IoHeart className="text-[#D02F2F]" size="1.5em" />
                    ) : (
                      <IoHeartOutline size="1.5em" />
                    )}
                  </>
                )}
              </button>
            )}

            {!loading ? (
              <div className="w-[96rem] flex mt-2 pr-4  gap-2"></div>
            ) : (
              <div className="w-full flex mt-2 pr-4  gap-2">
                <img
                  src={image.img1}
                  alt="img1"
                  className={`w-1/3 rounded-md cursor-pointer
                    ${
                      mainImage === image.img1
                        ? "border-[2px] border-gray-400 shadow-lg"
                        : ""
                    }`}
                  onClick={handleImageClick1}
                />

                <img
                  src={image.img2}
                  alt="img1"
                  className={`w-1/3 rounded-md cursor-pointer
                    ${
                      mainImage === image.img2
                        ? "border-[2px] border-gray-400 shadow-lg     "
                        : ""
                    }`}
                  onClick={handleImageClick2}
                />

                <img
                  src={image.img3}
                  alt="img1"
                  className={`w-1/3 rounded-md cursor-pointer
                    ${
                      mainImage === image.img3
                        ? "border-[2px] border-gray-400 shadow-lg     "
                        : ""
                    }`}
                  onClick={handleImageClick3}
                />
              </div>
            )}
          </div>

          <div
            className="lg:w-4/6 mt-4 ml-3 pl-3 md:h-[500px] lg:mt-0 md:overflow-y-scroll  "
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
          >
            {/* Product Details */}

            {!loading ? (
              <h2 className=" w-1/3 h-8 animate-pulse bg-gray-200 py-2 px-2 rounded-full text-sm cursor-pointer font-semibold"></h2>
            ) : (
              <h2 className="xl:text-2xl  font-bold mb-4">{data.title}</h2>
            )}

            {/* Ratings
            {!loading ? (
              <div className=" w-1/3 h-8 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
            ) : (
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
            )} */}

            {/* Prices */}
            {!loading ? (
              <div className=" w-1/3 h-8  mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
            ) : (
              <div className="mb-4 flex items-center  text-gray-700">
                Price:
                <p className="text-gray-600">${price}</p>
                <p className="text-gray-500 mx-2 text-xs">
                  <s>${sellingPrice}</s>
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs font-medium rounded-md px-2 py-1 max-w-max">
                    {discount}% off
                  </span>
                </div>
              </div>
            )}

            {/* Color and Size Options */}

            <div className="mb-4 space-y-3">
              {!loading ? (
                <div className=" w-full h-12 mt-4  animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
              ) : (
                <div>
                  <h2 className="text-sm text-gray-700   mb-2">
                    COLOR OPTIONS :{selectedColor}
                  </h2>
                  <div className="flex  flex-wrap">
                    {data.variantColor.map((color, index) => (
                      <div
                        key={index}
                        className={`w-10 h-10 m-1 rounded-full bg-${
                          color.color
                        } cursor-pointer ${
                          selectedColor === color.color
                            ? "border-[2px] border-gray-300 shadow-md   scale-125  "
                            : ""
                        }`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                  <div></div>
                </div>
              )}
              {!loading ? (
                <div className=" w-full h-12 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
              ) : (
                <div>
                  <h2 className="text-sm text-gray-700 mb-4">
                    SELECT SIZE:{selectedSize}
                  </h2>
                  <div className="flex flex-wrap  ">
                    {data.variantSize.map((size, index) => (
                      <div
                        key={index}
                        className={`bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-md cursor-pointer mr-2 mb-2 ${
                          selectedSize === size.size
                            ? "border-black scale-125"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSizeChange(size.size)}
                      >
                        <span
                          className={`text-${
                            selectedSize === size ? "black" : "gray-500"
                          }`}
                        >
                          {size.size}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div></div>
                </div>
              )}
            </div>
            {!loading ? (
              <div className=" w-1/3 h-12  mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
            ) : (
              <div class="flex items-center justify-start ml-2">
                <button class="    " onClick={decrement}>
                  <HiOutlineMinus />
                </button>
                <p type="text" class="w-12 text-center     ">
                  {quantity}
                </p>

                <button class=" " onClick={increment}>
                  <HiOutlinePlus />
                </button>
              </div>
            )}

            <div className="flex mt-4">
              {!loading ? (
                <div
                  className={`bg-gray-200 text-white py-2 px-4 h-12 animate-pulse rounded-full w-full  mb-2 lg:w-1/3`}
                ></div>
              ) : (
                <>
                  {isProductInLocalCart ? (
                    <Link
                      to="/cart"
                      className="bg-black text-white text-center py-2 px-4 rounded-full w-full  mb-2 lg:w-1/3"
                    >
                      Go to Cart
                    </Link>
                  ) : (
                    <Button
                      onClick={AddToCart}
                      className={`bg-black text-white text-center  py-2 px-4 rounded-full w-full  mb-2 lg:w-1/3 ${
                        loading4 && " flex items-center justify-center"
                      } ${inventory < quantity && "opacity-30"}`}
                      disabled={(loading4 && true) || inventory < quantity}
                    >
                      {loading4 ? (
                        <TailSpin
                          height="20"
                          width="20"
                          color="white"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          visible={true}
                        />
                      ) : (
                        ""
                      )}{" "}
                      {inventory && inventory < quantity ? ( //inventory>=quantity<=0
                        "Out of Stock"
                      ) : (
                        <p className="ml-2"> Add to Cart</p>
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
            {!loading ? (
              <div className=" w-full h-36 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-xl"></div>
            ) : (
              <div className="mb-4 mt-8">
                <p className="text-gray-800">Description:</p>
                <li className="list-disc text-gray-800 ">{data.description}</li>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
