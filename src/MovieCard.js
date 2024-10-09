import React from "react";

const MovieCard = ({ photo, link }) => {
  return (
    <div className="MovieCardContainer">
      <img src={photo} width="200px" height="200px" style={{ borderRadius: "1rem", padding: "0.5rem" }} />
      <button>Download</button>
    </div>
  );
};

export default MovieCard;
