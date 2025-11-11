import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { motion } from "motion/react";
import MusicPlayer from "./MusicPlayer";
import useHandleDivWheel from "./useHandleDivWheel";
import useGithubApi from "./useGithubApi";

const MoviesBox = () => {
  const Kapilref = useRef();
  const Movieref = useRef();
  const playref = useRef();
  const iframeRef = useRef(null);
  const FootballNewref = useRef();
  const Footballref = useRef();
  const Songref = useRef();
  const FootballCardref = useRef();
  const Telegramref = useRef();
  const audioRef = useRef();
  const footballFrameref = useRef();
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
  // we'll set playLink once movieFrame loads (skip 0th index)
  const [playLink, setplayLink] = useState("");
  const [nowPlaying, setNowPlaying] = useState("");
  // Carousel state for MovieFrame cards
  const [activeIndex, setActiveIndex] = useState(0);
  const slideDuration = 5000; // ms per slide
  const [progress, setProgress] = useState(0); // 0-100 for progress animation
  const progressTimerRef = useRef(null);
  const autoplayRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [iframeLink, setIframeLink] = useState("");
  const [episode, setEpisode] = useState("https://drive.google.com/file/d/15PBFDR6x-ncSwuBNWKF7gW-BUlvnJPeL/preview");
  const [channel, setChannel] = useState("");
  const [telegramData, setTelegramData] = useState([]);
  const [matchData, setMatchData] = useState({});
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [count, setCount] = useState(Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000);
  const [selectedCategory, setSelectedCategory] = useState("football");

  useHandleDivWheel(Kapilref);
  useHandleDivWheel(FootballNewref);
  useHandleDivWheel(Songref);
  useHandleDivWheel(FootballCardref);

  useGithubApi(
    "https://raw.githubusercontent.com/RajatMehta25/TV/main/Songs.json",
    setSongData,
    setSongPlayLink,
    setNowPlaying
  );
  useGithubApi("https://raw.githubusercontent.com/RajatMehta25/TV/main/Movie.json", setData, onChangeSearch);
  useGithubApi("https://raw.githubusercontent.com/RajatMehta25/TV/main/MovieFrame.json", setMovieFrame, onChangeSearchFrame);
  useGithubApi("https://raw.githubusercontent.com/RajatMehta25/TV/main/Kapil.json", setKapilS02);
  useGithubApi("https://raw.githubusercontent.com/RajatMehta25/TV/main/football_channels.json", setFootballData);

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
  const [FootballCardSources, setFootballCardSources] = useState([]);

  // when movieFrame loads, set initial playLink and activeIndex using the sliced frames
  useEffect(() => {
    const frames = movieFrame?.slice(1) || [];
    if (frames.length > 0) {
      setplayLink(frames[0].playLink);
      setActiveIndex(0);
      // start progress for initial slide
      setProgress(100);
    }
  }, [movieFrame]);

  useEffect(() => {
    audioRef.current.play();
  }, [playingLink, audioRef.current]);

  const searchMovieFrame = () => {
    // filter by searchFrame, then skip the 0th index from the resulting array
    let newData = movieFrame?.filter((ele) => ele.name.toLowerCase().includes(searchFrame.toLowerCase()));
    if (!newData) return [];
    // skip the first element (0th) from the array
    return newData.slice(1);
  };

  const searchChannel = () => {
    if (!channelSearch?.trim()) return FootballCardData;

    const searchTerm = channelSearch.toLowerCase();

    const newData = FootballCardData?.filter((ele) => {
      const homeName = ele?.teams?.home?.name?.toLowerCase() || "";
      const awayName = ele?.teams?.away?.name?.toLowerCase() || "";

      return (homeName.includes(searchTerm) || awayName.includes(searchTerm)) && ele?.category === selectedCategory;
    });

    return newData ?? [];
  };
  const searchSongs = () => {
    let newData = SongData?.filter((ele) => ele.name.toLowerCase().includes(searchSong.toLowerCase()));

    // setFilteredData(newData ?? data);
    return newData;
  };

  //Football
  useEffect(() => {
    FootballCardDataApiV2();
  }, []);

  const FootballCardDataApi = () => {
    fetch(`https://ws.kora-api.top/api/matches/${moment().format("YYYY-MM-DD")}?t=59`)
      .then((res) => res.json())
      .then((data) => setFootballCardData(data));
  };
  const FootballCardDataApiV2 = () => {
    // fetch(`https://streamed.pk/api/matches/football`)
    fetch(`https://streamed.pk/api/matches/all`)
      .then((res) => res.json())
      .then((data) => {
        setFootballCardData(data);
        onChangeChannelSearch(""); // console.log("FootballCardDataV2", data);
      });
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
              audioRef.current.play();
            } else if (mediaStatus.playerState === "PAUSED") {
              console.log("Media is paused");
              audioRef.current.pause();
            } else if (mediaStatus.playerState === "IDLE") {
              if (mediaStatus.idleReason === "FINISHED") {
                console.log("Media has ended");
              } else if (mediaStatus.idleReason === "CANCELLED") {
                console.log("Media playback was cancelled");
              } else {
                console.log("Media is idle");
              }
              audioRef.current.currentTime = mediaStatus.currentTime;
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
  const castMedia = useCallback(() => {
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
            audioRef.current.volume = 0; // Mute the local audio
            // audioRef.setAttribute("disabled", "true"); // Remove default controls
          }
        },
        (error) => {
          console.error("Error loading media:", error);
        }
      );
    } else {
      console.log("No session");
    }
  }, [playingLink]);

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

  useEffect(() => {
    if (playLink && iframeRef.current) {
      iframeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [playLink]);
  useEffect(() => {
    if (FootballCardSources && FootballNewref.current) {
      FootballNewref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [FootballCardSources]);

  // Keep activeIndex in sync with playLink (handles manual clicks from user)
  useEffect(() => {
    const frames = searchMovieFrame();
    const idx = frames.findIndex((f) => f.playLink === playLink);
    if (idx >= 0) setActiveIndex(idx);
  }, [playLink]);

  // Update playLink when activeIndex changes and animate progress
  useEffect(() => {
    const frames = searchMovieFrame();
    if (!frames || frames.length === 0) return;

    const current = frames[activeIndex % frames.length];
    if (current && current.playLink) setplayLink(current.playLink);

    // reset and animate progress bar
    setProgress(0);
    if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    // small timeout to allow CSS transition from 0 -> 100
    progressTimerRef.current = setTimeout(() => setProgress(100), 50);

    return () => {
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    };
  }, [activeIndex]);

  /*
  // Autoplay: advance slide every slideDuration
  useEffect(() => {
    const frames = searchMovieFrame();
    if (!frames || frames.length === 0) return;

    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % frames.length;
        return next;
      });
    }, slideDuration);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [movieFrame, searchFrame]);
  */
  // const fetchFootballSources = async (sources) => {
  //   const finalData = [];
  //   for (let i = 0; i < sources.length; i++) {
  //     const response = await fetch(`https://streamed.pk/api/stream/${sources[i].source}/${sources[i].id}`);
  //     const data = await response.json();
  //     finalData.push(data);
  //   }
  //   // console.log("finalData", finalData);
  //   const FD = finalData.flat(Infinity);
  //   // console.log("FD", FD);
  //   setFootballCardSources(FD);
  //   setChannel("");
  //   console.log("FootballCardSources", data);
  // };
  const fetchFootballSources = async (sources) => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      navigator.vibrate(200);
    }
    // navigator.vibrate(200);

    const results = await Promise.allSettled(
      sources.map(({ source, id }) =>
        fetch(`https://streamed.pk/api/stream/${source}/${id}`).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
      )
    );

    const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);

    const FD = ok.flat(Infinity);
    setFootballCardSources(FD);
    setChannel("");

    const failed = results.filter((r) => r.status === "rejected").length;
    if (failed) console.warn(`Skipped ${failed} failed request(s).`);
  };

  // Group by category (whatever the API returns)
  const groupByCategory = (items) =>
    (items ?? []).reduce((acc, ele) => {
      const cat = ele?.category || "uncategorized";
      (acc[cat] ||= []).push(ele);
      return acc;
    }, {});

  const grouped = groupByCategory(FootballCardData);
  console.log("grouped", grouped);

  const categories = FootballCardData.filter((item, index, self) => {
    return index === self.findIndex((t) => t.category === item.category);
  }).map((item) => item.category);
  console.log("categories", categories);

  return (
    <div className="MovieContainer">
      {/* <HowToDownload /> */}
      <div style={{ fontSize: "1.5rem", fontFamily: "monospace", textAlign: "center" }}>
        WorldWide Active User Count :{" "}
        <span style={{ color: "#db0000" }} className="blinking-text">
          {count}
        </span>
      </div>
      {/* <div style={{ fontSize: "1.5rem" }}>DOWNLOAD MOVIES</div>

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
      </div> */}

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
            currentAudio={audioRef.current.src}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
        <div>{nowPlaying}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", alignItems: "center" }}>
          <audio ref={audioRef} controls loop preload="none" src={playingLink} playsinline webkit-playsinline />
          <button className="downloadButton" onClick={showCastDialog}>
            Play on TV (Android/PC)
          </button>
          {/* <a href={playingLink} download style={{ fontSize: "2rem" }} title="Download">
            <MdOutlineDownloading />
          </a> */}
        </div>
      </div>
      {/* <h1>New Music Player in Progress</h1>
      <MusicPlayer songs={SongData} /> */}
      <div style={{ fontSize: "1.5rem" }}>Live Stream Movies / TV Series</div>
      <div style={{ fontSize: "1.2rem" }}>USE AD BLOCKER / CLOSE ADS TO WATCH MOVIE</div>

      <div style={{ width: "100%" }}>
        <iframe
          className="iframe"
          ref={iframeRef}
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
          placeholder="Search Movie/Tv Series"
          className="search"
        />
      </div>
      <>
        {/* Movie Cards - Horizontal Scroll */}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "1rem",
            width: "100%",
            padding: "1rem 1rem",
            scrollBehavior: "smooth",
          }}
          ref={playref}
        >
          {searchMovieFrame().map((ele, i) => (
            <div
              key={ele.playLink + i}
              style={{
                position: "relative",
                minWidth: "200px",
                width: "200px",
                height: "300px",
                borderRadius: "1rem",
                overflow: "hidden",
                flexShrink: 0,
                cursor: "pointer",

                // ✅ Dynamic border/glow for active card
                border: playLink === ele.playLink ? "3px solid #e50914" : "3px solid transparent",
                // boxShadow:
                //   playLink === ele.playLink
                //     ? "0 0 0 4px #bfdbfe, 0 4px 6px -1px #3b82f6" // Glow effect
                //     : "none",
                boxShadow:
                  playLink === ele.playLink
                    ? "0 0 0 4px #fff, 0 0 0 8px #e50914" // Red-white border
                    : "none",
                transition: "all 0.3s ease", // Smooth animation
                transform: playLink === ele.playLink ? "scale(1.03)" : "scale(1)",
              }}
              onClick={() => setActiveIndex(i)}
            >
              <img
                src={ele.image}
                alt={ele.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "0.75rem 0.5rem",
                  textAlign: "center",
                  fontFamily: "cursive",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  // Match the outer borderRadius
                  borderRadius: "0 0 1rem 1rem",
                }}
              >
                {ele.name}
              </div>
            </div>
          ))}
        </div>
      </>

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

      <div style={{ fontSize: "1.5rem" }}>Live Stream ALL SPORTS</div>
      {/* <div style={{ fontSize: "1rem" }}>(Use Ad Blocker)</div> */}
      <div style={{ fontSize: "1rem" }}>Click on Channel to load match below</div>

      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   gap: "1rem",
        //   width: "100%",
        //   flexWrap: "wrap",
        // }}
        // className="HideScroll"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        // ref={Footballref}
        ref={FootballNewref}
      >
        {FootballCardSources.map((ele, i) => (
          <button
            style={{ textWrap: "nowrap", textTransform: "uppercase" }}
            key={ele.id + i}
            className="downloadButton"
            onClick={() => {
              setChannel(ele.embedUrl);
              footballFrameref.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            {ele.language + " " + ele.source + " " + ele.streamNo}
          </button>
        ))}
      </div>
      <div style={{ width: "100%" }}>
        {/* <video style={{ minHeight: 200 }} src={channel}></video> */}
        <iframe
          className="iframe"
          src={channel}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
          allowFullScreen
          ref={footballFrameref}
        />
      </div>

      <div style={{ fontSize: "1rem" }}>Click To Watch Live (close ads)</div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%" }}>
        <input
          onChange={(e) => {
            onChangeChannelSearch(e.target.value);
          }}
          value={channelSearch}
          placeholder="Search Team Name"
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

      {/* <div
        className="HideScroll"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Footballref}
      >
        {searchChannel().map((ele, i) => (
          <button style={{ textWrap: "nowrap", textTransform: "uppercase" }} key={ele.link + i} className="downloadButton">
            {ele.channel_name}
          </button>
        ))}
      </div> */}
      <div style={{ fontSize: "1rem" }}>Match List</div>
      <div style={{ fontSize: "1rem" }}>
        <button className="downloadButton" onClick={() => FootballCardDataApiV2()}>
          Refresh Match List
        </button>
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          // flexWrap: "wrap",
          gap: "1rem",
          width: "100%",
        }}
        ref={FootballCardref}
      >
        {categories.map((ele) => (
          <button key={ele} className="customButton" onClick={() => setSelectedCategory(ele)}>
            <span
              style={{
                textDecoration: selectedCategory === ele ? "underline" : "none",
                textDecorationColor: selectedCategory === ele ? "#db0000" : "",
                textDecorationThickness: selectedCategory === ele ? "0.25rem" : "",
              }}
            >
              {ele}
            </span>
          </button>
        ))}
      </div>
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
        {searchChannel().map((ele, i) => {
          if (ele?.category === selectedCategory)
            return (
              <FootballCard
                key={ele.id}
                homeLogo={ele?.teams?.home?.badge}
                awayLogo={ele?.teams?.away?.badge}
                homeName={ele?.teams?.home?.name}
                awayName={ele?.teams?.away?.name}
                // status={ele.status}
                time={ele.date}
                // score={ele.score}
                // league={ele.league_en}
                onClick={() => fetchFootballSources(ele?.sources)}
              />
            );
        })}

        {/*new renderer  */}
        {/* {Object.entries(grouped).map(([category, items]) => (
          <section key={category} style={{ textAlign: "center" }}>
            <h3 style={{ marginBottom: 12, textTransform: "capitalize", fontFamily: "monospace", fontSize: "1.5rem" }}>
              {category.replaceAll("-", " ")}
            </h3>

            <div>
              {items.map((ele) => (
                <FootballCard
                  key={ele.id}
                  homeLogo={ele?.teams?.home?.badge}
                  awayLogo={ele?.teams?.away?.badge}
                  homeName={ele?.teams?.home?.name}
                  awayName={ele?.teams?.away?.name}
                  // status={ele.status}
                  time={ele.date}
                  // score={ele.score}
                  // league={ele.league_en}
                  onClick={() => fetchFootballSources(ele.sources)}
                />
              ))}
            </div>
          </section>
        ))} */}
      </div>
    </div>
  );
};

export default MoviesBox;
