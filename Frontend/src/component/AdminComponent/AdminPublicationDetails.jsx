import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminPublicationDetails = () => {
  const { publication_id } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cashAmount, setCashAmount] = useState("");
  const [cashComment, setCashComment] = useState("");
  const [adminDetails, setAdminDetails] = useState({ username: '', role: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState(""); // Track the action type: approve or reject

  // Fetch publication details
  useEffect(() => {
    const fetchPublicationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/publications/${publication_id}`);
        setPublication(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching publication details:', error);
        setLoading(false);
      }
    };

    fetchPublicationDetails();
  }, [publication_id]);

  // Fetch admin details
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

  if (loading) {
    return <p className="text-center text-xl">Loading publication details...</p>;
  }

  if (!publication) {
    return <p className="text-center text-xl">Publication not found.</p>;
  }

  const renderFileContent = (filePath) => {
    const fileExtension = filePath.split('.').pop().toLowerCase();

    switch (fileExtension) {
      case 'pdf':
        return (
          <iframe
            src={`http://localhost:5000/${filePath}`}
            width="100%"
            height="500px"
            frameBorder="0"
            title="PDF Document"
          />
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return <img src={`http://localhost:5000/${filePath}`} alt="Publication" className="w-full max-w-4xl mx-auto" />;
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'mkv':
        return (
          <video controls width="100%" className="my-4">
            <source src={`http://localhost:5000/${filePath}`} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      case 'txt':
        return (
          <pre className="bg-gray-100 p-4 border rounded-md">
            {`Loading text file...`}
          </pre>
        );
      default:
        return (
          <div className="my-4">
            <a
              href={`http://localhost:5000/${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-lg font-semibold underline"
            >
              Download {filePath}
            </a>
          </div>
        );
    }
  };

  const handleCashAmountChange = (event) => {
    setCashAmount(event.target.value);
  };

  const handleCashCommentChange = (event) => {
    setCashComment(event.target.value);
  };

  const handleActionClick = (action) => {
    setActionType(action);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false); // Close confirmation modal without taking action
  };

  const handleConfirmationConfirm = async () => {
    try {
      // Call API to update publication status
      const response = await axios.post('http://localhost:5000/api/publications/update-status', {
        publication_id: publication.publication_id,
        status: actionType, // 'Approve' or 'Reject'
        recommended_fee: cashAmount,
        comment: cashComment,
        approved_by: adminDetails.username,
        role: adminDetails.role, // Send the role along with other data
      });
  
      console.log(response.data.message);
      console.log('Publication ID:', publication.publication_id);
      console.log('Action Type:', actionType);
      console.log('Recommended Fee:', cashAmount);
      console.log('Comment:', cashComment);
      console.log('Admin Username:', adminDetails.username);
      console.log('Admin Role:', adminDetails.role);
  
      setShowConfirmation(false); // Close confirmation modal after action is confirmed
    } catch (error) {
      console.error('Error during approval/rejection:', error);
      alert('There was an error updating the publication status.');
    }
  };
  
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-6 flex gap-8">
        <div className="flex flex-col w-1/3 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">{publication.title}</h1>
          <p className="text-lg text-gray-600 mb-2">
            Author: <span className="font-medium text-gray-700">{publication.author_name}</span>
          </p>

          <div className="mb-2">
            <label htmlFor="cashAmount" className="text-sm font-semibold text-gray-800">
              Recommended Cash Amount:
            </label>
            <input
              type="number"
              id="cashAmount"
              value={cashAmount}
              onChange={handleCashAmountChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter recommended amount"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="cashComment" className="text-sm font-semibold text-gray-800">
              Add a Comment:
            </label>
            <textarea
              id="cashComment"
              value={cashComment}
              onChange={handleCashCommentChange}
              className="w-full h-[25vh] p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter comment for the fee recommendation"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleActionClick('Approve')}
              className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white py-2 px-5 rounded-lg shadow-md"
            >
              Approve
            </button>
            <button
              onClick={() => handleActionClick('Reject')}
              className="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white py-2 px-5 rounded-lg shadow-md"
            >
              Reject
            </button>
          </div>
        </div>

        <div className="w-2/3">
          <h3 className="text-xl font-semibold mb-4">File:</h3>
          {publication.file_path ? (
            renderFileContent(publication.file_path)
          ) : (
            <p>No file available for this publication.</p>
          )}

          {publication.file_path && (
            <div className="mt-4">
              <a
                href={`http://localhost:5000/${publication.file_path}`}
                download
                target="_blank"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
     
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{`Confirm ${actionType} Action`}</h2>
            <p className="text-lg text-gray-800 mb-4">{`Are you sure you want to ${actionType.toLowerCase()} the publication titled "${publication.title}"?`}</p>

            <div className="mb-4">
              <p><strong>Recommended Fee:</strong> {cashComment}</p>
              <p><strong>Comment:</strong> {cashAmount}</p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleConfirmationClose}
                className="bg-gray-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmationConfirm}
                className="bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPublicationDetails;
