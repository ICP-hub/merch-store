import React from "react";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Components Import.
/* ----------------------------------------------------------------------------------------------------- */
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import HeaderMain from "../components/common/HeaderMain";
import Hero from "../components/common/Hero";
import Contact from "../components/common/Contact";
import Footer from "../components/common/Footer";
import HomePageContainerMain from "../components/HomeComponents/HomePageContainerMain";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components.
/* ----------------------------------------------------------------------------------------------------- */
const HomePage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <HeaderMain title={'MerchStore'}></HeaderMain>
      <HomePageContainerMain />
      <Contact></Contact>
      <Footer></Footer>
    </AnimationView>
  );
};

export default HomePage;
