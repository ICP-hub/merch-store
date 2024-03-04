import {
  CiHashtag,
  CiReceipt,
  CiShop,
  CiViewBoard,
  CiVideoOn,
  CiMail,
} from "react-icons/ci";
import CountUp from "react-countup";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { TailSpin } from "react-loader-spinner";
import { PiImagesSquareThin, PiUserThin } from "react-icons/pi";

const AdminHome = () => {
  const [backend] = useCanister("backend");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Nftes, setNftes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listAll();
  }, []);

  const listAll = async () => {
    try {
      setLoading(true);
      const item = await backend.listCategories();
      setCategories(item);
      const item2 = await backend.listProducts();
      setProducts(item2);
      const item3 = await backend.listCourse();
      setCourses(item3);
      const item4 = await backend.listVideos();
      setVideos(item4);
      const item5 = await backend.listOrders();
      setOrders(item5);
      const item6 = await backend.listContacts();
      setContacts(item6);
      const item7 = await backend.listnfts();
      setNftes(item7);
      const item8 = await backend.listUsers();
      setUsers(item8);
    } catch (error) {
      console.error("Error listing all:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="styled-scrollbar flex flex-col bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <h4 className="uppercase text-xl font-semibold text-gray-900 ">
          DashBoard
        </h4>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <PiUserThin className="w-24 h-24 mr-2 font-normal absolute -right-6 -top-4 opacity-20" />

          <div className="">
            <h1 className="text-thin text-sm mb-1">Total users</h1>
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(users && users?.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <CiHashtag className="w-24 h-24 mr-2 absolute -right-6 -top-4 opacity-20" />
          <div className="">
            <h1 className="text-thin text-sm mb-1">Total Categories</h1>
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(categories && categories?.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <CiShop className="w-24 h-24 mr-2 absolute -right-7 -top-4 opacity-20" />
          <div className="">
            <h1 className="text-thin text-sm mb-1">Total Products</h1>
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(products && products?.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <CiViewBoard className="w-24 h-24 mr-2 absolute -right-6 -top-4 opacity-20" />
          <div className="">
            <h1 className="text-thin text-sm mb-1">Total Courses</h1>
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(courses && courses?.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <CiVideoOn className="w-24 h-24 mr-2 absolute -right-5 -top-5 opacity-20 rotate-180" />
          <div className="">
            <h1 className="text-thin text-sm mb-1">Total Videos</h1>
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(videos && videos?.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <CiReceipt className="w-24 h-24 mr-2 absolute -right-8 -top-4 opacity-20" />
          <div className="">
            <h1 className="text-thin text-sm mb-1">Total Orders</h1>
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(orders && orders?.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <CiMail className="w-24 h-24 mr-2 absolute -right-5 -top-5 opacity-20" />
          <div className="">
            <h1 className="text-thin text-sm mb-1">Total Messages</h1>
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(contacts && contacts?.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-start items-center text-lg bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-6 font-medium uppercase tracking-wider text-sm">
          <PiImagesSquareThin className="w-24 h-24 mr-2 absolute -right-5 -top-5 opacity-20" />
          <div>
            <h1 className="text-thin text-sm mb-1">Total NFT</h1>
            {loading ? (
              <TailSpin
                height={24}
                width={24}
                color="#512E5F"
                ariaLabel="tail-spin-loading"
                radius={1}
                visible={true}
              />
            ) : (
              <CountUp
                delay={2}
                end={(Nftes && Nftes.length) || 0}
                className="font-semibold text-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
