import React, { useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Button from "../components/common/Button.jsx";

const OrderConfirmationPage = () => {
  const [showCheckIcon, setShowCheckIcon] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
    }
  }, [showConfetti]);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen w-screen "
        style={{ backgroundColor: "#EDBB99" }}
      >
        {paymentFailed ? (
          <div className="flex items-center justify-center h-screen">
            <div
              className="bg-white p-8 rounded   max-w-md flex flex-col "
              style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)" }}
            >
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                Payment Failed
              </h2>
              <p className="text-gray-700 mb-4">
                We're sorry, but your payment could not be processed. Please try
                again later.
              </p>
              <Button
                className="bg-black text-white px-4 py-2 rounded-md  "
                onClick={() => window.location.reload()}
              >
                Retry Payment
              </Button>
            </div>
          </div>
        ) : (
          <>
            {showConfetti && (
              <Confetti
                width={width}
                height={height}
                style={{ position: "fixed", top: 0, left: 0 }}
              />
            )}
            {/*backdrop-blur-lg*/}
            <div
              className="flex flex-col items-center bg-white/50 backdrop-blur-lg  p-10 md:w-[50%] w-[90%] mt-4 rounded-xl"
              style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)" }}
            >
              <div className="success-checkmark">
                <div
                  className="check-icon"
                  style={{ display: showCheckIcon ? "block" : "none" }}
                >
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
              <p className="md:text-2xl text-lg font-bold mb-4">
                Thank you for ordering
              </p>
              <center className="text-gray-400 mb-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
                praesentium natus in ea
              </center>
              <div className="flex items-center xl:justify-center justify-between">
                <Button className="border border-black xl:w-48 rounded-md text-xs  md:text-sm text-black p-3 m-3">
                  {" "}
                  view order{" "}
                </Button>
                <Button className="border border-black text-xs md:text-sm rounded-md md:w-64 sm:w-48 p-3 m-3 bg-black text-white">
                  {" "}
                  continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderConfirmationPage;
