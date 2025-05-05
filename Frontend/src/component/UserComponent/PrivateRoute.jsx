import React from 'react';
import { Navigate } from 'react-router-dom';

const UserPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('Usertoken'); // Check if token is in localStorage

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }

  return children;
};

export default UserPrivateRoute;
