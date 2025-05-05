import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to the department info page
import axios from "axios"; // Make sure you have axios installed

const AdminDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState({ username: '', role: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/admindetails', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setAdminDetails({ username: data.username, role: data.role });
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    // Fetch departments
    axios.get('http://localhost:5000/api/userpublications/departments')
      .then(response => {
        setDepartments(response.data);  // Set state with fetched department data
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });

    // Fetch department publication counts based on the role
    if (adminDetails.role) {
      axios.get(`http://localhost:5000/api/userpublications/department-publications-count?role=${adminDetails.role}`)
        .then(response => {
          setDepartmentCounts(response.data);  // Set state with department publication counts
        })
        .catch(error => {
          console.error('Error fetching department publication counts:', error);
        });
    }
  }, [adminDetails.role]);  // Re-fetch departments and counts when the role changes

  const handleDepartmentClick = (department) => {
    // Navigate to department info page
    navigate(`/Admin/Department/${department.department_name}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.length > 0 ? (
          departments.map((dept, index) => {
            // Find the publication count for the department
            const departmentCount = departmentCounts.find(count => count.department_name === dept.department_name)?.publication_count || 0;
            return (
              <div
                key={index}
                className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-start cursor-pointer hover:bg-gray-600 transition duration-300"
                onClick={() => handleDepartmentClick(dept)}
              >
                <h2 className="text-xl font-semibold text-white mb-4">{dept.department_name}</h2>
                <p className="text-sm text-gray-400">Publications: {departmentCount}</p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-xl text-gray-600">No departments available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDepartment;
