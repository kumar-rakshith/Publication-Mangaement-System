import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DepartmentPublications = () => {
  const { departmentName } = useParams();
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/publications/${departmentName}/publications`)
      .then((response) => {
        setPublications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching publications:', error);
      });
  }, [departmentName]);

  const handlePublicationClick = (publication) => {
    console.log(publication.publication_id);
    navigate(`/UserPublications/${publication.publication_id}`); // Navigate to the publication detail page
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Publications for {departmentName}</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {publications.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No publications found for this department.</p>
        ) : (
          <table className="min-w-full table-auto text-sm text-gray-600">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Title</th>
                <th className="px-6 py-4 text-left font-medium">Author</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub) => (
                <tr
                  key={pub.publication_id}
                  className="hover:bg-gray-100 cursor-pointer transition-all duration-300"
                  onClick={() => handlePublicationClick(pub)}
                >
                  <td className="px-6 py-4 border-b border-gray-200">{pub.title}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{pub.author_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DepartmentPublications;
