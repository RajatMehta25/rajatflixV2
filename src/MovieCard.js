import React from "react";

const MovieCard = ({ photo, link, name }) => {
  return (
    <div className="MovieCardContainer">
      <div style={{ minWidth: "200px", minHeight: "300px", position: "relative" }}>
        <img
          src={photo}
          width="100%"
          height="100%"
          style={{ borderRadius: "1rem" }}
          onClick={() => window.open(link, "_blank")}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            color: "white",
            minHeight: "50px",
            backgroundColor: "rgba(255,255,255,0.2)",
            width: "100%",
            textAlign: "center",
            borderRadius: "1rem 1rem 0 0",
            fontFamily: "cursive",
            cursor: "pointer",
          }}
          onClick={() => window.open(link, "_blank")}
        >
          {name}
        </div>
      </div>
      {/* <div>{name}</div> */}
      {/* <button className="downloadButton">
        <a style={{ textDecoration: "none", color: "white" }} href={link} target="_blank">
          Download
        </a>
      </button> */}
    </div>
  );
};

export default MovieCard;
