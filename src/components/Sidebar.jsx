import {
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { UsersIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, setOpen }) => {
  const sidebarRef = useRef(null);
  const submenuRef = useRef(null);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [submenuHeight, setSubmenuHeight] = useState("0px");

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

  const toggleProfileMenu = () => {
    setProfileOpen((prev) => !prev);
    if (submenuRef.current) {
      setSubmenuHeight(
        isProfileOpen ? "0px" : `${submenuRef.current.scrollHeight}px`
      );
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`bg-gray-800 text-white w-64 xl:w-72 p-4 fixed top-0 left-0 h-full lg:static lg:block transition-transform duration-300 ease-in-out transform ${
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
      <nav className="pt-4 overflow-y-scroll overflow-x-scroll">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:bg-gray-700 p-2 block rounded ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
              onClick={toggleSidebar}
            >
              <span className="flex">
                <HomeIcon className="h-5 w-5 mr-2" />
                Dashboard
              </span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/profile"
              className="text-white hover:bg-gray-700 p-2 block rounded"
              onClick={toggleSidebar}
            >
              <span className="flex">
                <UserIcon className="h-5 w-5 mr-2" />
                Profile
              </span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/settings"
              className="text-white hover:bg-gray-700 p-2 block rounded"
              onClick={toggleSidebar}
            >
              Settings
            </NavLink>
          </li>

          <li className="mb-2">
            <div
              className="text-white hover:bg-gray-700 p-2 rounded cursor-pointer flex justify-between items-center"
              onClick={toggleProfileMenu}
            >
              <span className="flex">
                <UsersIcon className="h-5 w-5 mr-2" />
                User Management
              </span>
              {isProfileOpen ? (
                <ChevronDownIcon className="h-5 w-5" />
              ) : (
                <ChevronRightIcon className="h-5 w-5" />
              )}
            </div>
            <ul
              ref={submenuRef}
              style={{ maxHeight: submenuHeight }}
              className={`pl-4 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
            >
              <li>
                <NavLink
                  to="/register"
                  className="text-white hover:bg-gray-700 p-2 block rounded"
                  onClick={toggleSidebar}
                >
                  <span className="flex">
                    <PlusIcon className="h-6 w-6 mr-2" />
                    Add User
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className="text-white hover:bg-gray-700 p-2 block rounded"
                  onClick={toggleSidebar}
                >
                  <span className="flex">
                    <ListBulletIcon className="h-6 w-6 mr-2" />
                    Users
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-white hover:bg-gray-700 p-2 block rounded"
                  onClick={toggleSidebar}
                >
                  Security Settings
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
