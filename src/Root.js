// Root.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context";
import Login from "./Login";

const Root = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/home" replace /> : <Login />;
};

export default Root;
