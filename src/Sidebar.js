import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Film, MonitorPlay } from "lucide-react";
const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category.target.innerText}`);
    if (category.target.innerText.includes("Movies")) {
      // Handle Movies category click
      console.log("Movies category selected");
      navigate("/movies");
    }
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ minWidth: open ? "250px" : "25px", borderRight: "1px solid #ccc", height: "100vh" }}>
        <h2 onClick={handleOpen} style={{ cursor: "pointer" }}>
          <Menu />
        </h2>
        <ul onClick={handleCategoryClick} style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Film />
            <span style={{ display: open ? "block" : "none" }}> Movies</span>
          </li>
          <li>
            <MonitorPlay />
            <span style={{ display: open ? "block" : "none" }}>TV Shows</span>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Sidebar;
