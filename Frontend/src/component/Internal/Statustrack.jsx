import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaperStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState(null);

  // Mock data for paper status
  const paperStatus = {
    1: {
      title: "Deep Learning for Image Recognition",
      uploadedAt: "October 15, 2024",
      reviewers: [
        { name: "Reviewer 1", status: "Pending", comments: "Pending", fees: "Pending" },
        { name: "Reviewer 2", status: "Pending", comments: "Pending", fees: "Pending" },
        { name: "Reviewer 3", status: "Approved", comments: "Well-structured content.", fees: "$500" },
        { name: "Principal", status: "Pending", comments: "Pending", fees: "Pending" },
        { name: "Director", status: "Pending", comments: "Pending", fees: null },
      ],
    },
    2: {
      title: "Blockchain and Cryptography in FinTech",
      uploadedAt: "November 3, 2024",
      reviewers: [
        { name: "Reviewer 1", status: "Approved", comments: "Well-written and approved.", fees: "$600" },
        { name: "Reviewer 2", status: "Pending", comments: "Pending", fees: "Pending" },
        { name: "Reviewer 3", status: "Approved", comments: "Good, needs minor revisions.", fees: "$550" },
        { name: "Principal", status: "Approved", comments: "Approved for final publication.", fees: "$1000" },
        { name: "Director", status: "Pending", comments: "Pending", fees: null },
      ],
    },
    3: {
      title: "Quantum Computing: The Next Frontier",
      uploadedAt: "October 25, 2024",
      reviewers: [
        { name: "Reviewer 1", status: "Approved", comments: "Excellent work, no changes required.", fees: "$700" },
        { name: "Reviewer 2", status: "Approved", comments: "Accepted as is.", fees: "$650" },
        { name: "Reviewer 3", status: "Approved", comments: "Innovative research.", fees: "$600" },
        { name: "Principal", status: "Approved", comments: "Highly recommended for publishing.", fees: "$1200" },
        { name: "Director", status: "Approved", comments: "Supports the publication." },
      ],
    },
  };

  const paper = paperStatus[id];

  // Check if all reviewers have approved the paper
  const allReviewersApproved = paper.reviewers
    .filter(reviewer => reviewer.name !== "Principal" && reviewer.name !== "Director")  // Exclude Principal and Director
    .every(reviewer => reviewer.status === "Approved");

  // Allow Principal to view only if all reviewers have approved
  const principalCanView = allReviewersApproved;

  const openModal = (reviewer) => {
    setSelectedReviewer(reviewer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReviewer(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-blue-600">{paper.title}</h1>
        <p className="mt-2 text-sm text-gray-600">Uploaded on: {paper.uploadedAt}</p>
        <div className="mt-4 space-y-4">
          {paper.reviewers.map((reviewer, index) => {
            // Hide Principal if all reviewers have not approved
            if (reviewer.name === "Principal" && !principalCanView) {
              return null;
            }

            return (
              <div
                key={index}
                onClick={() => openModal(reviewer)}
                className="p-4 rounded-md border-2 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              >
                <span className="font-medium">{reviewer.name}</span>
                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    reviewer.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {reviewer.status}
                </span>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedReviewer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-600">Reviewer Details</h2>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Reviewer:</strong> {selectedReviewer.name}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Publication:</strong> {paper.title}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Status:</strong> {selectedReviewer.status}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Comments:</strong>{" "}
              {selectedReviewer.status === "Pending" ? "Pending" : selectedReviewer.comments}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Recommended Fees:</strong>{" "}
              {selectedReviewer.name === "Director"
                ? "N/A"
                : selectedReviewer.fees === null
                ? "N/A"
                : selectedReviewer.status === "Pending"
                ? "Pending"
                : selectedReviewer.fees}
            </p>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperStatus;
