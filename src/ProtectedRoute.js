// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./context";
import LoadingCard from "./LoadingCard";

const ProtectedRoute = ({ fallbackPath = "/" }) => {
  const { user, authResolved } = useContext(AuthContext);
  const location = useLocation();

  if (!authResolved) return <LoadingCard />;

  return user ? <Outlet /> : <Navigate to={fallbackPath} replace state={{ from: location }} />;
};

export default ProtectedRoute;
