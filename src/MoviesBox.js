import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import moment from "moment";
import FootballCard from "./FootballCard";
import HowToDownload from "./HowToDownload";
import SongCard from "./SongCard";
import { MdOutlineDownloading } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

const MoviesBox = () => {
  const Kapilref = useRef();
  const Movieref = useRef();
  const playref = useRef();

  const Footballref = useRef();
  const Songref = useRef();
  const FootballCardref = useRef();
  const Telegramref = useRef();
  const audioRef = useRef();
  const [search, onChangeSearch] = useState("");
  const [channelSearch, onChangeChannelSearch] = useState("");
  const [searchSong, onChangeSearchSong] = useState("");
  const [serachTelegram, onChangeSearchTelegram] = useState("");

  const [data, setData] = useState([]);
  const [footballData, setFootballData] = useState([]);
  const [SongData, setSongData] = useState([]);
  const [FootballCardData, setFootballCardData] = useState([]);
  const [playingLink, setSongPlayLink] = useState("");
  const [kapils02, setKapilS02] = useState([]);
  const [movieFrame, setMovieFrame] = useState([]);
  const [playLink, setplayLink] = useState("");
  const [nowPlaying, setNowPlaying] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [iframeLink, setIframeLink] = useState("");
  const [episode, setEpisode] = useState("https://drive.google.com/file/d/15PBFDR6x-ncSwuBNWKF7gW-BUlvnJPeL/preview");
  const [channel, setChannel] = useState("https://koora.vip/share.php?ch=b1_1");
  const [telegramData, setTelegramData] = useState([]);
  const [matchData, setMatchData] = useState({});
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  // useEffect(() => {
  //   console.log("iframeLoaded", iframeLoaded);
  //   if (iframeLoaded) {
  //     const iframe = document?.getElementById("myIframe");
  //     const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;
  //     const adElements = iframeDocument?.querySelectorAll("iframe,img,a,script");
  //     adElements.forEach((ele) => {
  //       if (
  //         ele?.src?.includes("ads") ||
  //         ele?.src?.includes("ad") ||
  //         ele?.src?.includes("xads") ||
  //         ele?.src?.includes("xadsmart") ||
  //         ele?.src?.includes("/xads.js") ||
  //         ele?.src?.includes("https://c.adsco.re/") ||
  //         ele?.src?.includes("soliads") ||
  //         ele?.href?.includes("ad")
  //       ) {
  //         ele.remove();
  //       }
  //     });
  //   }
  // }, [iframeLoaded]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/Movie.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        onChangeSearch("");
      });
  }, []);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/MovieFrame.json")
      .then((res) => res.json())
      .then((data) => {
        setMovieFrame(data.data);
        // onChangeSearch("");
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
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/Songs.json")
      .then((res) => res.json())
      .then((data) => {
        setSongData(data.data);
      });
  }, []);
  useEffect(() => {
    audioRef.current.play();
  }, [playingLink, audioRef.current]);

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
  const handleMovieFrame = (event) => {
    event.preventDefault();

    playref.current.scrollLeft += event.deltaY;

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
  useEffect(() => {
    Songref.current.addEventListener("wheel", handleWheelSong);
  }, []);
  useEffect(() => {
    Songref.current.addEventListener("wheel", handleMovieFrame);
  }, []);
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
  const searchSongs = () => {
    let newData = SongData?.filter((ele) => ele.name.toLowerCase().includes(searchSong.toLowerCase()));

    // setFilteredData(newData ?? data);
    return newData;
  };

  //Football
  useEffect(() => {
    FootballCardDataApi();
  }, []);

  const FootballCardDataApi = () => {
    fetch(`https://ws.kora-api.top/api/matches/${moment().format("YYYY-MM-DD")}?t=59`)
      .then((res) => res.json())
      .then((data) => setFootballCardData(data));
  };

  const MatchDetails = (id) => {
    // fetch(`https://ws.kora-api.top/api/matche/${ID}/en?t=0716`);
    fetch(`https://ws.kora-api.top/api/matche/${id}/en?t=${moment.format("YYYY-MM-DD h:i")}`)
      .then((res) => res.json())
      .then((data) => setMatchData(data));
  };
  //telegram bot
  // useEffect(() => {
  //   fetch(`http://localhost:5000/getUpdates`).then((res) => res.json().then((json) => setTelegramData(json.result)));
  // }, []);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  return (
    <div className="MovieContainer">
      <div style={{ fontSize: "1.5rem" }}>MOVIES</div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%" }}>
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
          placeholder="Search Movie"
          className="search"
        />
        <span style={{ fontSize: "2rem", cursor: "pointer" }}>
          {/* <FaMicrophone
            onClick={() => {
              recognition.start();
              setIsListening(true);
              recognition.onresult = (event) => {
                const result = event.results[0][0].transcript;
                onChangeSearch(result);
                console.log(result);
              };
              recognition.onspeechend = () => {
                recognition.stop();
                setIsListening(false);
              };
            }}
          /> */}
        </span>
      </div>
      <div
        // className="MovieList"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Movieref}
      >
        {searchMovie(data)?.map((ele, i) => (
          <MovieCard key={ele + i} photo={ele.image} link={ele.downloadLink} name={ele.name} />
        ))}
      </div>
      {/* <HowToDownload /> */}
      <div style={{ fontSize: "1.5rem" }}>Live Stream Movies</div>
      <div style={{ fontSize: "1.2rem" }}>USE AD BLOCKER / CLOSE ADS TO WATCH MOVIE</div>

      <div style={{ width: "100%" }}>
        <iframe
          className="iframe"
          src={playLink}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
          allowFullScreen
          allowfullscreen="true"
          // onLoad={handleIframeLoad}
          id="myIframe"
        />
      </div>
      <div
        // className="kapilButtonContainer"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={playref}
      >
        {movieFrame.map((ele, i) => (
          <button key={ele.playLink + i} className="downloadButton" onClick={() => setplayLink(ele.playLink)}>
            {ele.name}
          </button>
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%" }}>
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
        <span style={{ fontSize: "2rem", cursor: "pointer" }}>
          {/* <FaMicrophone
            onClick={() => {
              recognition.start();
              setIsListening(true);
              recognition.onresult = (event) => {
                const result = event.results[0][0].transcript;
                onChangeChannelSearch(result);
                console.log(result);
              };
              recognition.onspeechend = () => {
                recognition.stop();
                setIsListening(false);
              };
            }}
          /> */}
        </span>
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

      <div style={{ fontSize: "1.5rem" }}>Songs</div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%" }}>
        <input
          onChange={(e) => {
            // if (e) {
            onChangeSearchSong(e.target.value);
            // searchChannel(e);
            // } else {
            // onChangeSearch(e);
            // setFilteredData(data);
            // }
          }}
          value={searchSong}
          placeholder="Search Song Name"
          className="search"
        />
        <span style={{ fontSize: "2rem", cursor: "pointer" }}>
          {/* <FaMicrophone
            onClick={() => {
              recognition.start();
              setIsListening(true);
              recognition.onresult = (event) => {
                const result = event.results[0][0].transcript;
                onChangeSearchSong(result);
                console.log(result);
              };
              recognition.onspeechend = () => {
                recognition.stop();
                setIsListening(false);
              };
            }}
          /> */}
        </span>
      </div>
      <div
        // className="MovieList"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Songref}
      >
        {searchSongs(SongData)?.map((ele, i) => (
          <SongCard
            photo={ele.image}
            link={ele.downloadLink}
            name={ele.name}
            key={ele.name + i}
            setSongPlayLink={setSongPlayLink}
            setNowPlaying={setNowPlaying}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
        <div>{nowPlaying}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", alignItems: "center" }}>
          <audio ref={audioRef} controls loop preload="none" src={playingLink} />
          {/* <a href={playingLink} download style={{ fontSize: "2rem" }} title="Download">
            <MdOutlineDownloading />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default MoviesBox;
