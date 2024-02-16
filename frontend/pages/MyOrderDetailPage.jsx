/* ----------------------------------------------------------------------------------------------------- */
/*  @  imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import FakeProdImg from "../assets/fakeprod.png";
import { formatDate } from "./MyOrderPage";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from "../components/common/Hero";
import {
  HorizontalStepperComponent,
  VerticalStepperComponent,
  // VerticalStepperComponent,
} from "../components/common/Stepper";

/* ----------------------------------------------------------------------------------------------------- */
/*  @  Base : MyOrderDetailPage.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderDetailPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"OrderDetails"}></Header>
      <Hero></Hero>
      <MyOrderDetailContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : <MyOrderContainerMain />.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderDetailContainerMain = () => {
  return (
    <div className="container mx-auto p-6 tracking-wider flex flex-col gap-6">
      <TabChanges />
      <DeliveryInfo />
      <DeliveryStepper />
      <OrderItemComp />
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <TabChanges /> > top bar 
/* ----------------------------------------------------------------------------------------------------- */
const TabChanges = () => {
  const paths = ["Home", "My Account", "My Orders", "ABCED-FGHIJ-12345"];

  return (
    <div className="text-gray-600 gap-2 flex text-xs font-medium py-6 items-center">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <Button className="min-w-max">{path}</Button>
          {index < paths.length - 1 && <span>{">"}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <DeliveryInfo /> > Left 
/* ----------------------------------------------------------------------------------------------------- */
const DeliveryInfo = () => {
  return (
    <div className="flex border border-dashed  rounded-2xl border-gray-900 min-w-full max-sm:flex-col">
      <div className="sm:w-1/2 sm:border-r sm:border-r-gray-900 border-dashed max-sm:border-b max-sm:border-b-gray-900">
        <div className="flex flex-col gap-3 px-2 sm:px-8 py-4">
          <h3 className="font-medium text-lg">Delivery Address</h3>
          <h4 className="font-medium">Avanish Ranjan Shrivastava</h4>
          <p className="text-sm">
            Tarapur Colony, sector number 1, Jaunpur, 222022, Uttar Pradesh
          </p>
          <div className="flex gap-2 text-sm">
            <p className="font-medium">Email</p>
            <p>avanish@gmail.com</p>
          </div>
          <div className="flex gap-2 text-sm">
            <p className="font-medium">Phone Number</p>
            <p>123456789</p>
          </div>
        </div>
      </div>
      <MoreActions />
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <DeliveryInfo /> > Right 
/* ----------------------------------------------------------------------------------------------------- */
const MoreActions = () => {
  return (
    <div className="sm:w-1/2 ">
      <div className="flex flex-col gap-3 px-2 sm:px-8 py-4">
        <h3 className="font-medium text-lg">More Actions</h3>
        <div className="flex gap-2 text-sm">
          <p className="font-medium">Payment Status:</p>
          <p className="font-medium text-green-700">Success</p>
        </div>
        <div className="flex gap-2 text-sm">
          <p className="font-medium">Delivery Status:</p>
          <p className="font-medium text-gray-700">Pending</p>
        </div>
        <div className="flex gap-2 text-sm">
          <Button className="p-2  rounded-md bg-black text-white font-medium">
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <DeliveryStepper />  
/* ----------------------------------------------------------------------------------------------------- */
const DeliveryStepper = () => {
  const labels = [
    "Order Placed",
    "Ready to Dispatch",
    "Dispatched",
    "Out For Delivery",
    "Delivered",
  ];

  // Date Will Be Dynamic for prod build
  const date = formatDate(new Date());
  const subLabels = [date, date, date, date, date];

  const [isVertical, setIsVertical] = useState(window.innerWidth <= 768);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth <= 768);
    };

    const handleStepChange = () => {
      // If the current step is greater than the number of steps in vertical mode,
      // set the current step to the last step.
      if (isVertical && currentStep >= labels.length) {
        setCurrentStep(labels.length - 1);
      }
    };

    handleResize();
    handleStepChange();

    window.addEventListener("resize", () => {
      handleResize();
      handleStepChange();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isVertical, currentStep, labels.length]);

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  return (
    <>
      <div
        className={`border border-dashed border-gray-900 rounded-2xl ${
          !isVertical ? "p-8" : null
        }`}
      >
        {isVertical ? (
          <VerticalStepperComponent
            labels={labels}
            subLabels={subLabels}
            // showController={true}
            currentStep={currentStep}
            onStepChange={handleStepChange}
          />
        ) : (
          <HorizontalStepperComponent
            labels={labels}
            subLabels={subLabels}
            // showController={true}
            currentStep={currentStep}
            onStepChange={handleStepChange}
          />
        )}
      </div>
    </>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <OrderItemComp />  
/* ----------------------------------------------------------------------------------------------------- */
const OrderItemComp = () => {
  const fakeProducts = [
    {
      _id: "fakeItemId1",
      name: "Boat Headphone XYZ",
      image: FakeProdImg,
      price: 29.99,
      quantity: 2,
      orderedAt: new Date("2024-02-10T12:00:00"),
      shippedAt: new Date("2024-02-11T14:30:00"),
      deliveredAt: new Date("2024-02-12T10:15:00"),
    },
    {
      _id: "fakeItemId2",
      name: "Boat Headphone ABC",
      image: FakeProdImg,
      price: 29.99,
      quantity: 2,
      orderedAt: new Date("2024-02-10T12:00:00"),
      shippedAt: new Date("2024-02-11T14:30:00"),
      deliveredAt: new Date("2024-02-12T10:15:00"),
    },
  ];

  return (
    <div className="border-dashed border-gray-900 border rounded-2xl">
      <div className="flex flex-col">
        {fakeProducts.map((product, index) => (
          <div
            key={product._id}
            // Don't need border-b for the last item
            className={`flex flex-col sm:flex-row gap-2 sm:items-center p-4 ${
              index !== fakeProducts.length - 1
                ? "border-b border-b-gray-900 border-dashed"
                : ""
            }`}
          >
            <div className="w-full sm:w-32 h-32">
              <img
                draggable="false"
                className="h-full w-full object-contain rounded-md"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="flex flex-col gap-1 overflow-hidden flex-1">
              <p className="text-sm font-medium">
                {product.name.length > 60
                  ? `${product.name.substring(0, 60)}...`
                  : product.name}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Quantity: {product.quantity}
              </p>
              <p className="text-xs text-gray-600">
                Price: ${product.price.toLocaleString()}
              </p>
              <span className="font-medium">
                Total: ${(product.quantity * product.price).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col w-full sm:w-1/2 items-start">
              <h3 className="font-medium sm:text-center">Order Status</h3>
              <p className="text-sm">{`Ordered on: ${product.orderedAt.toLocaleString()}`}</p>
              <p className="text-sm">{`Shipped on: ${product.shippedAt.toLocaleString()}`}</p>
              <p className="text-sm">{`Delivered on: ${product.deliveredAt.toLocaleString()}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrderDetailPage;
