import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusActive,
  StatusPill,
  StatusRead,
} from "./utils/Table"; // Update the import
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";

const Message = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      /* {
        Header: "Read",
        accessor: "read",
        Filter: SelectColumnFilter, // new
        Cell: StatusRead,
      }, */
      {
        Header: "Detail",
        accessor: "id",
        Cell: DetailButton,
      },
    ],
    []
  );

  const [backend] = useCanister("backend");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllMessage();
  }, []);

  const listAllMessage = async () => {
    try {
      setLoading(true);
      const message = await backend.listContacts();
      setMessages(message);
    } catch (error) {
      console.error("Error listing all Message:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = useMemo(() => messages, [messages]);
  // Get data from the second element of each sub-array
  const extractedData = data.map(([key, data]) => data);
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white dark:bg-slate-800 rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Messages
          </h1>
          <div></div>
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

export default Message;
