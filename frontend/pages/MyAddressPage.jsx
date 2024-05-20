/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports 
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import AddressForm from "../components/ContactPageComponents/AddressForm";
import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler";
import { useCanister } from "@connect2ic/react";
import LoadingScreen from "../components/common/LoadingScreen";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base 
/* ----------------------------------------------------------------------------------------------------- */
const MyAddressPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Address"}></Header>
      <MyAddressContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> 
/* ----------------------------------------------------------------------------------------------------- */


/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> : <MyAddress Component />.
/* ----------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> : <MyAddressSaved Component />.
/* ----------------------------------------------------------------------------------------------------- */


export default MyAddressPage;
