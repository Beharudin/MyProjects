import { Navigate, useLocation } from "react-router-dom";
import { UseAuth } from "./Auth";

export const RequireAuth = ({ children }) => {
  const pathname = useLocation().pathname;
  const auth = UseAuth();

  if (!auth.user) {
    return <Navigate to="/login" state={{ path:pathname }}/>;
  }
  return children;
};
