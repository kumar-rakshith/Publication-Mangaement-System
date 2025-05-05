// PublicationsQueue.js
import React, { useState } from "react";

const PublicationsQueue = ({ pendingPublications, handleApprove, handleReject }) => {
  const [filter, setFilter] = useState("");

  // Filtering based on title or lecturer's name
  const filteredPublications = pendingPublications.filter(
    (publication) =>
      publication.title.toLowerCase().includes(filter.toLowerCase()) ||
      publication.lecturer.toLowerCase().includes(filter.toLowerCase())
  );

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

export default PublicationsQueue;
