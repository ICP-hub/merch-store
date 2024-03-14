import { useCanister, useConnect, useTransfer } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

// Payment Address
const usePaymentTransfer = (totalAmount) => {
  // Receiver address will be in .env file : for now dev id
  const [transfer] = useTransfer({
    to: "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
    amount: Number(totalAmount),
  });
  return transfer;
};

// CartApiHandler : main
const CartApiHandler = () => {
  // Init backend
  const [backend] = useBackend();
  const { principal } = useConnect();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [totalAmountForTransfer, setTotalAmountForTransfer] = useState(null);
  const paymentAddressForTransfer = usePaymentTransfer(totalAmountForTransfer);
  const [orderPlacementData, setOrderPlacementData] = useState(null);
  const [orderPlacementLoad, setOrderPlaceMentLoad] = useState(false);

  const navigate = useNavigate();

  // Effect arraning final data for payment
  useEffect(() => {
    const paymentAddressProcess = async () => {
      if (totalAmountForTransfer !== null) {
        try {
          const response = await paymentAddressForTransfer();
          // If response undefined return
          if (response === undefined) {
            toast.error("Something went wrong");
            return;
          }
          // Proceed : get height
          const { height } = response;
          const paymentId = height.toString();
          setOrderPlacementData((prev) => ({
            ...prev,
            paymentAddress: paymentId,
          }));
        } catch (error) {
          console.error("Error getting payment address:", error);
        }
      }
    };
    paymentAddressProcess();
  }, [totalAmountForTransfer]);

  // Effect hook for final placement : Call backend
  useEffect(() => {
    if (orderPlacementData) {
      const proceedFinalPayment = async () => {
        setOrderPlaceMentLoad(true);
        if (orderPlacementData.paymentAddress === null) return;
        // Second verification : required???
        if (orderPlacementData.paymentAddress === "") {
          toast.error("Invalid payment Id!");
          return;
        }
        // Proceed backend
        try {
          setOrderPlaceMentLoad(true);
          const response = await backend.createOrder(orderPlacementData);
          console.log("orderPlacement response ", response);
          if (response.ok) {
            toast.success("Order successfully Placed");
            // Navigate to OrderConfirmationPage
            navigate("/order-confirm");
            // Clear cart after successful order placement
            await backend.clearallcartitmesbyprincipal();
          } else {
            toast.error(Object.keys(response.err));
            return;
          }
        } catch (err) {
          toast.error("Failed to place order");
          console.error("Error Order Placement", err);
        } finally {
          setOrderPlaceMentLoad(false);
        }
      };
      proceedFinalPayment();
    }
  }, [orderPlacementData]);

  // Get caller cart items
  const getCallerCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await backend.getCallerCartItems();
      console.log("getCallerCartItems response ", response);
      setCartItems(response);
    } catch (err) {
      console.error("Error Fetching Cart", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Gether order placement data for proceed
  const orderPlacement = async (
    products,
    shippingAddress,
    totalAmount,
    subTotal,
    payment
  ) => {
    // {awb:text; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64}) → (variant {ok:record {id:text; awb:text; timeUpdated:int; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; timeCreated:int; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64};
    // If user not logged in :
    if (principal === undefined) {
      toast.error("You need to login first");
      return;
    }
    setTotalAmountForTransfer(totalAmount);
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
      paymentAddress: null,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      products: products,
      subTotalAmount: subTotal,
    };
    setOrderPlacementData(orderDetails);
  };

  // Get Order List
  const getOrderList = async () => {
    try {
      setIsLoading(true);
      const response = await backend.listUserOrders();
      console.log("getOrderList response ", response);
      setOrderList(response);
    } catch (err) {
      console.error("Failed to fetch user order list");
    } finally {
      setIsLoading(false);
    }
  };

  // Get individual Order
  const getOrderById = async (id) => {
    try {
      setIsLoading(true);
      const response = await backend.getOrder(id);
      console.log("getOrderById response ", response);
      setOrderDetails(response.ok);
    } catch (err) {
      console.error("Error fetching order", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delte Cart Item
  const deleteCartItemById = async (id, setDeleteLoad, setSuccessDelete) => {
    try {
      setDeleteLoad(true);
      const response = await backend.deleteCartItems(id);
      console.log("Delete cart item response ", response);
      toast.success("Item removed successfully");
    } catch (err) {
      toast.error("Failed to remove item");
      console.error(err);
    } finally {
      setDeleteLoad(false);
      setSuccessDelete(false);
    }
  };

  // Returns
  return {
    getCallerCartItems,
    orderPlacement,
    getOrderList,
    getOrderById,
    isLoading,
    cartItems,
    orderList,
    orderDetails,
    deleteCartItemById,
    orderPlacementLoad,
  };
};

export default CartApiHandler;
