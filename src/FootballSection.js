import React, { useEffect } from "react";
import FootballCard from "./FootballCard";
import LoadingCard from "./LoadingCard";
import { logEvent } from "firebase/analytics";
import moment from "moment";
import { analytics } from "./firebase";
import { AuthContext } from "./context";
const FootballSection = ({
  loadingFootballCard,
  searchChannel,
  // fetchFootballSources,
  selectedCategory,
  setFootballCardData,
  setFootballCardLoading,
  onChangeChannelSearch,
  user,
  setFootballCardSources,
  footballFrameref,
  setChannel,
}) => {
  // const FootballCardDataApi = () => {
  //   fetch(`https://ws.kora-api.top/api/matches/${moment().format("YYYY-MM-DD")}?t=59`)
  //     .then((res) => res.json())
  //     .then((data) => setFootballCardData(data));
  // };
  const FootballCardDataApiV2 = () => {
    setFootballCardLoading(true);
    // fetch(`https://streamed.pk/api/matches/football`)
    try {
      // fetch(`https://streamed.pk/api/matches/all`)
      fetch(`https://dami-tv.pro/papi/matches/all`)
        .then((res) => res.json())
        .then((data) => {
          setFootballCardData(data);
          setFootballCardLoading(false);
          onChangeChannelSearch(""); // console.log("FootballCardDataV2", data);
        });
    } catch (error) {
      console.error("Error fetching football card data:", error);
      setFootballCardLoading(false);
    }
  };
  useEffect(() => {
    FootballCardDataApiV2();
  }, []);
  const fetchFootballSources = async (sources, channels, streamedSources) => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const streamedSourcesArray = streamedSources.map((source) => ({
      id: source.id,
      name: source.name,
      // embedUrl: `https://embed.st/embed/${source.source}/${source.id}/1`,
      embedUrl: `https://embedindia.st/embed/${source.id}`,
    }));
    const newChannels = [...channels, ...streamedSourcesArray];
    if (/android/i.test(userAgent)) {
      navigator.vibrate(200);
    }
    logEvent(analytics, `${user.displayName}-${sources.id}`, {
      user: user?.displayName || "guest",
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      category: "football",
    });
    // navigator.vibrate(200);

    // const results = await Promise.allSettled(
    //   sources.map(({ source, id }) =>
    //     // fetch(`https://pooembed.eu/embed/${source}/${id}`)
    //     fetch(`https://dami-tv.pro/embed/?id=${id}`).then((r) => {
    //       if (!r.ok) throw new Error(`HTTP ${r.status}`);
    //       return r.json();
    //     }),
    //   ),
    // );

    // const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);

    // const FD = ok.flat(Infinity);
    setFootballCardSources(newChannels);
    // console.log("Selected sources for fetching:", sources);
    footballFrameref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    setChannel(`https://dami-tv.pro/embed/?id=${sources[0].id}`);

    // const failed = results.filter((r) => r.status === "rejected").length;
    // if (failed) console.warn(`Skipped ${failed} failed request(s).`);
  };

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
export default FootballSection;
