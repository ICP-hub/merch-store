import React from "react";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";
import Button from "../components/common/Button";
import { CommonInput } from "../components/common/CommonInput";
import { useEffect, useState } from "react";

import {
  ConnectButton,
  ConnectDialog,
  useCanister,
  useConnect,
  useDialog,
} from "@connect2ic/react";
import Avatar from "boring-avatars";
import toast from "react-hot-toast";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import useClipboard from "react-use-clipboard";
import { TailSpin } from "react-loader-spinner";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components: MyProfilePage.
/* ----------------------------------------------------------------------------------------------------- */

const MyProfilePage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"AccountInfo"}></Header>
      <MyProfilePageContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

const MyProfilePageContainerMain = () => {
  return (
    <div className="container mx-auto py-6 tracking-wider">
      <div className="flex max-md:flex-col p-6 gap-6">
        <Tabs />
        {/* <MyProAccount /> */}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyProfilePageContainerMain : MyProAccount.
/* ----------------------------------------------------------------------------------------------------- */


export default MyProfilePage;
