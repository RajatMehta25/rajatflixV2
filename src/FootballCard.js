import moment from "moment";
import React from "react";

const FootballCard = ({ homeLogo, awayLogo, homeName, awayName, status, time, score, league }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1rem",
        border: "1px solid #373b44",
        borderRadius: "1rem",
        pointerEvents: "none",
        textWrap: "nowrap",
      }}
    >
      <div>{league}</div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
        >
          <span>{homeName}</span>
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            // src={`https://ws.kora-api.top/uploads/team/${homeLogo}`}
          />
        </div>
        <span>VS</span>
        <div
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
        >
          <span>{awayName}</span>
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            // src={`https://ws.kora-api.top/uploads/team/${awayLogo}`}
          />
        </div>
      </div>

      {status === 1 ? (
        <span style={{ color: "red" }}>Live</span>
      ) : (
        <span>{moment.utc(time, "HH:mm:ss").local().format("hh:mm A")}</span>
      )}
      {status === 1 ? <div>{score}</div> : false}
    </div>
  );
};

export default FootballCard;
