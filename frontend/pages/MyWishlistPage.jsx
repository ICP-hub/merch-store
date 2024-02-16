import React from "react";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Components Import.
/* ----------------------------------------------------------------------------------------------------- */
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Footer from "../components/common/Footer";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";
import FakeProdImg from "../assets/fakeprod.png";
import { formatDate } from "./MyOrderPage";
import Button from "../components/common/Button";
import { BsArrowRightCircle, BsTrash3 } from "react-icons/bs";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components.
/* ----------------------------------------------------------------------------------------------------- */
const MyWishlistPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Wishlist"}></Header>
      <Hero />
      <MyWishListContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyWishlist Page : <MyWishlistContainerMain /> 
/* ----------------------------------------------------------------------------------------------------- */
const MyWishListContainerMain = () => {
  return (
    <div className="container mx-auto py-6 tracking-wider">
      <div className="flex max-md:flex-col p-6 gap-6">
        <Tabs />
        <MyWishList />
      </div>
    </div>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyWishlist Page : <MyWishlistContainerMain /> : <MyWishlist Component />.
/* ----------------------------------------------------------------------------------------------------- */
const MyWishList = () => {
  const wishlist = [
    {
      prodname: "Headphone xyz ",
      category: "Electronics",
      image: FakeProdImg,
      price: "$45.00",
      addedOn: formatDate(new Date()),
    },
    {
      prodname: "Headphone xyz ",
      category: "Electronics",
      image: FakeProdImg,
      price: "$45.00",
      addedOn: formatDate(new Date()),
    },
  ];

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-2xl tracking-normal">
      <h1 className="font-medium text-lg px-2 sm:px-8 py-4 flex items-center gap-2 ">
        My Wishlist({wishlist.length})
      </h1>
      {wishlist.length === 0 ? (
        <div className="p-8 capitalize font-medium">
          Wishlist is empty..Check out our latest products...
        </div>
      ) : (
        <div className=" flex flex-col">
          {wishlist.map((wishlist, index) => (
            <div
              key={index}
              className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col justify-between"
            >
              <div className="flex max-md:flex-col gap-3">
                <div>
                  <img
                    draggable="false"
                    className="h-24 w-24 object-contain bg-gray-200 rounded-2xl"
                    src={wishlist.image}
                    alt={wishlist.prodname}
                  />
                </div>
                <div className="flex flex-col lg:justify-center">
                  <p className="text-lg capitalize font-medium">
                    {wishlist.prodname}
                  </p>
                  <p className="text-xs uppercase">
                    {" "}
                    Categgory: {wishlist.category}
                  </p>
                  <p className="uppercase text-xs">
                    Added On : {wishlist.addedOn}
                  </p>
                </div>
              </div>
              <div className="flex max-lg:ml-[108px] max-md:ml-0 gap-6">
                <div className="flex flex-col justify-center">
                  <span className="text-[12px] uppercase">Price</span>
                  <p className="text-lg font-medium">{wishlist.price}</p>
                </div>
                <div className="flex justify-center flex-col">
                  {/*keeping empty div for better alignment */}
                  <div className="h-4 w-4"></div>
                  <div className="flex gap-6">
                    <Button className=" hover:text-red-500">
                      <BsTrash3 size={20} />
                    </Button>
                    <Button>
                      <BsArrowRightCircle size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyWishlistPage;
