import { useCanister } from "@connect2ic/react";
import { useState } from "react";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

const UserApiHanlder = () => {
  // Init backend
  const [backend] = useBackend();
  const [isLoading, setIsLoading] = useState("");

  const createContact = async (username, phone, email, message) => {
    console.log(username, email, message);
    try {
      setIsLoading(true);
    } catch (err) {
      console.error("Error creating contact : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Returns
  return { createContact };
};

export default UserApiHanlder;
