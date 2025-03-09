import React from "react";

const SongCard = ({ photo, name, link, setSongPlayLink, setNowPlaying }) => {
  return (
    <div className="MovieCardContainer">
      <div style={{ minWidth: "200px", minHeight: "300px", position: "relative", maxHeight: "300px", maxWidth: "200px" }}>
        <img
          src={photo}
          width="100%"
          height="100%"
          style={{ borderRadius: "1rem", cursor: "pointer" }}
          onClick={() => {
            setSongPlayLink(link);
            setNowPlaying(name);
          }}
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
          onClick={() => {
            setSongPlayLink(link);
            setNowPlaying(name);
          }}
        >
          {name}
        </div>
      </div>
      {/* <button
        className="downloadButton"
        onClick={() => {
          setSongPlayLink(link);
          setNowPlaying(name);
        }}
      >
        Play
      </button> */}
    </div>
  );
};

export default SongCard;
