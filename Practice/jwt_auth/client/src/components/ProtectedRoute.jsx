import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const pathname = useLocation().pathname;
  const isAuthenticated = useSelector((state) => state.loginAuth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ path:pathname }}/>
  }
  return children;
};

