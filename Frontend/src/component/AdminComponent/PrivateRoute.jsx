
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken"); 
    if (!token) {
      return <Navigate to="/AdminLogin" />; 
    }
  
    return children; 
  };
  

export default PrivateRoute;
