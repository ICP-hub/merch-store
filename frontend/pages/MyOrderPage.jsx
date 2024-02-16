/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React from "react";
import FakeProdImg from "../assets/fakeprod.png";
import { BsFillBagCheckFill, BsTruck } from "react-icons/bs";
import Button from "../components/common/Button";
import { BsArrowRightCircle } from "react-icons/bs";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Footer from "../components/common/Footer";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main: MyOrderPage.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Orders"}></Header>
      <Hero></Hero>
      <MyOrderPageContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

// Date formatter to 'Dec 26th, 9:31pm : export on need
export const formatDate = (date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyOrderPage : MyOrderPageContainerMain.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderPageContainerMain = () => {
  return (
    <div className="container mx-auto py-6 tracking-wider">
      <div className="flex max-md:flex-col p-6 gap-6">
        <Tabs />
        <MyOrders />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyOrderPage : MyOrderPageContainerMain : MyOrders Component.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrders = () => {
  const date = new Date("December 26, 2023 21:31:00");
  const MyOrderList = [
    {
      prodname: "Headphone xyz ",
      image: FakeProdImg,
      orderId: "ABCDE-FGHIJ-12345",
      orderedOn: formatDate(date),
      category: "electronics",
      totalAmount: "$45.00",
    },
    {
      prodname: "Headphone xyz ",
      image: FakeProdImg,
      orderId: "ABCDE-FGHIJ-12345",
      orderedOn: formatDate(date),
      category: "electronics",
      totalAmount: "$45.00",
    },
    {
      prodname: "Headphone xyz ",
      image: FakeProdImg,
      orderId: "ABCDE-FGHIJ-12345",
      orderedOn: formatDate(date),
      category: "electronics",
      totalAmount: "$45.00",
    },
  ];
  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-2xl tracking-normal">
      <h1 className="font-medium text-lg px-2 sm:px-8 py-4 flex items-center gap-2 ">
        My recent orders({MyOrderList.length})
      </h1>
      {MyOrderList.length === 0 ? (
        <div className="p-8 capitalize font-medium">
          You haven't ordered any items..check out our products...
        </div>
      ) : (
        <div className=" flex flex-col">
          {MyOrderList.map((orders, index) => (
            <div
              key={index}
              className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col justify-between"
            >
              <div className="flex max-md:flex-col gap-3">
                <div>
                  <img
                    draggable="false"
                    className="h-24 w-24 object-contain bg-gray-200 rounded-2xl"
                    src={orders.image}
                    alt={orders.prodname}
                  />
                </div>
                <div className="flex flex-col lg:justify-center">
                  <p className="text-lg capitalize font-medium">
                    {orders.prodname}
                  </p>
                  <p className="text-xs uppercase">
                    Category : {orders.category}
                  </p>
                  <p className="text-xs uppercase">
                    {" "}
                    Order Id: {orders.orderId}
                  </p>
                  <p className="uppercase text-xs">
                    Ordered On : {orders.orderedOn}
                  </p>
                </div>
              </div>
              <div className="flex max-lg:ml-[108px] max-md:ml-0 gap-6">
                <div className="flex flex-col justify-center">
                  <span className="text-[12px] uppercase">Total amount</span>
                  <p className="text-lg font-medium">{orders.totalAmount}</p>
                </div>
                <div className="flex justify-center flex-col">
                  {/*keeping empty div for better alignment */}
                  <div className="h-4 w-4"></div>
                  <div className="flex gap-6">
                    <Button className=" hover:text-green-500">
                      <BsTruck size={20} />
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
    // <div className="flex flex-col w-full bg-gray-100 rounded-2xl tracking-normal">
    //   <h1 className="font-medium text-lg px-2 sm:px-8 py-4 border-b flex items-center gap-2">
    //     My recent orders({MyOrderList.length})
    //   </h1>
    //   {MyOrderList.length === 0 ? (
    //     <div className="p-8 capitalize font-medium">
    //       You haven't ordered any items..check out our products...
    //     </div>
    //   ) : (
    //     MyOrderList.map((order, index) => (
    //       <div
    //         key={index}
    //         // Don't need border-b for the last item
    //         className={`flex flex-col sm:flex-row gap-2 sm:items-center p-3 `}
    //       >
    //         <div className="rounded-2xl">
    //           <img
    //             src={FakeProdImg}
    //             alt={order.prodname}
    //             className="min-w-24 min-h-24 max-w-24 max-h-24 object-contain"
    //           />
    //         </div>
    //         <div className="flex max-lg:flex-col gap-4 w-full">
    //           <div className="flex max-md:flex-col gap-6 flex-1">
    //             <div className="flex-1">
    //               <p className="text-lg capitalize font-medium">
    //                 {order.prodname}
    //               </p>
    //               <p className="text-xs uppercase">
    //                 {" "}
    //                 Order Id: {order.orderId}
    //               </p>
    //               <p className="uppercase text-xs">
    //                 Ordered On : {order.orderedOn}
    //               </p>
    //             </div>
    //             <div className="flex-1 md:flex-col flex gap-2 items-center md:justify-center">
    //               <span className="text-[12px] uppercase">Total amount</span>
    //               <p className="text-lg font-medium">{order.totalAmount}</p>
    //             </div>
    //           </div>
    //           <div className="flex gap-3">
    //             <Button className="p-2">
    //               <BsTruck size={24} />
    //             </Button>
    //             <Button className="p-2">
    //               <BsArrowRightCircle size={24} />
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     ))
    //   )}
    // </div>
  );
};

export default MyOrderPage;
