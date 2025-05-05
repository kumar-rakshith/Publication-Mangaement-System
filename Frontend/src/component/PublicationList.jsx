import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the publicationId from the URL

const StatusPage = () => {
  const { publicationId } = useParams(); // Extract publicationId from URL
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the publication status when the component mounts
    fetch(`http://localhost:5000/api/publications/status/${publicationId}`)
      .then(response => response.json())
      .then(data => {
        setStatus(data);  // Set the fetched status
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching status');
        setLoading(false);
      });
  }, [publicationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Publication Status</h3>
      {status ? (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
          <h4 className="text-xl font-semibold">Status: {status.status}</h4>
          <p><strong>Approved By:</strong> {status.approved_by}</p>
          <p><strong>Approval Date:</strong> {new Date(status.approval_date).toLocaleDateString()}</p>
          <p><strong>Recommended Fee:</strong> ${status.recommended_fee}</p>
          <p><strong>Comment:</strong> {status.comment || 'No comments available.'}</p>
          <p><strong>Role:</strong> {status.role}</p>
        </div>
      ) : (
        <p>No status information available for this publication.</p>
      )}
    </div>
  );
};

export default StatusPage;
