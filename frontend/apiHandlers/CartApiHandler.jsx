import { useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

const CartApiHandler = () => {
  // Init backend
  const [backend] = useBackend();
  const { principal } = useConnect();
  const navigate = useNavigate();

  // Get caller cart items
  const getCallerCartItems = async (setIsLoading, setCartItems) => {
    try {
      setIsLoading(true);
      const response = await backend.getCallerCartItems();
      setCartItems(response);
    } catch (err) {
      console.error("Error Fetching Cart", err);
    } finally {
      setIsLoading(false);
    }
  };

  const orderPlacement = async (
    products,
    shippingAddress,
    totalAmount,
    subTotal,
    payment,
    setOrderPlaceMentLoad
  ) => {
    // {awb:text; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64}) → (variant {ok:record {id:text; awb:text; timeUpdated:int; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; timeCreated:int; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64};
    // If user not logged in :
    if (principal === undefined) {
      toast.error("You need to login first");
      return;
    }

    const userid = Principal.fromText(principal);
    // const userid = principal;
    // Create Object Orderdetails
    const orderDetails = {
      awb: "testing",
      paymentStatus: "testing",
      paymentMethod: payment,
      shippingAmount: {
        shipping_amount: 1,
      },
      orderStatus: "order placed",
      userid: userid,
      paymentAddress: "testing",
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      products: products,
      subTotalAmount: subTotal,
    };
    // console.log(orderDetails);
    // Call Backend
    try {
      setOrderPlaceMentLoad(true);
      await backend.createOrder(orderDetails);
      toast.success("Order successfully Placed");
      // Navigate to OrderConfirmationPage
      navigate("/order-confirm");
      // Clear cart after successful order placement
      // await backend.clearallcartitmesbyprincipal();
    } catch (err) {
      toast.error("Failed to place order");
      console.error("Error Order Placement", err);
    } finally {
      setOrderPlaceMentLoad(false);
    }
  };

  // Get Order List
  const getOrderList = async (setIsLoading, setOrderList) => {
    try {
      setIsLoading(true);
      const response = await backend.listUserOrders();
      // console.log(response);
      setOrderList(response);
    } catch (err) {
      console.error("Failed to fetch user order list");
    } finally {
      setIsLoading(false);
    }
  };

  // Returns
  return {
    getCallerCartItems,
    orderPlacement,
    getOrderList,
  };
};

export default CartApiHandler;
