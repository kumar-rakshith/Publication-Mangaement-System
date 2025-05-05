// src/pages/DepartmentPage.js
import React from "react";

const DepartmentPage = () => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <ul className="space-y-2">
        <li className="text-gray-700 text-lg">Chemistry</li>
        <li className="text-gray-700 text-lg">Mathematics</li>
        <li className="text-gray-700 text-lg">Physics</li>
        <li className="text-gray-700 text-lg">Computer Science & Engg</li>
        <li className="text-gray-700 text-lg">Electrical & Electronics Engg</li>
        <li className="text-gray-700 text-lg">Mechanical Engg</li>
        <li className="text-gray-700 text-lg">Business Administration</li>
        <li className="text-gray-700 text-lg">Department of Computer Application</li>
        <li className="text-gray-700 text-lg">Electronics & Communication Engg</li>
        <li className="text-gray-700 text-lg">Civil Engg</li>
      </ul>
    </div>
  );
};

export default DepartmentPage;
