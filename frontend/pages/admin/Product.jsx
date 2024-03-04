import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusActive,
  StatusPill,
} from "./utils/Table"; // Update the import
/* import item1 from "../../assets/merchandise1.png";
 */ import { useCanister } from "@connect2ic/react";
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";
const Products = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },

      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Status",
        accessor: "active",
        Filter: SelectColumnFilter, // new
        Cell: StatusPill,
      },
      {
        Header: "PRICE",
        accessor: "price",
      },
      {
        Header: "INVENTORY",
        accessor: "inventory",
      },
      {
        Header: "Detail",
        accessor: "slug",
        Cell: DetailButton,
      },
    ],
    []
  );

  const [backend] = useCanister("backend");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllProducts();
  }, []);

  const listAllProducts = async () => {
    try {
      const items = await backend.listallProducts();
      setProducts(items);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = useMemo(() => products, [products]);
  // Get data from the second element of each sub-array
  const extractedData = data.map(([key, data]) => ({
    title: data.title,
    slug: data.slug,
    category: data.category,
    active: data.active ? "active" : "inactive",
    price: data.variantColor[0].variant_price,
    inventory: data.variantColor[0].inventory,
  }));

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll">
      <div className="">
        <div className="mb-5 flex justify-between items-center">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Products
          </h1>
          <div>
            <Link
              to="/admin/products/create-product"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
            >
              <CiCirclePlus className="w-5 h-5" /> NEW PRODUCT
            </Link>
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
          <div className="my-4">
            <button
              onClick={showAll}
              className="bg-gray-200 p-2 border mx-2 border-gray-500 rounded"
            >
              All Product
            </button>
            <button
              onClick={activeProduct}
              className="bg-gray-200 p-2 border mx-2 border-gray-500 rounded"
            >
              Active
            </button>
            <button
              onClick={pausedProduct}
              className="bg-gray-200 p-2 border border-gray-500 rounded"
            >
              Paused
            </button>
          </div>
          <div>
            <div>
              <input
                onChange={searchProduct}
                type="text"
                placeholder="Search..."
                className="border border-gray-500 p-2 outline-none"
              />
            </div>
          </div>
        </div> */}
        <div className="w-full">
          {loading ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <InfinitySpin
                width="200"
                color="black"
                ariaLabel="tail-spin-loading"
                visible={true}
              />
            </div>
          ) : (
            <Table columns={columns} data={extractedData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
