import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const pathname = useLocation().pathname;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ path:pathname }}/>
  }
  return children;
};

