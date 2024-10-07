import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context";

const ProtectedRoute = () => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);

  console.log(user);
  return <div>{user ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default ProtectedRoute;
