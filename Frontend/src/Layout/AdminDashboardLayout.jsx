// src/Layouts/DashboardLayout.js

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { FiLogOut } from "react-icons/fi";


const AdminDashboardLayout = ({ children }) => {
  const location = useLocation(); // Get the current location (route)
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown visibility
  const [viewingPublicationsQueue, setViewingPublicationsQueue] =
    useState(false); // Track viewing state

  // Admin Info (mocked data)
  const adminInfo = {
    name: "Admin",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    contact: "admin@example.com",
  };

  // Helper function to determine if the current route matches
  const isActive = (path) =>
    location.pathname.includes(path)
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-600 hover:bg-gray-300";

  // Departments data (for dropdown)
  const departments = [
    { name: "AI & ML" },
    { name: "Civil" },
    { name: "Computer Science" },
    { name: "Computer Science & Engineering (Data Science)" },
    { name: "Computer Science and Business Systems" },
    { name: "Electrical & Electronics" },
    { name: "Electronics & Communication" },
    { name: "Humanities Department" },
  ];

  const handleDepartmentClick = (department) => {
    setIsDropdownOpen(false);
    navigate(`/Admin/Department/${department.name}`);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Logic for logout, e.g., clearing auth tokens, redirecting to login page, etc.
    console.log("Logout clicked!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sidebar */}
      <nav className="w-full bg-blue-600 shadow-md py-4 px-6 flex justify-between items-center">
        {/* Left: Lecturer Info */}
        <div className="flex flex-col items-start space-y-1 text-white">
        <h2 className="text-xl font-bold">{adminInfo.name}</h2>
          <p className="text-sm ">{adminInfo.contact}</p>
        </div>
        {/* Right: Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </nav>
      <div className="flex flex-1">
      <div className="w-64 bg-white shadow-lg py-6 px-4 flex flex-col space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          {/* <img
            src={adminInfo.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          /> */}
         
        </div>

        {/* Sidebar Links */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} 
        >
          <Link
            to="/Admin" 
            className={`block text-center w-full py-2 rounded-md ${isActive(
              "/Admin"
            )}`}
          >
            Department
          </Link>

          {/* Department Dropdown */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isDropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2 bg-white rounded-md">
              <ul>
                {departments.map((dept, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer rounded-2xl m-2 hover:bg-gray-200"
                    onClick={() => handleDepartmentClick(dept)} 
                  >
                    <h2 className="text-sm font-semibold">{dept.name}</h2>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <Link
            to="/Admin/ViewPublication"
            className={`block text-center w-full py-2 rounded-md ${isActive(
              "/Admin/ViewPublication"
            )}`}
          >
            View Publications
          </Link>
        </div>

        <div>
          <Link
            to="/Admin/ViewPublication"
            className={`block text-center w-full py-2 rounded-md ${isActive(
              "/jbdb"
            )}`}
          >
            Pending Review Publications
          </Link>
        </div>

        <div>
          <Link
            to="/Admin/ViewPublication"
            className={`block text-center w-full py-2 rounded-md ${isActive(
              "/djd"
            )}`}
          >
           Approved Review Publications
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Render Department Section or other content */}
        {children} {/* This renders the page content passed to the layout */}
      </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
