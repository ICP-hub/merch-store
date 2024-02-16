/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React from "react";
import {
  HiListBullet,
  HiMapPin,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { useLocation, Link } from "react-router-dom";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyProfilePageContainerMain : MyProTabs > tabComponents are the arr of tabs
/* ----------------------------------------------------------------------------------------------------- */
// const MyProTabs = ({ tabComponents }) => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <motion.div className="flex max-md:flex-col p-6 gap-6">
//       <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
//       <motion.div
//         key={activeTab}
//         initial={{ opacity: 0, y: -100 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 100 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="w-full"
//       >
//         {tabComponents[activeTab]}
//       </motion.div>
//     </motion.div>
//   );
// };

/* Tabs Component : My Pro Tabs */

const Tabs = () => {
  const location = useLocation();

  const tabs = [
    {
      name: "Profile",
      icon: <HiOutlineUser size={24} />,
      route: "my-profile",
    },
    { name: "Orders", icon: <HiListBullet size={24} />, route: "my-order" },
    {
      name: "My Wishlist",
      icon: <HiOutlineShoppingCart size={24} />,
      route: "my-wishlist",
    },
    { name: "Address", icon: <HiMapPin size={24} />, route: "my-address" },
    {
      name: "Disconnect",
      icon: <HiOutlineArrowLeftOnRectangle size={24} />,
      route: "disconnect",
    },
  ];

  return (
    <div className="px-2 bg-gray-900 text-white flex max-md:items-center max-md:justify-center flex-col gap-4 font-medium py-6 max-md:w-full rounded-2xl min-w-64 min-h-80 max-h-96">
      <h1 className="text-lg">Account Information</h1>
      {tabs.map((item, index) => (
        // Switch between tabs
        <Link
          key={index}
          to={`/${item.route}`}
          className={`flex items-center gap-4 w-full p-2 rounded-md ${
            location.pathname.includes(item.route)
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          }`}
        >
          <span className="max-md:ml-[25%]">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export { Tabs };
