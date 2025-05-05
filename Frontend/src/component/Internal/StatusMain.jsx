import React from "react";
import { useNavigate } from "react-router-dom";

const getRandomDate = () => {
  const start = new Date("2024-10-01");
  const end = new Date("2024-11-30");
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const ResearchPapers = () => {
  const navigate = useNavigate();

  const papers = [
    { id: 1, title: "Deep Learning for Image Recognition", uploadedAt: getRandomDate() },
    { id: 2, title: "Blockchain and Cryptography in FinTech", uploadedAt: getRandomDate() },
    { id: 3, title: "Quantum Computing: The Next Frontier", uploadedAt: getRandomDate() },
  ];

  const handleClick = (id) => {
    navigate(`/status/${id}`); // Navigate to the status page with the paper ID
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-row justify-center items-start space-x-6">
        {papers.map((paper) => (
          <div
            key={paper.id}
            onClick={() => handleClick(paper.id)}
            className="bg-blue-600 text-white p-6 rounded-md shadow-md w-100 transform transition-transform duration-300 hover:scale-105 hover:bg-blue-700 cursor-pointer"
          >
            <h1 className="text-xl font-bold">{paper.title}</h1>
            <p className="mt-2 text-sm">Uploaded on: {paper.uploadedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPapers;
