import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicationDetail = () => {
  const { publication_id } = useParams(); // Get the publication_id from the URL
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/publications/${publication_id}`)
      .then((response) => {
        setPublication(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching publication details:', error);
        setLoading(false);
      });
  }, [publication_id]);

  if (loading) {
    return <p className="text-center text-xl">Loading publication details...</p>;
  }

  if (!publication) {
    return <p className="text-center text-xl">Publication not found.</p>;
  }

  // Helper function to determine the file type
  const renderFileContent = (filePath) => {
    const fileExtension = filePath.split('.').pop().toLowerCase();

    // Handle different file types
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-extrabold text-center text-gray-800">{publication.title}</h1>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-semibold">Author: <span className="font-normal">{publication.author_name}</span></p>
          <p className="font-semibold">Date: <span className="font-normal">{publication.publication_date}</span></p>
        </div>
        <div className="flex justify-between">
        <p className="font-semibold">Co-Authors: <span className="font-normal">{publication.co_authors || 'N/A'}</span></p>
        <p className="font-semibold">Publication Type: <span className="font-normal">{publication.publication_type}</span></p>
        </div>
        <p className="text-lg mt-2">{publication.description || 'No description available'}</p>
      </div>

      {/* Files Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Files:</h3>
        {publication.file_path ? (
          <div>
            {/* <p className="text-lg text-gray-600">{publication.file_path}</p> */}
            {renderFileContent(publication.file_path)}
            <div className="mt-4">
              <a
                href={`http://localhost:5000/${publication.file_path}`}
                download
                target='_blank'
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Download File
              </a>
            </div>
          </div>
        ) : (
          <p>No files available.</p>
        )}
      </div>
    </div>
  );
};

export default PublicationDetail;
