import { useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useState } from "react";
import toast from "react-hot-toast";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

const UserAddressApiHandler = () => {
  // Init backend
  const [backend] = useBackend();
  const { principal } = useConnect();
  const [loadComplete, setLoadComplete] = useState(true); //For get Request

  // {firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}
  // Create Address
  const createAddress = async (address, setIsLoading, setSuccessfulSubmit) => {
    // console.log(address);
    try {
      setIsLoading(true);
      const response = await backend.createAddress({
        ...address,
        address_type: "default",
      });
      console.log("Create Address Response ", response);
      toast.success("Address created successfully");
      setSuccessfulSubmit(true);
    } catch (err) {
      toast.error("Failed to create address");
      console.error("Error creating address : ", err);
    } finally {
      setIsLoading(false);
      setSuccessfulSubmit(false);
    }
  };

  // Get Address List
  const getAddressList = async (setUserAddressList, setIsLoading) => {
    try {
      setIsLoading(true);
      const response = await backend.listUserAddresses();
      console.log("getAddressList response", response);
      setUserAddressList(response);
    } catch (err) {
      console.error("Error fetching address list", err);
    } finally {
      setIsLoading(false);
      setLoadComplete(false);
    }
  };

  // Update Address
  const updateAddress = async (address, setIsLoading, setSuccessfulSubmit) => {
    // console.log(address)
    if (!principal) {
      toast.error("You need to login first");
      return;
    }
    try {
      setIsLoading(true);
      // Getting this error > Error updating address :  Error: Wrong number of message arguments
      // await backend.updateAddress({ ...address, address_type: "default" });
      const response = await backend.updateAddress(
        { ...address, address_type: "default" },
        "Address updated successfullty",
        Principal.fromText(principal)
      );
      console.log("updateAddressResponse ", response);
      if (response.ok) {
        toast.success("Address updated successfully");
        setSuccessfulSubmit(true);
      } else {
        toast.error(Object.keys(response.err));
        return;
      }
    } catch (err) {
      toast.error("Failed to update address");
      console.error("Error updating address : ", err);
    } finally {
      setIsLoading(false);
      setSuccessfulSubmit(false);
    }
  };

  // Returns
  return {
    createAddress,
    getAddressList,
    updateAddress,
    loadComplete,
  };
};

export default UserAddressApiHandler;
