import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to the department info page

const AdminDepartment = () => {
  // State to hold the selected department
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Departments data with publication count
  const departments = [
    {
      name: "AI & ML",
      publicationCount: 15,
      publications: [
        { title: "AI Paper 1", author: "Author 1", date: "2024-10-01" },
        { title: "AI Paper 2", author: "Author 2", date: "2024-10-05" },
      ],
    },
    {
      name: "Civil",
      publicationCount: 7,
      publications: [
        { title: "Civil Paper 1", author: "Author 1", date: "2024-09-15" },
        { title: "Civil Paper 2", author: "Author 2", date: "2024-09-20" },
      ],
    },
    {
      name: "Computer Science",
      publicationCount: 30,
      publications: [
        { title: "CS Paper 1", author: "Author 1", date: "2024-11-10" },
        { title: "CS Paper 2", author: "Author 2", date: "2024-11-12" },
      ],
    },
    {
      name: "Computer Science & Engineering (Data Science)",
      publicationCount: 12,
      publications: [{ title: "DS Paper 1", author: "Author 1", date: "2024-10-25" }],
    },
    {
      name: "Computer Science and Business Systems",
      publicationCount: 9,
      publications: [{ title: "CB Paper 1", author: "Author 1", date: "2024-08-30" }],
    },
    {
      name: "Electrical & Electronics",
      publicationCount: 10,
      publications: [{ title: "EE Paper 1", author: "Author 1", date: "2024-07-05" }],
    },
    {
      name: "Electronics & Communication",
      publicationCount: 8,
      publications: [{ title: "EC Paper 1", author: "Author 1", date: "2024-09-01" }],
    },
    {
      name: "Humanities Department",
      publicationCount: 5,
      publications: [{ title: "Humanities Paper 1", author: "Author 1", date: "2024-06-25" }],
    },
  ];

  // Navigate to the department detail page
  const navigate = useNavigate();

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    navigate(`/Admin/Department/${department.name}`); // Navigate to department info page
  };

  // Adding a dynamic effect to make the new red posts pop
  const [newPosts, setNewPosts] = useState([]);

  // Function to add "pop" posts every second
  useEffect(() => {
    const interval = setInterval(() => {
      const randomDepartment = departments[Math.floor(Math.random() * departments.length)];
      const randomPublication = randomDepartment.publications[Math.floor(Math.random() * randomDepartment.publications.length)];
      setNewPosts((prevPosts) => [
        ...prevPosts,
        {
          title: randomPublication.title,
          date: randomPublication.date,
          department: randomDepartment.name,
        },
      ]);
    }, 1000); // every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start cursor-pointer hover:bg-blue-500 transition duration-300"
            onClick={() => handleDepartmentClick(dept)}
          >
            <h2 className="text-xl font-semibold text-white mb-4">{dept.name}</h2>
            <p className="text-sm text-gray-200">Publications: {dept.publicationCount}</p>
          </div>
        ))}
      </div>

      {/* Show the new posts popping in red */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">New Posts</h2>
        <div className="space-y-4">
          {newPosts.map((post, index) => (
            <div
              key={index}
              className="bg-red-600 p-4 rounded-lg shadow-lg text-white" // Red background for new posts
            >
              <p className="font-bold">{post.title}</p>
              <p className="text-sm">Published on: {post.date}</p>
              <p className="text-sm">Department: {post.department}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDepartment;
