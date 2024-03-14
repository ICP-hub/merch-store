import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusPill,
} from "./utils/Table"; // Update the import
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";

const Categories = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "active",
        Filter: SelectColumnFilter, // new
        Cell: StatusPill,
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listAllCategories();
  }, []);

  const listAllCategories = async () => {
    try {
      const category = await backend.listCategories();
      console.log(category, "hello from list categories");

      setLoading(true);
      setCategories(category);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = useMemo(() => categories, [categories]);
  // Get data from the second element of each sub-array
  const extractedData = data.map(([key, data]) => ({
    name: data.name,
    slug: data.slug,
    active: data.active ? "active" : "inactive",
  }));
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll overflow-x-hidden">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Categories
          </h1>
          <div>
            <Link
              to="/admin/categories/create-category"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
            >
              <CiCirclePlus className="w-5 h-5" /> Create New
            </Link>
          </div>
        </div>
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

export default Categories;
