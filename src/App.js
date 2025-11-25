// App.jsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Root from "./Root";
import Movies from "./Movies";
import ProtectedRoute from "./ProtectedRoute";
import ContextProvider from "./contextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Root />} />
            {/* protected routes */}
            <Route element={<ProtectedRoute fallbackPath="/login" />}>
              <Route path="/home" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
            </Route>

            {/* catch-all: redirect to home if authenticated, otherwise to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
