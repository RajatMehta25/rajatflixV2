import { useState, useEffect, useRef, useCallback } from "react";
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
import KapilBox from "./KapilBox";
import LoadingCard from "./LoadingCard";
import { set } from "date-fns";
import { Link } from "react-router-dom";

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
  const [count, setCount] = useState(Math.floor(Math.random() * (10000 - 7000 + 1)) + 50000);
  const [selectedCategory, setSelectedCategory] = useState("football");
  const [loadingFootballCard, setFootballCardLoading] = useState(false);
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

  useEffect(() => {
    if (iframeLoaded) {
      const iframe = document?.getElementById("myIframe");
      const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;
      const adElements = iframeDocument?.querySelectorAll("iframe,img,a,script");
      adElements.forEach((ele) => {
        if (
          ele?.src?.includes("ads") ||
          ele?.src?.includes("ad") ||
          ele?.src?.includes("xads") ||
          ele?.src?.includes("xadsmart") ||
          ele?.src?.includes("/xads.js") ||
          ele?.src?.includes("https://c.adsco.re/") ||
          ele?.src?.includes("soliads") ||
          ele?.href?.includes("ad")
        ) {
          ele.remove();
        }
      });
    }
  }, [playLink]);
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
    // const isPlaying = !audioRef.paused && audioRef.currentTime > 0 && !audioRef.ended;
    audioRef.current.play();
    const audio = audioRef.current;
    if (!audio || !("mediaSession" in navigator)) return;

    const ms = navigator.mediaSession;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: nowPlaying,
      artist: "Rajat Mehta",
      // album: "Coding Beats",
      // artwork: [
      //   {
      //     src: SongData?.filter((ele) => ele.downloadLink === playingLink)[0]?.image,
      //     sizes: "96x96",
      //     type: "image/*",
      //   },
      //   {
      //     src: SongData?.filter((ele) => ele.downloadLink === playingLink)[0]?.image,
      //     sizes: "512x512",
      //     type: "image/*",
      //   },
      // ],
      artwork: [
        {
          src:
            SongData?.filter((ele) => ele.downloadLink === playingLink)[0]?.image ||
            "https://github.com/RajatMehta25/rajatflixV2/blob/main/public/rajatflix.png?raw=true",
        },
      ],
    });
    ms.setActionHandler("play", async () => {
      await audio.play();
      ms.playbackState = "playing";
    });

    ms.setActionHandler("pause", () => {
      audio.pause();
      ms.playbackState = "paused";
    });

    ms.setActionHandler("previoustrack", () => {
      // your logic: go to previous track in playlist
      if (SongData[0].downloadLink === playingLink) {
        setSongPlayLink(SongData[0].downloadLink);
        setNowPlaying(SongData[0].name);
      } else {
        const currentIndex = SongData.findIndex((ele) => ele.downloadLink === playingLink);
        setSongPlayLink(SongData[currentIndex - 1].downloadLink);
        setNowPlaying(SongData[currentIndex - 1].name);
      }
    });

    ms.setActionHandler("nexttrack", () => {
      // your logic: go to next track in playlist
      if (SongData[SongData.length - 1].downloadLink === playingLink) {
        setSongPlayLink(SongData[SongData.length - 1].downloadLink);
        setNowPlaying(SongData[SongData.length - 1].name);
      } else {
        const currentIndex = SongData.findIndex((ele) => ele.downloadLink === playingLink);
        setSongPlayLink(SongData[currentIndex + 1].downloadLink);
        setNowPlaying(SongData[currentIndex + 1].name);
      }
    });

    ms.setActionHandler("seekto", (details) => {
      if (details.fastSeek && "fastSeek" in audio) {
        // @ts-ignore
        audio.fastSeek(details.seekTime);
        return;
      }
      audio.currentTime = details.seekTime;
    });

    return () => {
      // Cleanup handlers when component unmounts
      ms.setActionHandler("play", null);
      ms.setActionHandler("pause", null);
      ms.setActionHandler("previoustrack", null);
      ms.setActionHandler("nexttrack", null);
      ms.setActionHandler("seekto", null);
    };
  }, [playingLink, audioRef.current]);

  const searchMovieFrame = () => {
    if (!searchFrame?.trim()) return movieFrame?.slice(1) || [];

    const searchMovie = searchFrame.toLowerCase().trim();
    // filter by searchFrame, then skip the 0th index from the resulting array
    let newData = movieFrame?.filter((ele) => ele.name.toLowerCase().includes(searchMovie));
    if (!newData) return [];
    return newData;
  };

  const searchChannel = () => {
    if (!channelSearch?.trim()) return FootballCardData;

    const searchTerm = channelSearch.toLowerCase().trim();

    const newData = FootballCardData?.filter((ele) => {
      const homeName = ele?.teams?.home?.name?.toLowerCase() || "";
      const awayName = ele?.teams?.away?.name?.toLowerCase() || "";

      return (homeName.includes(searchTerm) || awayName.includes(searchTerm)) && ele?.category === selectedCategory;
    });

    return newData ?? [];
  };
  const searchSongs = () => {
    let newData = SongData?.filter((ele) => ele.name.toLowerCase().includes(searchSong.toLowerCase().trim()));

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
    setFootballCardLoading(true);
    // fetch(`https://streamed.pk/api/matches/football`)
    try {
      fetch(`https://streamed.pk/api/matches/all`)
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
      setChannel(FootballCardSources[0]?.embedUrl);
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
    // toggleFullscreen();
    //create anchor tag with iframe to new page having src as playLink

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
    // setChannel(FD[0]?.embedUrl);

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

  function toggleFullscreen() {
    const iframe = document.getElementById("myIframe");

    if (document.fullscreenElement) {
      // If already in fullscreen, exit fullscreen
      document.exitFullscreen();
      iframe.classList.remove("fullscreen-iframe"); // Remove fullscreen styling
    } else {
      // If not in fullscreen, request fullscreen for the iframe
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        /* Firefox */
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        /* IE/Edge */
        iframe.msRequestFullscreen();
      }
      // iframe.classList.add("fullscreen-iframe"); // Apply fullscreen styling
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="MovieContainer">
      {/* <HowToDownload /> */}
      <div style={{ fontSize: "1.5rem", fontFamily: "monospace", textAlign: "center" }}>
        WorldWide Active User Count :{" "}
        <span style={{ color: "#db0000" }} className="blinking-text">
          {count}
        </span>
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          // flexDirection: "column",
        }}
      >
        <p>Request your favorite Movies , Tv Series , Songs on</p>

        <a href="https://t.me/+1wEy8JHlLuIyNDll" target="_blank" rel="noopener noreferrer">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 256 256"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
          >
            <g>
              <path
                d="M128,0 C57.307,0 0,57.307 0,128 L0,128 C0,198.693 57.307,256 128,256 L128,256 C198.693,256 256,198.693 256,128 L256,128 C256,57.307 198.693,0 128,0 L128,0 Z"
                fill="#40B3E0"
              ></path>
              <path
                d="M190.2826,73.6308 L167.4206,188.8978 C167.4206,188.8978 164.2236,196.8918 155.4306,193.0548 L102.6726,152.6068 L83.4886,143.3348 L51.1946,132.4628 C51.1946,132.4628 46.2386,130.7048 45.7586,126.8678 C45.2796,123.0308 51.3546,120.9528 51.3546,120.9528 L179.7306,70.5928 C179.7306,70.5928 190.2826,65.9568 190.2826,73.6308"
                fill="#FFFFFF"
              ></path>
              <path
                d="M98.6178,187.6035 C98.6178,187.6035 97.0778,187.4595 95.1588,181.3835 C93.2408,175.3085 83.4888,143.3345 83.4888,143.3345 L161.0258,94.0945 C161.0258,94.0945 165.5028,91.3765 165.3428,94.0945 C165.3428,94.0945 166.1418,94.5735 163.7438,96.8115 C161.3458,99.0505 102.8328,151.6475 102.8328,151.6475"
                fill="#D2E5F1"
              ></path>
              <path
                d="M122.9015,168.1154 L102.0335,187.1414 C102.0335,187.1414 100.4025,188.3794 98.6175,187.6034 L102.6135,152.2624"
                fill="#B5CFE4"
              ></path>
            </g>
          </svg>
        </a>
        <a href="https://whatsapp.com/channel/0029VaoNQcz3WHTPgUWQ5V39">
          <svg
            width="50px"
            height="50px"
            viewBox="-1.5 0 259 259"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
          >
            <g>
              <path
                d="M67.6631045,221.823373 L71.8484512,223.916047 C89.2873956,234.379413 108.819013,239.262318 128.350631,239.262318 L128.350631,239.262318 C189.735716,239.262318 239.959876,189.038158 239.959876,127.653073 C239.959876,98.3556467 228.101393,69.7557778 207.17466,48.8290445 C186.247927,27.9023111 158.345616,16.0438289 128.350631,16.0438289 C66.9655467,16.0438289 16.7413867,66.2679889 17.4389445,128.350631 C17.4389445,149.277365 23.7169645,169.50654 34.1803311,186.945485 L36.9705622,191.130831 L25.8096378,232.28674 L67.6631045,221.823373 Z"
                fill="#00E676"
              ></path>
              <path
                d="M219.033142,37.66812 C195.316178,13.2535978 162.530962,0 129.048189,0 C57.8972956,0 0.697557778,57.8972956 1.39511556,128.350631 C1.39511556,150.67248 7.67313556,172.296771 18.1365022,191.828389 L0,258.096378 L67.6631045,240.657433 C86.4971645,251.1208 107.423898,256.003705 128.350631,256.003705 L128.350631,256.003705 C198.803967,256.003705 256.003705,198.106409 256.003705,127.653073 C256.003705,93.4727423 242.750107,61.3850845 219.033142,37.66812 Z M129.048189,234.379413 L129.048189,234.379413 C110.214129,234.379413 91.380069,229.496509 75.3362401,219.7307 L71.1508934,217.638027 L30.6925422,228.101393 L41.1559089,188.3406 L38.3656778,184.155253 C7.67313556,134.628651 22.3218489,69.05822 72.5460089,38.3656778 C122.770169,7.67313556 187.643042,22.3218489 218.335585,72.5460089 C249.028127,122.770169 234.379413,187.643042 184.155253,218.335585 C168.111425,228.798951 148.579807,234.379413 129.048189,234.379413 Z M190.433273,156.9505 L182.760138,153.462711 C182.760138,153.462711 171.599213,148.579807 164.623636,145.092018 C163.926078,145.092018 163.22852,144.39446 162.530962,144.39446 C160.438289,144.39446 159.043173,145.092018 157.648058,145.789576 L157.648058,145.789576 C157.648058,145.789576 156.9505,146.487133 147.184691,157.648058 C146.487133,159.043173 145.092018,159.740731 143.696902,159.740731 L142.999345,159.740731 C142.301787,159.740731 140.906671,159.043173 140.209113,158.345616 L136.721325,156.9505 L136.721325,156.9505 C129.048189,153.462711 122.072611,149.277365 116.492149,143.696902 C115.097033,142.301787 113.00436,140.906671 111.609245,139.511556 C106.72634,134.628651 101.843436,129.048189 98.3556467,122.770169 L97.658089,121.375053 C96.9605312,120.677496 96.9605312,119.979938 96.2629734,118.584822 C96.2629734,117.189707 96.2629734,115.794591 96.9605312,115.097033 C96.9605312,115.097033 99.7507623,111.609245 101.843436,109.516571 C103.238551,108.121456 103.936109,106.028782 105.331225,104.633667 C106.72634,102.540993 107.423898,99.7507623 106.72634,97.658089 C106.028782,94.1703001 97.658089,75.3362401 95.5654156,71.1508934 C94.1703001,69.05822 92.7751845,68.3606623 90.6825112,67.6631045 L88.5898378,67.6631045 C87.1947223,67.6631045 85.1020489,67.6631045 83.0093756,67.6631045 C81.6142601,67.6631045 80.2191445,68.3606623 78.8240289,68.3606623 L78.1264712,69.05822 C76.7313556,69.7557778 75.3362401,71.1508934 73.9411245,71.8484512 C72.5460089,73.2435667 71.8484512,74.6386823 70.4533356,76.0337978 C65.5704312,82.3118178 62.7802,89.9849534 62.7802,97.658089 L62.7802,97.658089 C62.7802,103.238551 64.1753156,108.819013 66.2679889,113.701918 L66.9655467,115.794591 C73.2435667,129.048189 81.6142601,140.906671 92.7751845,151.370038 L95.5654156,154.160269 C97.658089,156.252942 99.7507623,157.648058 101.145878,159.740731 C115.794591,172.296771 132.535978,181.365022 151.370038,186.247927 C153.462711,186.945485 156.252942,186.945485 158.345616,187.643042 L158.345616,187.643042 C160.438289,187.643042 163.22852,187.643042 165.321193,187.643042 C168.808982,187.643042 172.994329,186.247927 175.78456,184.852811 C177.877233,183.457696 179.272349,183.457696 180.667465,182.06258 L182.06258,180.667465 C183.457696,179.272349 184.852811,178.574791 186.247927,177.179676 C187.643042,175.78456 189.038158,174.389445 189.735716,172.994329 C191.130831,170.204098 191.828389,166.716309 192.525947,163.22852 C192.525947,161.833405 192.525947,159.740731 192.525947,158.345616 C192.525947,158.345616 191.828389,157.648058 190.433273,156.9505 Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
        </a>
      </div>
      <div>
        <p>{/* <Link to="/Movies">New Movies Section in Progress</Link> */}</p>
      </div>

      <div
        // style={{ fontSize: "1.5rem" }}
        className="netflix-heading"
      >
        Songs
      </div>
      <div style={{ fontsize: "2rem" }}>Control music from Lockscreen </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%" }}>
        <input
          onChange={(e) => {
            onChangeSearchSong(e.target.value);
          }}
          value={searchSong}
          placeholder="Search Song Name"
          className="search"
        />
        <span style={{ fontSize: "2rem", cursor: "pointer" }}></span>
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
      <div
        // style={{ fontSize: "1.5rem" }}
        className="netflix-heading"
      >
        Live Stream Movies / TV Series
      </div>
      <div style={{ fontSize: "1.2rem" }}>USE AD BLOCKER / CLOSE ADS TO WATCH MOVIE</div>

      <div style={{ width: "100%" }}>
        <iframe
          className="iframe"
          ref={iframeRef}
          src={playLink}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
          allowFullScreen
          allowfullscreen="true"
          id="myIframe"
          // target="_blank"
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
            onChangeSearchFrame(e.target.value);
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
      {/* <KapilBox Kapilref={Kapilref} kapils02={kapils02} episode={episode} setEpisode={setEpisode} /> */}

      <div
        // style={{ fontSize: "1.5rem" }}
        className="netflix-heading"
      >
        Live Stream ALL SPORTS
      </div>
      {/* <div style={{ fontSize: "1rem" }}>(Use Ad Blocker)</div> */}
      <div style={{ fontSize: "1rem" }}>Click on Channel to load match below</div>

      <div
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
        <span style={{ fontSize: "2rem", cursor: "pointer" }}></span>
      </div>

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
        {loadingFootballCard ? (
          <LoadingCard />
        ) : (
          searchChannel().map((ele, i) => {
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
          })
        )}

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
