import React from "react";

const SongCard = ({ photo, name, link, setSongPlayLink, setNowPlaying }) => {
  return (
    <div className="MovieCardContainer" style={{ gap: "1rem" }}>
      <div style={{ width: "200px", height: "200px", borderRadius: "1rem", padding: "0.5rem" }}>
        <img src={photo} width="100%" height="100%" style={{ borderRadius: "1rem" }} />
      </div>
      <div>{name}</div>
      <button
        className="downloadButton"
        onClick={() => {
          setSongPlayLink(link);
          setNowPlaying(name);
        }}
      >
        Play
      </button>
    </div>
  );
};

export default SongCard;
