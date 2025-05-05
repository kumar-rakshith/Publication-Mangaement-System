import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation

const UserPage = () => {
  const location = useLocation();
  const { username, userId } = location.state || {};
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch publications when the component mounts
    if (userId) {
      fetch(`http://localhost:5000/api/publications/user/${userId}`)
        .then(response => response.json())
        .then(data => setPublications(data))
        .catch(error => console.error('Error fetching publications:', error));
    }
  }, [userId]);

  const handlePublicationClick = (publicationId) => {
    // Navigate to the publication details page with publication_id
    navigate(`/status/${publicationId}`);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Your Publication Status</h3>
      <div className="flex flex-wrap justify-start gap-6">
        {publications.length > 0 ? (
          publications.map((publication) => (
            <div
              key={publication.publication_id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-start cursor-pointer hover:bg-gray-600 transition duration-300 transform hover:scale-105 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              onClick={() => handlePublicationClick(publication.publication_id)} // Navigate to the publication details page
            >
              <div className="flex flex-col justify-between w-full">
                <h3 className="text-xl font-semibold text-white mb-4">{publication.title}</h3>
                <p className="text-white text-sm">{publication.description || 'No description available.'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300">No publications found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
