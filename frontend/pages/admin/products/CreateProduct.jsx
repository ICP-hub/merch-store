import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { CiCircleCheck, CiCircleChevLeft } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
import { useCanister } from "@connect2ic/react";
import { WithContext as ReactTags } from "react-tag-input";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
const CreateCategory = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [categorylist, setCategorylist] = useState([]);

  const [tags, setTags] = useState([]);

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

  useEffect(() => {
    listAllCategories();
    listAllProducts();
  }, []);

  const listAllCategories = async () => {
    try {
      setLoading2(true);
      const category = await backend.listCategories();
      setCategorylist(category);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading2(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // const handleAddCategory = () => {
  //   const selectedCategories = Array.from(
  //     document.getElementById("categories").selectedOptions
  //   ).map((option) => option.value);
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     categories: [...prevState.categories, ...selectedCategories],
  //   }));
  // };

  // const handleRemoveCategory = (categoryToRemove) => {
  //   setFormData({
  //     ...formData,
  //     categories: formData.categories.filter(
  //       (category) => category !== categoryToRemove
  //     ),
  //   });
  // };
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
          img4: "",
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
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter Product title");
      return false;
    }
    return true;
  };
  const listAllProducts = async () => {
    try {
      const items = await backend.listallProducts();
      return items;
    } catch (error) {
      console.error("Error listing all products:", error);
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);

      const requestData = {
        title: formData.title,
        active: true,

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
      // const categories = formData.categories.map((category) => ({
      //   status: category.status,
      //   name: category.name,
      //   slug: category.slug,
      // }));
      // const products = await listAllProducts();
      // const existingProduct = products.find(
      //   (product) => product.title === requestData.title
      // );

      // if (existingProduct) {
      //   toast.error(
      //     "Product with this title already exists. Please choose a different title."
      //   );
      // } else {
      const res = await backend.createProduct(
        requestData,
        variantSizes,
        variantColors
      );

      console.log(res);
      if ("ok" in res) {
        toast.success("Product Added Successfully");

        setFormData({
          title: "",
          status: "active",
          description: "",
          price: 0,
          inventory: 0,
          category: "",
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
          sizes: [
            {
              size: "",
            },
          ],
          // categories: [{ status: "active", name: "", slug: "" }],
        });
      }
      // }
    } catch (error) {
      toast.error("An error occurred while creating the product.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Create a Product
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
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product Title"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Description
              </label>
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product description"
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
                {categorylist.map((item, index) => (
                  <option value={item[1].name} key={index}>
                    {item[1].name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="my-2">
              <label
                htmlFor="categories"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Product Category
              </label>

              <div className="flex items-center mt-2">
                <select
                  name="categories"
                  id="categories"
                  className="border-2 p-2 outline-none border-[#F4F2F2] rounded-lg mr-2"
                  value={formData.categories.name}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Select Product Category</option>
                  {categorylist.map((item, index) => (
                    <option
                      value={item[1].name}
                      key={index}
                      selected={formData.categories.includes(item.name)}
                    >
                      {item[1].name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-[#671a1a] text-white py-2 px-4 rounded hover:bg-[#671a1ae2]"
                >
                  Add Category
                </button>
              </div>
              <div className="selected-categories mt-2">
                <p>Selected Categories:</p>
                <ul>
                  {formData.categories.map((category, index) => (
                    <li key={index} className="flex items-center">
                      {category.name}
                      <button
                        className="remove-button bg-red-500 text-white mr-2 mb-2 px-3 py-2 rounded hover:bg-red-600"
                        onClick={() => handleRemoveCategory(category)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Price
              </label>
              <input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter product price"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="sale_price"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Sale Price
              </label>
              <input
                id="sale_price"
                name="sale_price"
                value={formData.sale_price}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Sale  product price"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Inventory
              </label>
              <input
                id="inventory"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product Inventory"
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
                value={formData.img1}
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
                value={formData.img2}
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
                value={formData.img3}
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
                value={formData.img4}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Image Four Url"
                disabled={loading}
              />
            </div>
            <div className="mb-6 ">
              <h3 className="uppercase text-sm text-black font-medium mb-0 tracking-wide">
                Color Variants
              </h3>
              {formData.variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-4 mb-4">
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`color`}
                    name={`color`}
                    placeholder="Color"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    value={variant.inventory}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`inventory`}
                    name={`inventory`}
                    placeholder="Inventory"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    value={variant.variant_price}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`variant_price`}
                    name={`variant_price`}
                    placeholder="Variant Price"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    value={variant.variant_sale_price}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`variant_sale_price`}
                    name={`variant_sale_price`}
                    placeholder="Variant Sale Price"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={variant.img1}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img1`}
                    name={`img1`}
                    placeholder="Varient Image One Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={variant.img2}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img2`}
                    name={`img2`}
                    placeholder="Varient Image Two Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={variant.img3}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img3`}
                    name={`img3`}
                    placeholder="Varient Image Three Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={variant.img4}
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
                    <TiDeleteOutline className="w-5 h-5 text-2xl" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVariant}
                className="bg-[#671a1a] text-white py-2 px-4 rounded hover:bg-[#671a1aeb]"
              >
                <IoMdAddCircleOutline className="w-5 h-5 text-2xl" />
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
                      id={"size"}
                      name={`size`}
                      type="text"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, e)}
                      placeholder="Size"
                      className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      <TiDeleteOutline className="w-5 h-5 text-2xl" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-[#671a1a] text-white py-2 px-4 rounded hover:bg-[#671a1ae2]"
              >
                <IoMdAddCircleOutline className="w-5 h-5 text-2xl" />
              </button>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`bg-[#330000] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
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
                  <CiCircleCheck className="w-5 h-5" />
                )}
                SUBMIT PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
