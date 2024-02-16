import React, { useEffect } from "react";
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core";
import { PlugWallet, StoicWallet, defaultProviders } from "@connect2ic/core/providers";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from "@connect2ic/react";
import "@connect2ic/core/style.css";
/*
 * Import canister definitions like this:
 */
import * as backend from "../.dfx/local/canisters/backend";
import { AnimatePresence } from "framer-motion";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";
import toast, { Toaster } from "react-hot-toast";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import MyAddressPage from "./pages/MyAddressPage";
import MyOrderDetailPage from "./pages/MyOrderDetailPage";
import MyOrderInvoicePage from "./pages/MyOrderInvoicePage";
import MyOrderPage from "./pages/MyOrderPage";
import RegisterPage from "./pages/RegisterPage";
import TermOfServicePage from "./pages/TermOfServicePage";
import TeamPage from "./pages/TeamPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import MyWishlistPage from "./pages/MyWishlistPage";
import MyProfilePage from "./pages/MyProfilePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BackToTop from "./components/common/BackToTop";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Protected from "./components/common/Protected";
import AdminHome from "./pages/admin/AdminHome";
import ProtectedAdmin from "./components/common/ProtectedAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>,
  },
  {
    path: "/checkout",
    element: <CheckoutPage></CheckoutPage>,
  },
  {
    path: "/contact",
    element: <ContactPage></ContactPage>,
  },
  {
    path: "/faq",
    element: <FaqPage></FaqPage>,
  },
  {
    path: "/my-address",
    element: <MyAddressPage></MyAddressPage>,
  },

  {
    path: "/my-order-detail/:id",
    element: <MyOrderDetailPage></MyOrderDetailPage>,
  },

  {
    path: "/my-order-invoice",
    element: <MyOrderInvoicePage></MyOrderInvoicePage>,
  },
  {
    path: "/my-order",
    element: <MyOrderPage></MyOrderPage>,
  },
  {
    path: "/my-profile",
    element: <Protected><MyProfilePage></MyProfilePage></Protected>,
  },
  {
    path: "/my-wishlist",
    element: <MyWishlistPage></MyWishlistPage>,
  },
  {
    path: "/order-confirm",
    element: <OrderConfirmationPage></OrderConfirmationPage>,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage></PrivacyPolicyPage>,
  },
  {
    path: "/return-policy",
    element: <ReturnPolicyPage></ReturnPolicyPage>,
  },
  {
    path: "/shipping-policy",
    element: <ShippingPolicyPage></ShippingPolicyPage>,
  },
  {
    path: "/shipping-address",
    element: <ShippingAddressPage></ShippingAddressPage>,
  },
  {
    path: "/about",
    element: <TeamPage></TeamPage>,
  },
  {
    path: "/term-of-service",
    element: <TermOfServicePage></TermOfServicePage>,
  },
  {
    path: "/product/:slug",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/products",
    element: <ProductPage></ProductPage>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  /*{
    path: "/my-profile",
    element: (
      <Protected>
        <MyProfilePage></MyProfilePage>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  }, */
  {
    path: "*",
    element: <Error404Page></Error404Page>,
  },
]);

const App = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="App">
      <Toaster
        position="top-center"
        containerClassName="mt-6"
        reverseOrder={true}
      />
      <BackToTop />
      <AnimatePresence mode="wait" initial={true}>
        <RouterProvider router={router} />
      </AnimatePresence>
    </div>
  );
}

const client = createClient({
  canisters: {
    backend,
  },
  providers: [new PlugWallet(), new StoicWallet()],
  //providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
