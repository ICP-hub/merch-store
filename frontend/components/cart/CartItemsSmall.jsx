import React, { useEffect, useState } from "react"
import { HiOutlineTrash } from "react-icons/hi2"
import PR1 from "../../assets/fakeprod.png"
import { useCanister } from "@connect2ic/react"
import placeholderImg from "../../assets/placeholderImg-Small.jpeg"
import toast from "react-hot-toast"
import { TailSpin } from "react-loader-spinner"
import CartItemsSmallLoader from "./CartItemsSmallLoader"

const CartItemsSmall = ({ cart, setCarts}) => {
  const [backend] = useCanister("backend")
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [loading3, setLoading3] = useState(false)

  const listCarts = async () => {
    try {
      //setLoading(true)
      const cart = await backend.getCallerCartItems()
      setCarts(cart)
    } catch (error) {
      console.error("Error listing carts:", error)
    } finally {
      //setLoading(false)
    }
  }

  //console.log(cart, 'carts');
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)

        const product2 = await backend.getProduct(cart[1]?.product_slug)
        setProduct(product2.ok)
        //console.log(product2.ok)
      } catch (error) {
        console.error("Error listing Product:", error)
      } finally {
        setLoading(false)
      }
    }
    if (backend) {
      getProduct()
    }
  }, [backend])

  const deleteCartHandler = async () => {
    try {
      setLoading3(true)

      const res = await backend.deleteCartItems(cart[1]?.id)
      console.log(res)
      if ("ok" in res) {
        toast.success("Product removed from cart.")
        listCarts()
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error)
    } finally {
      setLoading3(false)
    }
  }

  return (
    <>
    {loading ? (
      <CartItemsSmallLoader/>
    ) : (
      <div className="rounded-xl flex justify-between items-center gap-2">
      <div className="flex justify-start items-start gap-2">
        <img
          src={product?.img ? product?.img : placeholderImg}
          alt={"product image"}
          className="w-[80px] bg-gray-100 rounded-xl"
        />
        <div className="flex flex-col">
            <h4 className="text-sm border-[1px] px-2 py-1/2 text-gray-600 rounded-full max-w-max bg-gray-50 mb-1">
              {product?.category}
            </h4>
            <h4 className="text-sm line-clamp-2 text-gray-900 leading-tight mb-1/2">
              {product?.title}
            </h4>
            <div className="flex gap-2">
              <h4 className="text-xs">
                <span className="text-gray-500">Color: </span>
                <span className="text-gray-800">red</span>
              </h4>
              <h4 className="text-xs">
                <span className="text-gray-500">Size: </span>
                <span className="text-gray-800">small</span>
              </h4>
            </div>

        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-full">
          <div className="flex flex-col justify-end items-end">
            <h4 className="text-gray-500 text-xs line-through font-light">
              ${product?.price}
            </h4>
            <h4 className="text-gray-900 text-md font-semibold">
              ${product?.sellingPrice}
            </h4>
          </div>
        {loading ? (
          <div className="w-5 h-5 rounded-full bg-gray-100 animate-pulse"></div>
        ) : (
          <>
            <button
              className={`w-5 h-5 text-gray-400 ${loading3 && "opacity-50"}`}
              disabled={loading3 && true}
            >
              {loading3 ? (
                <TailSpin
                  height="100%"
                  width="100%"
                  color="gray"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              ) : (
                <HiOutlineTrash
                  title="Delete Item"
                  className={`w-full h-full`}
                  onClick={deleteCartHandler}
                />
              )}
            </button>
          </>
        )}
      </div>
    </div>
    )}
    </>
  )
}

export default CartItemsSmall
