import React, { useState } from "react";

const AdminViewPublications = () => {
  const [filter, setFilter] = useState("");

  // Mocked publications data (for pending approval)
  const pendingPublications = [
    { id: 1, title: "AI in Healthcare", lecturer: "Dr. Alice", date: "2024-11-01", abstract: "This paper discusses AI applications in healthcare." },
    { id: 2, title: "Blockchain Technology", lecturer: "Dr. Bob", date: "2024-11-02", abstract: "Exploring blockchain applications in various sectors." },
  ];

  // Filtering based on title or lecturer's name
  const filteredPublications = pendingPublications.filter(
    (publication) =>
      publication.title.toLowerCase().includes(filter.toLowerCase()) ||
      publication.lecturer.toLowerCase().includes(filter.toLowerCase())
  );

  const handleApprove = (id) => {
    alert(`Publication ID ${id} approved!`);
    // Here, add logic to update the backend status to "Approved"
  };

  const handleReject = (id) => {
    alert(`Publication ID ${id} rejected.`);
    // Here, add logic to update the backend status to "Rejected" and leave comments if required
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Publications Queue</h1>
      <input
        type="text"
        placeholder="Filter by title or lecturer"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      />

      {filteredPublications.length ? (
        <div className="space-y-4">
          {filteredPublications.map((publication) => (
            <div key={publication.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{publication.title}</h2>
              <p>Lecturer: {publication.lecturer}</p>
              <p>Submitted on: {publication.date}</p>
              <p>Abstract: {publication.abstract}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleApprove(publication.id)}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(publication.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No publications pending approval.</p>
      )}
    </div>
  );
};

export default AdminViewPublications;
