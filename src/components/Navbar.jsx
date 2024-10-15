import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { FaRecycle } from "react-icons/fa6";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { BsPersonCircle } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  return (
    <div className="h-14 bg-gray-900 text-white p-1 flex justify-between lg:justify-end items-center">
      <button className="text-white lg:hidden" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className="relative" ref={dropdownRef}>
        <div className="border border-gray-500 rounded-full p-1">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <UserIcon className="h-6 w-8 text-white" />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-gray-800 text-white rounded-bl rounded-br shadow-lg z-50">
            <ul>
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-600 rounded"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="flex">
                    <UserIcon className="h-6 w-6 mr-2" />
                    Profile
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/changepassword"
                  className="block px-4 py-2 hover:bg-gray-600 rounded"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="flex">
                    <LockClosedIcon className="h-6 w-6 mr-2" />
                    Change Password
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-600 rounded"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                >
                  <span className="flex">
                    <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-2" />
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
