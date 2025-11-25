import moment from "moment";

import React, { memo } from "react";

import "./FootballCard.css";

const FootballCard = ({ homeLogo, awayLogo, homeName, awayName, status, time, score, league, onClick }) => {
  return (
    <div className="football-card" onClick={onClick}>
      <div className="league">{league}</div>
      <div className="teams">
        <div className="team">
          <span className="team-name">{homeName}</span>
          <img
            className="team-logo"
            src={
              `https://streamed.pk/api/images/proxy/${homeLogo}.webp` ||
              "https://github.com/RajatMehta25/rajatflixV2/blob/main/public/rajatflix.png?raw=true"
            }
            alt={`${homeName} logo`}
          />
        </div>
        <span>VS</span>
        <div className="team">
          <span className="team-name">{awayName}</span>
          <img className="team-logo" src={`https://streamed.pk/api/images/proxy/${awayLogo}.webp`} alt={`${awayName} logo`} />
        </div>
      </div>

      {status === 1 ? <span className="status-live">Live</span> : <span>{moment(time).format("MMMM Do YYYY, h:mm a")}</span>}
      {status === 1 ? <div>{score}</div> : false}
    </div>
  );
};

export default memo(FootballCard);
