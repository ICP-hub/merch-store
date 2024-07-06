import React, { createContext, useContext, useEffect, useState } from "react";
import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin } from "ic-auth";

import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../.dfx/local/canisters/backend";

const AuthContext = createContext();

const canisterID = "bd3sg-teaaa-aaaaa-qaaba-cai";
const whitelist = ["bd3sg-teaaa-aaaaa-qaaba-cai"];

export const useAuthClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    const initializeAuthClient = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        // const actor = createActor(canisterID, { agentOptions: { identity } });

        setIsConnected(true);
        setPrincipal(principal);
        setIdentity(identity);
      }
    };

    initializeAuthClient();
  }, []);

  //   const login = async (provider) => {
  const login = async () => {
    if (authClient) {
      let userObject = {
        principal: "Not Connected.",
        agent: undefined,
        provider: "N/A",
      };
      //   if (provider === "Plug") {
      //     userObject = await PlugLogin(whitelist);
      //   } else if (provider === "Stoic") {
      //     userObject = await StoicLogin();
      //   } else if (provider === "NFID") {
      //     userObject = await NFIDLogin();
      //   } else if (provider === "Identity") {
      //     userObject = await IdentityLogin();
      //   }
      userObject = await NFIDLogin();
      const identity = await userObject.agent._identity;
      const principal = Principal.fromText(userObject.principal);
      // const actor = createActor(canisterID, { agentOptions: { identity } });

      setIsConnected(true);
      setPrincipal(principal);
      setIdentity(identity);

      await authClient.login({
        identity,
        onSuccess: () => {
          setIsConnected(true);
          setPrincipal(principal);
          setIdentity(identity);
        },
      });
    }
  };

  const disconnect = async () => {
    if (authClient) {
      await authClient.logout();
      setIsConnected(false);
      setPrincipal(null);
      setIdentity(null);
    }
  };

  return {
    isConnected,
    login,
    disconnect,
    principal,
    // backendActor,
    identity,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  console.log("auth is ", auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useBackend = () => {
  const [backend] = useState(createActor(canisterID));
  return { backend };
};

export const useAuth = () => useContext(AuthContext);
