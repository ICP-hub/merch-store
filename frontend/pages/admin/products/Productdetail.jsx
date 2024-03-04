import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const param = useParams();
  const [click, setClick] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    status: "active",
    description: "",
    category: "",
    price: 0,
    inventory: 0,
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    sale_price: 0,
    variants: [
      {
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        inventory: 0,
        color: "",
        variant_price: 0,
        variant_sale_price: 0,
      },
    ],
    sizes: [{ size: "" }],
  });
  const getProduct = async () => {
    try {
      const item = await backend.getProduct(param.slug);
      if (item.ok) {
        setFormData({
          title: item.ok.title,
          status: item.ok.active ? "active" : "inactive",
          description: item.ok.description,
          category: item.ok.category,
          price: item.ok.price,
          inventory: item.ok.inventory,
          img1: item.ok.img1,
          img2: item.ok.img2,
          img3: item.ok.img3,
          img4: item.ok.img4,
          sale_price: item.ok.sellingPrice,
          variants: item.ok.variantColor || [],
          sizes: item.ok.variantSize || [],
        });
        setProduct(item.ok);
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing user:", error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProduct();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter Product title");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [name]: value };
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };
  const handleSizeChange = (index, e) => {
    const { value } = e.target;
    const newSizes = [...formData.sizes];
    newSizes[index] = { size: value };
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };
  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          img1: "",
          img2: "",
          img3: "",

          inventory: 0,
          color: "",
          variant_price: 0,
          variant_sale_price: 0,
        },
      ],
    });
  };
  const handleRemoveVariant = (index) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: "" }],
    });
  };
  const handleRemoveSize = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }

      //const existingProduct = await backend.getProduct(param.slug);
      console.log("hello");

      const requestData = {
        title: formData.title,
        active: formData.status === "active" ? true : false,

        category: formData.category,
        description: formData.description,
        trending: true,
        newArrival: true,
      };
      const variantColors = formData.variants.map((variant) => ({
        img1: variant.img1,
        img2: variant.img2,
        img3: variant.img3,

        inventory: parseInt(variant.inventory),
        color: variant.color,
        variant_price: parseFloat(variant.variant_price),
        variant_sale_price: parseFloat(variant.variant_sale_price),
      }));

      const variantSizes = formData.sizes.map((size) => ({
        size: size.size,
      }));

      // if (existingProduct.ok) {
      console.log("hello");
      const res = await backend.updateProduct(
        param.slug,
        requestData,
        variantSizes,
        variantColors
      );
      console.log(res);

      if (res) {
        toast.success("Product Updated Successfully");
      }
      // } else {
      //   const res = await backend.createProduct(
      //     requestData,
      //     variantColors,
      //     variantSizes
      //   );

      //   if ("ok" in res) {
      //     toast.success("Product Added Successfully");
      //   }
      // }
    } catch (error) {
      toast.error("An error occurred while processing the product.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      setLoading(true);

      const res = await backend.deleteProduct(slug);

      console.log(res);
      if ("ok" in res) {
        toast.success("Product Permanently Deleted.");

        navigate("/admin/products");
      }
    } catch (error) {
      toast.error("An error occurred while creating the Product.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    listAllCategories();
  }, []);

  const listAllCategories = async () => {
    try {
      setLoading3(true);
      const category = await backend.listCategories();
      setCategories(category);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading3(false);
    }
  };

  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Product Detail : {loading2 ? "loading..." : product.title}
          </h1>
          <div>
            <Link
              to="/admin/products"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3"
            >
              <CiCircleChevLeft className="w-5 h-5" /> Go back
            </Link>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Title
              </label>
              <input
                id="title"
                name="title"
                value={loading2 ? "loading..." : formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product Title"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="description"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Description
              </label>
              <input
                id="description"
                name="description"
                value={loading2 ? "loading..." : formData.description}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product Description"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="category"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Product Category
              </label>
              <select
                name="category"
                id="category"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                value={formData.category}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="">Select Product Category</option>
                {categories.map((item, index) => (
                  <option
                    value={item[1].name}
                    key={index}
                    selected={formData.category === item[1].name}
                  >
                    {item[1].name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="my-2">
              <label
                htmlFor="price"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Price
              </label>
              <input
                id="price"
                name="price"
                value={loading2 ? 0 : formData.price}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product Price"
                disabled={loading}
              />
            </div> */}
            {/* <div className="my-2">
              <label
                htmlFor="sale_price"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Sale Price
              </label>
              <input
                id="sale_price"
                name="sale_price"
                value={loading2 ? 0 : formData.sale_price}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product Sale Price"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="inventory"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Inventory
              </label>
              <input
                id="inventory"
                name="inventory"
                value={loading2 ? 0 : formData.inventory}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product inventory"
                disabled={loading}
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="img1"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Image One Url
              </label>
              <input
                id="img1"
                name="img1"
                value={loading2 ? "loading..." : formData.img1}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Image One Url"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="img2"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Image Two Url
              </label>
              <input
                id="img2"
                name="img2"
                value={loading2 ? "loading..." : formData.img2}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Image Two Url"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="img3"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Image Three Url
              </label>
              <input
                id="img3"
                name="img3"
                value={loading2 ? "loading..." : formData.img3}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Image Three Url"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="img4"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Image Four Url
              </label>
              <input
                id="img4"
                name="img4"
                value={loading2 ? "loading..." : formData.img4}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Image Four Url"
                disabled={loading}
              />
            </div> */}
            <div className="mb-6 ">
              <h3 className="uppercase text-sm text-black font-medium mb-0 tracking-wide">
                Color Variants
              </h3>
              {formData.variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-4 mb-4">
                  <input
                    type="text"
                    value={loading2 ? "loading..." : variant.color}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`color`}
                    name={`color`}
                    placeholder="Color"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    value={
                      loading2 ? "loading..." : parseInt(variant.inventory)
                    }
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`inventory`}
                    name={`inventory`}
                    placeholder="Inventory"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    value={loading2 ? "loading " : variant.variant_price}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`variant_price`}
                    name={`variant_price`}
                    placeholder="Variant Price"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    value={loading2 ? "loading " : variant.variant_sale_price}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`variant_sale_price`}
                    name={`variant_sale_price`}
                    placeholder="Variant Sale Price"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={loading2 ? "loading... " : variant.img1}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img1`}
                    name={`img1`}
                    placeholder="Varient Image One Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={loading2 ? "loading... " : variant.img2}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img2`}
                    name={`img2`}
                    placeholder="Varient Image Two Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={loading2 ? "loading... " : variant.img3}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img3`}
                    name={`img3`}
                    placeholder="Varient Image Three Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={loading2 ? "loading... " : variant.img4}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img4`}
                    name={`img4`}
                    placeholder="Varient Image Four Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="bg-red-500 text-white mr-2 mb-2 px-3 py-2 flex  items-center justify-center w-12 h-10 rounded hover:bg-red-600"
                  >
                    <TiDeleteOutline className="w-5 h-5 text-lg" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVariant}
                className="bg-[#671a1a] text-white py-2 px-4 rounded hover:bg-[#671a1af0]"
              >
                <IoMdAddCircleOutline />
              </button>
            </div>

            <div>
              <div>
                <h3 className="uppercase text-sm text-black font-medium mb-0 tracking-wide">
                  Sizes
                </h3>
                {formData.sizes.map((size, index) => (
                  <div key={index} className="mb-4">
                    <input
                      id={`size`}
                      name={`size`}
                      type="text"
                      value={loading2 ? "loading... " : size.size}
                      onChange={(e) => handleSizeChange(index, e)}
                      placeholder="Size"
                      className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-[#671a1a] text-white py-2 px-4 rounded hover:bg-[#671a1ae0]"
              >
                <IoMdAddCircleOutline />
              </button>
            </div>

            {/* <div className="my-2">
              <label
                htmlFor="image"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Product Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                value={loading2 ? "loading..." : formData.image}
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Select Product image"
                disabled={loading}
              />
              {imgBlob && (
                <img
                  src={URL.createObjectURL(imgBlob)}
                  alt="Selected Image"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div> */}

            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Product status
              </label>
              <select
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                disabled={loading}
                value={formData.status}
                onChange={handleInputChange}
                name="status" // Ensure you have a name attribute
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col items-end justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
                className={`bg-[#330000] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                  loading && "opacity-50"
                }`}
                disabled={loading}
              >
                <CiCircleCheck className="w-5 h-5" />
                UPDATE PRODUCT
              </button>
            </div>
          </form>
          <div className="flex flex-col items-end justify-end gap-4 mt-4">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleDelete(product.slug);
              }}
              type="submit"
              className={`bg-red-500 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                loading && "opacity-50"
              }`}
              disabled={loading}
            >
              {loading ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              ) : (
                <CiTrash className="w-5 h-5" />
              )}
              DELETE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
