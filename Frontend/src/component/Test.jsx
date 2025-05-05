import { useEffect, useState } from 'react';

function AdminPage() {
  const [adminDetails, setAdminDetails] = useState({ username: '', role: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/adminDetails', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setAdminDetails({ username: data.username, role: data.role });
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Welcome, {adminDetails.username}</h1>
      <p>Your role: {adminDetails.role}</p>
    </div>
  );
}

export default AdminPage;
