// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./context";

const ProtectedRoute = ({ fallbackPath = "/login" }) => {
  const { user, authResolved } = useContext(AuthContext);
  const location = useLocation();

  if (!authResolved) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to={fallbackPath} replace state={{ from: location }} />;
};

export default ProtectedRoute;
