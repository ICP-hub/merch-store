import React from "react";
import logo from "../../../assets/logo.svg";
import {
  CiGrid31,
  CiGrid32,
  CiHashtag,
  CiLogout,
  CiMail,
  CiReceipt,
  CiSettings,
  CiShop,
  CiVideoOff,
  CiVideoOn,
  CiViewBoard,
} from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
//import useModal from "../../modal/useModal";
import Modal from "../../modal/Modal";

const LeftSidebar = ({ sidebar, setSidebar }) => {
  const { openModal, showModal } = useModal();

  return (
    <>
      {openModal && <Modal />}

      {sidebar && (
        <div className="lg:col-span-1 col-span-5 w-full">
          <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-3 flex flex-col justify-between ">
            <div className="flex flex-col">
              <div className="flex justify-center items-center mb-10">
                <Link to="/admin">
                  <img
                    src={logo}
                    alt="CoffeeCulture Admin"
                    className="block mx-auto h-16"
                  />
                </Link>
                {/*  <button onClick={setSidebar(!sidebar)}>hjbvjk</button> */}
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto overscroll-y-auto">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiGrid32 className="w-5 h-5 mr-2" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/categories"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiHashtag className="w-5 h-5 mr-2" />
                  Categories
                </NavLink>
                <NavLink
                  to="/admin/products"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiShop className="w-5 h-5 mr-2" />
                  Products
                </NavLink>
                <NavLink
                  to="/admin/nft"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiViewBoard className="w-5 h-5 mr-2" />
                  nft
                </NavLink>
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiReceipt className="w-5 h-5 mr-2" />
                  Orders
                </NavLink>
                <NavLink
                  to="/admin/courses"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiViewBoard className="w-5 h-5 mr-2" />
                  Courses Categories
                </NavLink>

                <NavLink
                  to="/admin/videos"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiVideoOn className="w-5 h-5 mr-2" />
                  Courses Videos
                </NavLink>
                <NavLink
                  to="/admin/messages"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiMail className="w-5 h-5 mr-2" />
                  Messages
                </NavLink>
                <NavLink
                  to="/admin/users-list"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiMail className="w-5 h-5 mr-2" />
                  Users
                </NavLink>
                {/* <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center text-lg bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                      : "flex justify-start items-center text-lg bg-transparent dark:bg-transparent hover:bg-[#330000]/20 dark:hover:bg-[#330000]/30 text-gray-900 dark:text-white hover:text-[#330000] rounded-xl px-6 py-3 font-medium uppercase tracking-wider text-sm"
                  }
                >
                  <CiSettings className="w-5 h-5 mr-2" />
                  Settings
                </NavLink> */}
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                to="/"
                className="font-light text-black uppercase hover:text-[#330000] text-sm tracking-widest"
              >
                Switch to main site
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSidebar;
