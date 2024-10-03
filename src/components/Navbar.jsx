import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

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
    <div className="bg-gray-900 text-white p-1 flex justify-between items-center">
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

      <h1 className="text-xl font-bold">My App</h1>

      <div className="relative" ref={dropdownRef}>
        <div className="border border-gray-500 rounded-full">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <UserIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-gray-800 text-white rounded-bl rounded-br shadow-lg z-50">
            <ul>
              <li>
                <Link
                  to="/account"
                  className="block px-4 py-2 hover:bg-gray-600 rounded"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="flex">
                    <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-2" />
                    Profile
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
