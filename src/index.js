import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./Login";
const root = ReactDOM.createRoot(document.getElementById("root"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
// ]);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
