import React, { useEffect, useMemo, useState } from "react";
import { useCanister } from "@connect2ic/react";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusPill,
} from "./utils/Table";
import { InfinitySpin } from "react-loader-spinner";
import { Principal } from "@dfinity/principal";

const UserDetails = () => {
  const textDecoder = new TextDecoder("utf-8"); // Specify the appropriate encoding

  const columns = React.useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Principal",
        accessor: "id",
      },
      {
        Header: "FIRST NAME",
        accessor: "firstName",
      },
      {
        Header: "LAST NAME",
        accessor: "lastName",
      },
    ],
    []
  );

  const [backend] = useCanister("backend");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    listusers();
  }, [backend]);

  const listusers = async () => {
    try {
      setLoading(false);
      const userData = await backend.listUsers();
      setUser(userData);
    } catch (error) {
      console.error("Error listing all Users:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = useMemo(() => user, [user]);

  const extractedData = data.map(([key, data]) => ({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    id: data.id.toText(),
    id2: data.id,
  }));
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Users List
          </h1>
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

export default UserDetails;
