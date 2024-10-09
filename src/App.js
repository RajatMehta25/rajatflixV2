import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import MoviesBox from "./MoviesBox";
import ContextProvider from "./contextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/Home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
