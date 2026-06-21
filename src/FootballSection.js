import React from "react";
import FootballCard from "./FootballCard";
import LoadingCard from "./LoadingCard";
export const FootballSection = ({ loadingFootballCard, searchChannel, fetchFootballSources, selectedCategory }) => {
  return (
    <div>
      <div
        // className="HideScroll"
        style={{
          display: "flex",
          // overflowX: "scroll",
          flexWrap: "wrap",
          gap: "1rem",
          width: "100%",
        }}
        // ref={FootballCardref}
      >
        {loadingFootballCard ? (
          <LoadingCard />
        ) : (
          searchChannel().map((ele, i) => {
            if (ele?.category === selectedCategory)
              return (
                <FootballCard
                  poster={ele.poster}
                  key={ele.id}
                  homeLogo={ele?.teams?.home?.badge}
                  awayLogo={ele?.teams?.away?.badge}
                  homeName={ele?.teams?.home?.name}
                  awayName={ele?.teams?.away?.name}
                  status={ele?.status}
                  time={ele.date}
                  // score={ele.score}
                  league={ele.league}
                  onClick={() => fetchFootballSources(ele.sources, ele?.tvChannels, ele?.substreams)}
                  index={i + 1}
                />
              );
          })
        )}
      </div>
    </div>
  );
};
