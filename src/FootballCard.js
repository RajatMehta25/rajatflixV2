import moment from "moment";

import React, { memo } from "react";

import "./FootballCard.css";

const FootballCard = ({ homeLogo, awayLogo, homeName, awayName, status, time, score, league, onClick, poster, index }) => {
  const posterLinkResolver = (poster) => {
    if (poster && poster.startsWith("http")) {
      return poster;
    } else {
      return `https://damitv.st${poster}`;
    }
  };

  const teamLogoResolver = (logo) => {
    if (logo && logo.startsWith("http")) {
      return logo;
    } else if (logo && logo.startsWith("Gw")) {
      return `https://github.com/RajatMehta25/rajatflixV2/blob/main/public/rajatflix.png?raw=true`;
    } else {
      return `https://github.com/RajatMehta25/rajatflixV2/blob/main/public/rajatflix.png?raw=true`;
    }
  };

  return (
    <div
      className="football-card"
      style={{
        backgroundImage: `url(	${posterLinkResolver(poster)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    >
      <div className="league">{league}</div>
      <div className="teams">
        <div className="team">
          <span className="team-name">{homeName}</span>
          <img className="team-logo" src={teamLogoResolver(homeLogo)} alt={`${homeName} logo`} />
        </div>
        <span>VS</span>
        <div className="team">
          <span className="team-name">{awayName}</span>
          <img className="team-logo" src={teamLogoResolver(awayLogo)} alt={`${awayName} logo`} />
        </div>
      </div>

      {status === 1 ? <span className="status-live">Live</span> : <span>{moment(time).format("MMMM Do YYYY, h:mm a")}</span>}
      {status === 1 ? <div>{score}</div> : false}
      {status === "upcoming" ? <div>Upcoming</div> : false}
      {index}
    </div>
  );
};

export default memo(FootballCard);
