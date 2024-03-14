import React from "react";

const LoadingScreen = () => {
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ NewArrivalLoadingScreen : <HomePageBottom />
/* ----------------------------------------------------------------------------------------------------- */
  const NewArrivalLoadingScreen = () => {
    return (
      <div className="px-6 md:container md:mx-auto mb-10">
        <div
          data-aos="fade-up"
          className="p-6 grid sm:grid-cols-2 max-h-full overflow-hidden gap-2 border-[1px] border-dashed rounded-2xl"
        >
          <div data-aos="fade-up" className="order-2 sm:order-1 flex flex-col">
            <div className="flex-1 overflow-auto flex flex-col gap-2">
              <p className="text-sm text-slate-600">NEW ARRIVAL</p>
              <h1 className="h-8 max-md:h-6 pb-4 bg-gray-300 rounded-lg animate-pulse"></h1>
              <p className=" h-40  bg-gray-200 rounded-lg animate-pulse"></p>
            </div>
          </div>
          <div className="order-1 sm:order-2 rounded-2xl bg-gray-200 justify-center items-center flex shadow-lg mb-4 md:mb-0 animate-pulse">
            <div className="h-80 w-80 "></div>
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ SavedAddress Loading Screen : <MyAddressPage />
/* ----------------------------------------------------------------------------------------------------- */
  const MyAddressLoadingScreen = () => {
    return (
      <div className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col max-lg:gap-3">
        <div className="gap-3 flex-1">
          <div className="flex gap-3">
            <div className="capitalize text-lg font-medium bg-gray-300 w-36 h-6 animate-pulse rounded-md mb-2"></div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-3 text-sm font-medium mb-2">
              <div className="bg-gray-300 w-40 h-4 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
        <div className="animate-pulse">
          <button className="py-2 px-4 bg-gray-500 text-white font-medium text-sm lg:rounded-full max-lg:rounded-md h-9 w-28"></button>
        </div>
      </div>
    );
  };
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Shipping Address Loading Screen : <ShippingAddress />
 /* ----------------------------------------------------------------------------------------------------- */
  const ShippingAddressPageLoader = () => {
    return (
      <div className="flex w-full max-md:flex-col gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div class="md:flex border border-gray-300 rounded-xl p-2 w-full bg-gray-100">
            <div class="flex flex-col p-2 animate-pulse">
              <div class="flex gap-2 items-center w-full">
                <span class="h-5 w-5 bg-gray-300 rounded-full"></span>
                <div class="flex-1 flex sm:items-center gap-2 max-sm:flex-col mb-2">
                  <p class="font-bold capitalize min-w-max bg-gray-300 h-5 w-32 rounded-md"></p>
                  <span class="px-2 py-1 rounded-md bg-gray-300 text-gray-500 uppercase text-xs flex items-center max-w-max font-semibold h-5"></span>
                  <p class="font-semibold bg-gray-300 h-5 w-24 rounded-md"></p>
                </div>
              </div>
              <div class="flex gap-2 items-center">
                <span class="h-5 w-5"></span>
                <div class="flex-1">
                  <p class="capitalize bg-gray-300 h-5 w-48 rounded-md mb-2"></p>
                  <p class="font-semibold bg-gray-300 h-5 w-36 rounded-md"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-xl">
            <button className="font-semibold px-8 py-4" tabindex="0">
              + New Address
            </button>
          </div>
        </div>
        <div className="border-2 rounded-2xl max-h-96">
          <div className="flex flex-col">
            <div className="border-b-2 py-6">
              <span className="uppercase font-semibold px-6 text-xl text-slate-500">
                Price details
              </span>
            </div>
            <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
              <div className="flex justify-between px-6 gap-2 font-medium">
                <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-xl"></p>
                <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></span>
              </div>
              <div className="flex justify-between px-6 gap-2 font-medium">
                <p className="bg-gray-300 h-6 w-36 animate-pulse rounded-xl"></p>
                <span className="flex gap-2">
                  <p className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></p>
                </span>
              </div>
            </div>
            <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
              <div className="flex justify-between px-6 gap-2 font-bold">
                <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-xl"></p>
                <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></span>
              </div>
            </div>
            <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
              <div className="px-6">
                <div className="bg-gray-300 h-6 w-72 animate-pulse rounded-xl"></div>
              </div>
            </div>
            <div className="p-6"></div>
          </div>
        </div>
      </div>
    );
  };

  return {
    NewArrivalLoadingScreen,
    MyAddressLoadingScreen,
    ShippingAddressPageLoader,
  };
};

export default LoadingScreen;
