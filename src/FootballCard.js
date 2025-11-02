import moment from "moment";
import React from "react";

const FootballCard = ({ homeLogo, awayLogo, homeName, awayName, status, time, score, league, onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1rem",
        border: "1px solid #373b44",
        borderRadius: "1rem",
        // pointerEvents: "none",
        textWrap: "nowrap",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div>{league}</div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
        >
          <span>{homeName}</span>
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={`https://streamed.pk/api/images/proxy/${homeLogo}.webp`}
          />
        </div>
        <span>VS</span>
        <div
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
        >
          <span>{awayName}</span>
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={`https://streamed.pk/api/images/proxy/${awayLogo}.webp`}
          />
        </div>
      </div>

      {status === 1 ? <span style={{ color: "red" }}>Live</span> : <span>{moment(time).format("MMMM Do YYYY, h:mm a")}</span>}
      {status === 1 ? <div>{score}</div> : false}
    </div>
  );
};

export default FootballCard;
