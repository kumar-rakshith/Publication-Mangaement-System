import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminViewPublication = () => {
  const [filter, setFilter] = useState("");
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  // Fetch publications data from the backend
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/publications/view");
        const data = await response.json();
        setPublications(data); // Save data to state
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };
    fetchPublications();
  }, []);

  // Filter publications based on title or lecturer's name
  const filteredPublications = publications.filter(
    (publication) =>
      publication.title.toLowerCase().includes(filter.toLowerCase()) ||
      publication.author_name.toLowerCase().includes(filter.toLowerCase()) // Assuming 'author_name' is the lecturer's name
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">View Publications</h1>
      <input
        type="text"
        placeholder="Filter by title or lecturer"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded p-2 mb-6 w-full"
      />

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left font-semibold text-gray-700 px-6 py-4">Title</th>
              <th className="text-left font-semibold text-gray-700 px-6 py-4">Lecturer</th>
            </tr>
          </thead>
          <tbody>
            {filteredPublications.length ? (
              filteredPublications.map((publication) => (
                <tr
                  key={publication.publication_id} // Use publication_id as the key
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(`/Admin/publication/${publication.publication_id}`)
                  }
                >
                  <td className="px-6 py-4 text-gray-700 border-t border-gray-200">
                    {publication.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700 border-t border-gray-200">
                    {publication.author_name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  No publications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminViewPublication;
