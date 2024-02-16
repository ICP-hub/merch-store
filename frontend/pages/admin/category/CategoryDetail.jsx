import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

const CategoryDetail = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [category, setCategory] = useState([]); // Add state for email
  const navigate = useNavigate();
  ;
  const param = useParams();

  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const getCategory = async () => {
    try {
      setLoading2(true);

      const item = await backend.getCategory(param.slug);
      if (item.ok) {
        setFormData({ name: item.ok.name, status: item.ok.status });
        setCategory(item.ok);
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
      getCategory();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter category title");
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);

      const res = await backend.updateCategory(
        category.slug,
        formData.name,
        formData.status
      );

      console.log(res);
      if ("ok" in res) {
        toast.success("Category Updated Successfully");
        // getCategory()
      } else if ("error" in res && res.error.includes("already exists")) {
        toast.error(
          "Category with this name already exists. Please choose a different name."
        );
      }
    } catch (error) {
      toast.error("An error occurred while updating the category.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      setLoading(true);

      const res = await backend.deleteCategory(slug);

      console.log(res);
      if ("ok" in res) {
        toast.success("Category Permanently Deleted.");

        navigate("/admin/categories");
      }
    } catch (error) {
      toast.error("An error occurred while creating the category.");
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
            Category Detail : {loading2 ? "loading..." : category.name}
          </h1>
          <div>
            <Link
              to="/admin/categories"
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
                Enter Category Title
              </label>
              <input
                id="name"
                name="name"
                value={loading2 ? "loading..." : formData.name}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Category Title"
                disabled={loading}
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Cetegory Status
              </label>
              <select
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                disabled={loading}
                value={formData.status}
                onChange={handleInputChange}
                name="status" // Ensure you have a name attribute
              >
                <option
                  value="active"
                  defaultValue={category.status === "active"}
                >
                  Active
                </option>
                <option
                  value="inactive"
                  defaultValue={category.status === "inactive"}
                >
                  Inactive
                </option>
              </select>
            </div>

            <div className="flex flex-col items-end justify-end gap-4 mt-6">
              <button
                onClick={handleSubmit}
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
                UPDATE CATEGORY
              </button>
            </div>
          </form>
          <div className="flex flex-col items-end justify-end gap-4 mt-4">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleDelete(category.slug);
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
              DELETE CATEGORY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
