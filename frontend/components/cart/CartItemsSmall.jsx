import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import PR1 from "../../assets/fakeprod.png"

const CartItemsSmall = () => {
  return (
    <div className="rounded-xl flex justify-between items-center gap-2">
    <div className="flex justify-start items-start gap-2">
      <img
        src={PR1}
        alt={"product image"}
        className="w-[80px] bg-gray-100 rounded-xl"
      />
      <div className="flex flex-col">
        <h4 className="text-sm border-[1px] px-2 py-1/2 text-gray-600 rounded-full max-w-min bg-gray-50 mb-1">
          Category
        </h4>
        <h4 className="text-sm line-clamp-2 text-gray-900 leading-tight mb-1/2">
          Product Title One Product Title One Product
          Title One Product Title One
        </h4>
        <div className="flex gap-2">
          <h4 className="text-xs">
            <span className="text-gray-500">
              Color:{" "}
            </span>
            <span className="text-gray-800">red</span>
          </h4>
          <h4 className="text-xs">
            <span className="text-gray-500">
              Size:{" "}
            </span>
            <span className="text-gray-800">
              small
            </span>
          </h4>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-between items-end h-full">
      <div>
      <h4 className="text-gray-500 text-xs line-through font-light">$100</h4>
      <h4 className="text-gray-900 text-md font-semibold">$49</h4>
      </div>
      <button className="">
        <HiOutlineTrash className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  </div>
  )
}

export default CartItemsSmall