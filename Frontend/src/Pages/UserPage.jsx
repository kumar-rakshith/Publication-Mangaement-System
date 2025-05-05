// src/Pages/UserPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserPage = () => {
  const [lecturerInfo] = useState({
    name: "Dr. John Doe",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    department: "Computer Science",
    contact: "john.doe@example.com",
  });

  return (
    <div className="min-h-screen flex bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg py-6 px-4 flex flex-col space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={lecturerInfo.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          />
          <h2 className="text-xl font-bold">{lecturerInfo.name}</h2>
          <p className="text-sm text-gray-600">{lecturerInfo.department}</p>
          <p className="text-sm text-gray-600">{lecturerInfo.contact}</p>
        </div>

        {/* Upload Publication */}
        <div>
          <Link
            to="/upload-publication"
            className="block text-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Upload Publication
          </Link>
        </div>

        {/* View Status */}
        <div>
          <Link
            to="/view-status"
            className="block text-center w-full bg-gray-200 text-gray-600 py-2 rounded-md hover:bg-gray-300"
          >
            View Status
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold mb-4">Welcome to Your Dashboard</h3>
        {/* You can choose to display some other information here */}
      </div>
    </div>
  );
};

export default UserPage;
