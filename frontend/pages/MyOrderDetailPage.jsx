/* ----------------------------------------------------------------------------------------------------- */
/*  @  imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { formatDate } from "./MyOrderPage";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  HorizontalStepperComponent,
  VerticalStepperComponent,
  // VerticalStepperComponent,
} from "../components/common/Stepper";
import CartApiHandler from "../apiHandlers/CartApiHandler";
import { useParams } from "react-router-dom";
import NoImage from "../assets/placeholderImg-Small.jpeg";

/* ----------------------------------------------------------------------------------------------------- */
/*  @  Base : MyOrderDetailPage.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderDetailPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"OrderDetails"}></Header>
      <MyOrderDetailContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : <MyOrderContainerMain />.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderDetailContainerMain = () => {
  const { getOrderById } = CartApiHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { id } = useParams();
  // Filter orderList from params
  useEffect(() => {
    getOrderById(id, setIsLoading, setOrderDetails);
  }, []);

  // console.log(orderDetails);

  return (
    <div className="container mx-auto p-6 tracking-wider flex flex-col gap-6">
      {isLoading && <div>Loading....</div>}

      {!isLoading && orderDetails && orderDetails === null && (
        <div>Invalid Order ID</div>
      )}

      {!isLoading && orderDetails && orderDetails !== null && (
        <>
          <TabChanges orderId={id} />
          <DeliveryInfo shippingAddress={orderDetails.shippingAddress} />
          <DeliveryStepper />
          <OrderItemComp products={orderDetails.products} />
        </>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <TabChanges /> > top bar 
/* ----------------------------------------------------------------------------------------------------- */
const TabChanges = ({ orderId }) => {
  const paths = ["Home", "My Account", "My Orders", orderId];

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
const DeliveryInfo = ({ shippingAddress }) => {
  return (
    <div className="flex border border-dashed  rounded-2xl border-gray-900 min-w-full max-sm:flex-col">
      <div className="sm:w-1/2 sm:border-r sm:border-r-gray-900 border-dashed max-sm:border-b max-sm:border-b-gray-900">
        <div className="flex flex-col gap-3 px-2 sm:px-8 py-4">
          <h3 className="font-medium text-lg">Delivery Address</h3>
          <h4 className="font-medium">
            {shippingAddress?.firstname} {shippingAddress?.lastname}
          </h4>
          <p className="text-sm">
            {shippingAddress?.addressline1},{shippingAddress?.addressline2},
            {shippingAddress?.pin},{shippingAddress?.state}
          </p>
          <div className="flex gap-2 text-sm">
            <p className="font-medium">Email</p>
            <p>avanish@gmail.com</p>
          </div>
          <div className="flex gap-2 text-sm">
            <p className="font-medium">Phone Number</p>
            <p>{shippingAddress?.phone_number}</p>
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
const OrderItemComp = ({ products }) => {
  return (
    <div className="border-dashed border-gray-900 border rounded-2xl">
      <div className="flex flex-col">
        {products?.map((product, index) => (
          <div
            key={product?.id}
            // Don't need border-b for the last item
            className={`flex flex-col sm:flex-row gap-2 sm:items-center p-4 ${
              index !== products?.length - 1
                ? "border-b border-b-gray-900 border-dashed"
                : ""
            }`}
          >
            <div className="w-full sm:w-32 h-32">
              <img
                className="h-full w-full object-contain rounded-md"
                src={product?.img === "" ? NoImage : product?.img}
                alt={product?.title}
              />
            </div>
            <div className="flex flex-col gap-1 overflow-hidden flex-1">
              <p className="font-medium capitalize">
                {product?.title.length > 60
                  ? `${product?.title.substring(0, 60)}...`
                  : product?.title}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Quantity: {product?.quantity}
              </p>
              <p className="text-xs text-gray-600">
                Price: ${product?.sale_price.toLocaleString()}
              </p>
              <span className="text-xs text-gray-600 flex gap-4">
                <p>Size: {product?.size}</p>
                <p>Color: {product?.color}</p>
              </span>
              <span className="font-medium">
                Total: $
                {(product?.quantity * product?.sale_price)?.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrderDetailPage;
