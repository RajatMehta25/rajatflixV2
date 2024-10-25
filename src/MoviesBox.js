import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import moment from "moment";
import FootballCard from "./FootballCard";

const MoviesBox = () => {
  const Kapilref = useRef();
  const Movieref = useRef();

  const Footballref = useRef();
  const Songref = useRef();
  const FootballCardref = useRef();
  const [search, onChangeSearch] = useState("");
  const [channelSearch, onChangeChannelSearch] = useState("");

  const [data, setData] = useState([]);
  const [footballData, setFootballData] = useState([]);
  const [SongData, setSongData] = useState([]);
  const [FootballCardData, setFootballCardData] = useState([]);

  const [kapils02, setKapilS02] = useState([]);

  const [iframeLink, setIframeLink] = useState("");
  const [episode, setEpisode] = useState("https://drive.google.com/file/d/15PBFDR6x-ncSwuBNWKF7gW-BUlvnJPeL/preview");
  const [channel, setChannel] = useState("https://koora.vip/share.php?ch=b1_1");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/Movie.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        onChangeSearch("");
      });
  }, []);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/Kapil.json")
      .then((res) => res.json())
      .then((data) => {
        setKapilS02(data.data);
      });
  }, []);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/football_channels.json")
      .then((res) => res.json())
      .then((data) => {
        setFootballData(data.data);
      });
  }, []);
  // useEffect(() => {
  //   fetch("https://api.flvto.site/@api/search/YouTube/diljit%20dosanjh%20songs").then((data) => {
  //     setSongData(data.items);
  //     console.log(data.items);
  //   });
  // }, []);
  const handleWheelKapil = (event) => {
    event.preventDefault();

    Kapilref.current.scrollLeft += event.deltaY;

    // console.log((ref.current.scrollLeft += event.deltaY));
  };
  const handleWheelMovie = (event) => {
    event.preventDefault();

    Movieref.current.scrollLeft += event.deltaY;

    // console.log((ref.current.scrollLeft += event.deltaY));
  };
  const handleWheelFootball = (event) => {
    event.preventDefault();

    Footballref.current.scrollLeft += event.deltaY;

    // console.log((ref.current.scrollLeft += event.deltaY));
  };
  const handleWheelFootballCard = (event) => {
    event.preventDefault();

    FootballCardref.current.scrollLeft += event.deltaY;

    // console.log((ref.current.scrollLeft += event.deltaY));
  };
  const handleWheelSong = (event) => {
    event.preventDefault();

    Songref.current.scrollLeft += event.deltaY;

    // console.log((ref.current.scrollLeft += event.deltaY));
  };
  useEffect(() => {
    Kapilref.current.addEventListener("wheel", handleWheelKapil);
  }, []);
  useEffect(() => {
    Movieref.current.addEventListener("wheel", handleWheelMovie);
  }, []);
  useEffect(() => {
    Footballref.current.addEventListener("wheel", handleWheelFootball);
  }, []);
  useEffect(() => {
    FootballCardref.current.addEventListener("wheel", handleWheelFootballCard);
  }, []);
  // useEffect(() => {
  //   Songref.current.addEventListener("wheel", handleWheelSong);
  // }, []);
  const searchMovie = () => {
    let newData = data?.filter((ele) => ele.name.toLowerCase().includes(search.toLowerCase()));

    // setFilteredData(newData ?? data);
    return newData;
  };
  const searchChannel = () => {
    let newData = footballData?.filter((ele) => ele.channel_name.toLowerCase().includes(channelSearch.toLowerCase()));

    // setFilteredData(newData ?? data);
    return newData;
  };

  //Football
  useEffect(() => {
    FootballCardDataApi();
  }, []);

  const FootballCardDataApi = () => {
    fetch(`https://web-api.yalla-score.com/api/all-matches/en/${moment().format("YYYY-MM-DD")}/shoote-yalla.com?t=59`)
      .then((res) => res.json())
      .then((data) => setFootballCardData(data));
  };

  return (
    <div className="MovieContainer">
      <div style={{ width: "100%" }}>
        <input
          onChange={(e) => {
            // if (e) {
            onChangeSearch(e.target.value);
            // searchChannel(e);
            // } else {
            // onChangeSearch(e);
            // setFilteredData(data);
            // }
          }}
          value={search}
          placeholder="Search Movie Name"
          className="search"
        />
      </div>
      <div style={{ fontSize: "1.5rem" }}>MOVIES</div>

      <div
        // className="MovieList"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Movieref}
      >
        {searchMovie(data)?.map((ele, i) => (
          <MovieCard key={ele + i} photo={ele.image} link={ele.downloadLink} name={ele.name} />
        ))}
      </div>
      <div style={{ fontSize: "1.5rem" }}>Kapil Season 2</div>
      <div style={{ width: "100%" }}>
        <iframe
          className="iframe"
          src={episode}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
          allowFullScreen
        />
      </div>
      <div
        // className="kapilButtonContainer"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Kapilref}
      >
        {kapils02.map((ele, i) => (
          <button key={ele.downloadLink + i} className="downloadButton" onClick={() => setEpisode(ele.downloadLink)}>
            {ele.name}
          </button>
        ))}
      </div>

      <div style={{ fontSize: "1.5rem" }}>Live Stream Football</div>
      {/* <div style={{ fontSize: "1rem" }}>(Use Ad Blocker)</div> */}

      <div style={{ width: "100%" }}>
        <iframe
          className="iframe"
          src={channel}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
          allowFullScreen
        />
      </div>

      <div style={{ fontSize: "1rem" }}>TV Channels (Click To Watch Live)</div>
      <div style={{ width: "100%" }}>
        <input
          onChange={(e) => {
            // if (e) {
            onChangeChannelSearch(e.target.value);
            // searchChannel(e);
            // } else {
            // onChangeSearch(e);
            // setFilteredData(data);
            // }
          }}
          value={channelSearch}
          placeholder="Search Channel Name"
          className="search"
        />
      </div>
      <div
        className="HideScroll"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Footballref}
      >
        {searchChannel().map((ele, i) => (
          <button
            style={{ textWrap: "nowrap", textTransform: "uppercase" }}
            key={ele.link + i}
            className="downloadButton"
            onClick={() => setChannel(ele.link)}
          >
            {ele.channel_name}
          </button>
        ))}
      </div>
      <div style={{ fontSize: "1rem" }}>Today Matches</div>
      <div style={{ fontSize: "1rem" }}>
        <button className="downloadButton" onClick={() => FootballCardDataApi()}>
          Refresh Score Cards
        </button>
      </div>

      <div
        className="HideScroll"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={FootballCardref}
      >
        {FootballCardData.map((ele, i) => (
          <FootballCard
            key={ele.id}
            homeLogo={ele.home_logo}
            awayLogo={ele.away_logo}
            homeName={ele.home_en}
            awayName={ele.away_en}
            status={ele.status}
            time={ele.time}
            score={ele.score}
            league={ele.league_en}
          />
        ))}
      </div>

      {/* <div style={{ fontSize: "1.5rem" }}>Movies</div>
      <div style={{ width: "100%" }}>
        <input
          onChange={(e) => {
            // if (e) {
            onChangeSearch(e.target.value);
            // searchChannel(e);
            // } else {
            // onChangeSearch(e);
            // setFilteredData(data);
            // }
          }}
          value={search}
          placeholder="Search Song Name"
          className="search"
        />
      </div>
      <div
        // className="MovieList"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Songref}
      >
        {searchMovie(SongData)?.map((ele, i) => (
          <span>{ele.title}</span>
        ))}
      </div> */}
    </div>
  );
};

export default MoviesBox;
