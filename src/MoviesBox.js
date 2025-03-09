import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import moment from "moment";
import FootballCard from "./FootballCard";
import HowToDownload from "./HowToDownload";
import SongCard from "./SongCard";
import { MdOutlineDownloading } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { use } from "react";
import { TiChartLine } from "react-icons/ti";
// import { CastButton, useCastSession } from "react-google-cast";

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
  const [searchFrame, onChangeSearchFrame] = useState("");

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
  const [playLink, setplayLink] = useState(movieFrame[0]?.playLink || "https://fino338khhe.com/play/tt0327785");
  const [nowPlaying, setNowPlaying] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [iframeLink, setIframeLink] = useState("");
  const [episode, setEpisode] = useState("https://drive.google.com/file/d/15PBFDR6x-ncSwuBNWKF7gW-BUlvnJPeL/preview");
  const [channel, setChannel] = useState("https://koora.vip/share.php?ch=b1_1");
  const [telegramData, setTelegramData] = useState([]);
  const [matchData, setMatchData] = useState({});
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [count, setCount] = useState(Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000);
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
        onChangeSearchFrame("");
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
        setSongPlayLink(data.data[0].downloadLink);
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
  // useEffect(() => {
  //   Songref.current.addEventListener("wheel", handleMovieFrame);
  // }, []);
  const searchMovie = () => {
    let newData = data?.filter((ele) => ele.name.toLowerCase().includes(search.toLowerCase()));

    // setFilteredData(newData ?? data);
    return newData;
  };
  const searchMovieFrame = () => {
    let newData = movieFrame?.filter((ele) => ele.name.toLowerCase().includes(searchFrame.toLowerCase()));

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

  // const [isCasting, setIsCasting] = useState(false);
  // const [castSession, setCastSession] = useState(null);
  // useEffect(() => {
  //   const initCastApi = async () => {
  //     try {
  //       await window["__onGCastApiAvailable"];
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   initCastApi();
  // }, []);
  // const initializeCastApi = async (isAvailable) => {
  //   if (!isAvailable) {
  //     console.log("Cast API not available");
  //     return;
  //   }
  //   const context = await window.cast.framework.CastContext.getInstance();
  //   context.setOptions({
  //     receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
  //     autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  //   });
  //   // context.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, (event) => {
  //   //   console.log(event);
  //   //   setIsCasting(event.castState !== "NO_DEVICES_AVAILABLE");
  //   // });
  // };

  // const handleCast = async () => {
  //   if (!isCasting) {
  //     try {
  //       const castSession = await window.cast.framework.CastContext.getInstance().requestSession();
  //       setCastSession(castSession);
  //       setIsCasting(true);
  //       loadMedia(castSession);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   } else {
  //     try {
  //       await castSession.endSession();
  //       setIsCasting(false);
  //     } catch (error) {}
  //   }
  // };
  // const loadMedia = async (castSession) => {
  //   const mediaInfo = new window.cast.framework.MediaInfo(playLink);
  //   const request = new window.cast.framework.LoadRequest(mediaInfo);
  //   try {
  //     await castSession.loadMedia(request);
  //   } catch (error) {}
  // };

  useEffect(() => {
    const initializeCast = () => {
      const cast = window.cast;
      const chrome = window.chrome;
      console.log(cast);
      console.log("window.chrome", chrome);

      const castContext = cast.framework.CastContext.getInstance();
      castContext.setOptions({
        receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID, // Use the default media receiver or your custom receiver app ID
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });

      // Add event listeners for media status changes
      const castSession = castContext.getCurrentSession();
      if (castSession) {
        const mediaManager = castSession.getMediaSession();
        if (mediaManager) {
          mediaManager.addEventListener(cast.framework.events.EventType.MEDIA_STATUS, (event) => {
            const mediaStatus = event.mediaStatus;
            console.log("Media status:", mediaStatus);

            if (mediaStatus.playerState === "PLAYING") {
              console.log("Media is playing");
            } else if (mediaStatus.playerState === "PAUSED") {
              console.log("Media is paused");
            } else if (mediaStatus.playerState === "IDLE") {
              if (mediaStatus.idleReason === "FINISHED") {
                console.log("Media has ended");
              } else if (mediaStatus.idleReason === "CANCELLED") {
                console.log("Media playback was cancelled");
              } else {
                console.log("Media is idle");
              }
            }
          });
        }
      }
    };

    window["__onGCastApiAvailable"] = (isAvailable) => {
      if (isAvailable && window.chrome) {
        console.log("Cast API available");
        initializeCast();
      }
    };
    if (!window.cast || !window.cast.framework) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
      script.onload = () => {
        if (window["__onGCastApiAvailable"]) {
          window["__onGCastApiAvailable"](true);
        }
      };
      document.body.appendChild(script);
    } else {
      initializeCast();
    }
  }, [window.cast, window.chrome]);

  const showCastDialog = () => {
    if (!window.cast || !window.cast.framework || !window.chrome || !window.chrome.cast) {
      console.error("Cast framework or chrome.cast is not available.");
      return;
    }

    const castContext = window.cast.framework.CastContext.getInstance();
    castContext.requestSession().then(
      () => {
        console.log("Cast session started successfully");
        castMedia(); // Cast media after the session starts
      },
      (error) => {
        console.error("Error starting Cast session:", error);
      }
    );
  };
  const castMedia = () => {
    const cast = window.cast;
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession) {
      const mediaInfo = new window.chrome.cast.media.MediaInfo(playingLink, "audio/mp3");
      // Set repeat mode to loop the current media item
      mediaInfo.repeatMode = window.chrome.cast.media.RepeatMode.REPEAT_SINGLE;
      // Optional: Add metadata
      mediaInfo.metadata = new window.chrome.cast.media.MusicTrackMediaMetadata();
      let title = SongData?.filter((ele) => ele.downloadLink === playingLink)[0]?.name;
      console.log("title--", title);
      mediaInfo.metadata.title = title || "Song Title";
      mediaInfo.metadata.artist = "RAJAT MEHTA";
      let image = SongData?.filter((ele) => ele.downloadLink === playingLink)[0]?.image;
      console.log("image--", image);
      mediaInfo.metadata.images = [new window.chrome.cast.Image(image)];

      const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
      castSession.loadMedia(request).then(
        () => {
          console.log("Media loaded successfully");
          if (audioRef.current.src === playingLink) {
            audioRef.current.pause();
          }
        },
        (error) => {
          console.error("Error loading media:", error);
        }
      );
    } else {
      console.log("No session");
    }
  };

  // const castSession = useCastSession();

  // const castVideo = () => {
  //   if (castSession) {
  //     const mediaInfo = new window.chrome.cast.media.MediaInfo(playLink);
  //     const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
  //     castSession.loadMedia(request).then(
  //       () => {
  //         console.log("Media loaded successfully");
  //       },
  //       (error) => {
  //         console.error("Error loading media:", error);
  //       }
  //     );
  //   }
  // };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="MovieContainer">
      {/* <HowToDownload /> */}
      <div style={{ fontSize: "1.5rem", fontFamily: "monospace", textAlign: "center" }}>
        WorldWide Active User Count :{" "}
        <span style={{ color: "#db0000" }} className="blinking-text">
          {count}
        </span>
      </div>
      {/* <div style={{ fontSize: "1.5rem" }}>Live Stream Movies</div>
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
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <input
          onChange={(e) => {
            // if (e) {
            onChangeSearchFrame(e.target.value);
            // searchChannel(e);
            // } else {
            // onChangeSearch(e);
            // setFilteredData(data);
            // }
          }}
          value={searchFrame}
          placeholder="Search Movie"
          className="search"
        />
      </div>
      <div
        // className="kapilButtonContainer"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%", overflowY: "hidden" }}
        ref={playref}
      >
        {searchMovieFrame().map((ele, i) => (
          // <button key={ele.playLink + i} className="downloadButton" onClick={() => setplayLink(ele.playLink)}>
          //   {ele.name}
          // </button>
          <div style={{ position: "relative", minWidth: "200px", minHeight: "300px", maxHeight: "300px", maxWidth: "200px" }}>
            <img
              style={{
                borderRadius: "1rem",
                // padding: "0.5rem",
                cursor: "pointer",
                width: "100%",
                height: "100%",
              }}
              key={ele.playLink + i}
              src={ele.image}
              alt={ele.name}
              // className="movieFrame"
              onClick={() => setplayLink(ele.playLink)}
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
              onClick={() => setplayLink(ele.playLink)}
            >
              {ele.name}
            </div>
          </div>
        ))}
      </div> */}
      <div style={{ fontSize: "1.5rem" }}>DOWNLOAD MOVIES</div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
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
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%", overflowY: "hidden" }}
        ref={Movieref}
      >
        {searchMovie(data)?.map((ele, i) => (
          <MovieCard key={ele + i} photo={ele.image} link={ele.downloadLink} name={ele.name} />
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
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%", overflowY: "hidden" }}
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
          <button className="downloadButton" onClick={showCastDialog}>
            Play on TV
          </button>
          {/* <a href={playingLink} download style={{ fontSize: "2rem" }} title="Download">
            <MdOutlineDownloading />
          </a> */}
        </div>
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
    </div>
  );
};

export default MoviesBox;
