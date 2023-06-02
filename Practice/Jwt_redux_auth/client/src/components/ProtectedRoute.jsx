import { useSelector } from "react-redux";
 
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const pathname = useLocation().pathname;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ path:pathname }}/>;
  }
  return children;
};

