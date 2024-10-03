import { HomeIcon, PhoneIcon, UserIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, setOpen }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div
      ref={sidebarRef}
      className={`bg-gray-800 text-white w-64 p-4 fixed top-0 left-0 h-full lg:static lg:block transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50 lg:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">MERN App</h2>
        <button className="lg:hidden text-white" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <hr className="border border-gray-500" />
      <nav className="pt-4">
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="text-white hover:bg-gray-700 p-2 block rounded"
              onClick={toggleSidebar}
            >
              <span className="flex">
                <HomeIcon className="h-5 w-5 mr-2" />
                Dashboard
              </span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/profile"
              className="text-white hover:bg-gray-700 p-2 block rounded"
              onClick={toggleSidebar}
            >
              <span className="flex">
                <UserIcon className="h-5 w-5 mr-2" />
                Profile
              </span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/settings"
              className="text-white hover:bg-gray-700 p-2 block rounded"
              onClick={toggleSidebar}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
