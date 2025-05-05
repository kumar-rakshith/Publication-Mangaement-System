// DepartmentOverview.js
import React from "react";

const DepartmentOverview = ({ departments, handleDepartmentClick }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-start cursor-pointer"
            onClick={() => handleDepartmentClick(dept)}
          >
            <h2 className="text-xl font-semibold text-white mb-4">{dept.name}</h2>
            <p className="text-sm text-gray-400">Publications: {dept.publicationCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentOverview;
