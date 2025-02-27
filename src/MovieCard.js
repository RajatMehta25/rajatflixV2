import React from "react";

const MovieCard = ({ photo, link, name }) => {
  return (
    <div className="MovieCardContainer">
      <div style={{ width: "200px", height: "200px", borderRadius: "1rem", padding: "0.5rem" }}>
        <img src={photo} width="100%" height="100%" style={{ borderRadius: "1rem" }} />
      </div>
      <div>{name}</div>
      <button className="downloadButton">
        <a style={{ textDecoration: "none", color: "white" }} href={link} target="_blank">
          Watch
        </a>
      </button>
    </div>
  );
};

export default MovieCard;
