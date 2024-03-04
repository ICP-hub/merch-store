import React from "react";

const LoadingScreen = () => {
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

  return { NewArrivalLoadingScreen };
};

export default LoadingScreen;
