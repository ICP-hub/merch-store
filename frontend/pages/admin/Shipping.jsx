import React from "react";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";

const Shipping = () => {
  return (
    <>
      <div>
        <div className="w-full">
          <div className="styled-scrollbar flex flex-col  bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
            <div className="mb-5  justify-between items-center gap-2">
              <h1 className="uppercase text-xl font-semibold text-gray-800  ">
                Shipping amount
              </h1>
              <div className="my-2">
                <input
                  id="title"
                  type="text"
                  className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                  placeholder="Enter Shipping Amount"
                />
                <div className="flex flex-col items-end justify-end gap-4 mt-6">
                  <button
                    className="bg-[#330000] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                      
                    "
                  >
                    <CiCircleCheck className="w-5 h-5" />
                    UPDATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Shipping;
