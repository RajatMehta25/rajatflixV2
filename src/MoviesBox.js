import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";

const MoviesBox = () => {
  const Kapilref = useRef();
  const Movieref = useRef();

  const Footballref = useRef();

  const [search, onChangeSearch] = useState("");
  const [data, setData] = useState([]);
  const [footballData, setFootballData] = useState([]);

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
  useEffect(() => {
    Kapilref.current.addEventListener("wheel", handleWheelKapil);
  }, []);
  useEffect(() => {
    Movieref.current.addEventListener("wheel", handleWheelMovie);
  }, []);
  useEffect(() => {
    Footballref.current.addEventListener("wheel", handleWheelFootball);
  }, []);
  const searchMovie = () => {
    let newData = data?.filter((ele) => ele.name.toLowerCase().includes(search.toLowerCase()));

    // setFilteredData(newData ?? data);
    return newData;
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
      <div style={{ fontSize: "1.5rem" }}>Movies</div>
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
      <div style={{ width: "100%" }}>
        <iframe
          className="iframe"
          src={channel}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
          allowFullScreen
        />
      </div>
      <div
        className="HideScroll"
        style={{ display: "flex", overflowX: "scroll", gap: "1rem", width: "100%" }}
        ref={Footballref}
      >
        {footballData.map((ele, i) => (
          <button key={ele.link + i} className="downloadButton" onClick={() => setChannel(ele.link)}>
            {ele.channel_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoviesBox;
