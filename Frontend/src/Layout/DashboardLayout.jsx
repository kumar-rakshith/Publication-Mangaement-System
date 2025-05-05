import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Logout icon from react-icons

const DashboardLayout = ({ children }) => {
  const location = useLocation(); // Get the current location (route)

  // Lecturer Info (mocked data)
  const lecturerInfo = {
    name: "Dr. John Doe",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    department: "Computer Science",
    contact: "john.doe@example.com",
  };

  // Helper function to determine if the current route matches
  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-600 hover:bg-gray-300";

  const handleLogout = () => {
    // Logic for logout, e.g., clearing auth tokens, redirecting to login page, etc.
    console.log("Logout clicked!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <nav className="w-full bg-blue-600 shadow-md py-4 px-6 flex justify-between items-center">
        {/* Left: Lecturer Info */}
        <div className="flex flex-col items-start space-y-1 text-white">
          <h2 className="text-lg font-bold">{lecturerInfo.name}</h2>
          <p className="text-sm">{lecturerInfo.department}</p>
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


      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg py-6 px-4 flex flex-col space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4">
            
          </div>

          {/* Sidebar Links */}
          <div>
            <Link
              to="/user"
              className={`block text-center w-full py-2 rounded-md ${isActive("/upload")}`}
            >
              Upload Publication
            </Link>
          </div>
          <div>
            <Link
              to="/view-status"
              className={`block text-center w-full py-2 rounded-md ${isActive("/Status")}   `}
            >
              View Status
            </Link>
          </div>
          <div>
            <Link
              to="/view-publications"
              className={`block text-center w-full py-2 rounded-md ${isActive("/view-publications")}`}
            >
              View Publications
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {children} {/* This renders the page content passed to the layout */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
