// src/components/DepartmentSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to the department info page
import axios from 'axios';  // Make sure you have axios installed or use fetch

const ViewPublications = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch department data from the backend
    axios.get('http://localhost:5000/api/userpublications/departments')
      .then(response => {
        setDepartments(response.data);  // Set state with fetched department data
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleDepartmentClick = (department) => {
    navigate(`/view-publications/${department.department_name}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-start cursor-pointer hover:bg-gray-600 transition duration-300"
            onClick={() => handleDepartmentClick(dept)}
          >
            <h2 className="text-xl font-semibold text-white mb-4">{dept.department_name}</h2>
            <p className="text-sm text-gray-400">Publications: {dept.publication_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPublications;
