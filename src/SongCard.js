import React from "react";

const SongCard = ({ photo, name, link }) => {
  return (
    <div className="MovieCardContainer" style={{ gap: "1rem" }}>
      <div style={{ width: "100%", height: "200px", borderRadius: "1rem", padding: "0.5rem" }}>
        <img src={photo} width="100%" height="100%" style={{ borderRadius: "1rem" }} />
      </div>
      <div>{name}</div>
      <audio controls loop preload="none" src={link} />
    </div>
  );
};

export default SongCard;
