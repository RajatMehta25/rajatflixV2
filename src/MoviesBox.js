import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const MoviesBox = () => {
  const [search, onChangeSearch] = useState("");
  const [data, setData] = useState([]);
  const [kapils02, setKapilS02] = useState([]);

  const [iframeLink, setIframeLink] = useState("");
  const [episode, setEpisode] = useState("https://drive.google.com/file/d/15PBFDR6x-ncSwuBNWKF7gW-BUlvnJPeL/preview");
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
          placeholder="Search Content Name"
          className="search"
        />
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
      <div className="kapilButtonContainer">
        {kapils02.map((ele, i) => (
          <button key={ele.downloadLink + i} className="downloadButton" onClick={() => setEpisode(ele.downloadLink)}>
            {ele.name}
          </button>
        ))}
      </div>

      <div style={{ fontSize: "1.5rem" }}>DOWNLOADABLE CONTENT</div>
      <div className="MovieList">
        {searchMovie(data)?.map((ele, i) => (
          <MovieCard key={ele + i} photo={ele.image} link={ele.downloadLink} name={ele.name} />
        ))}
      </div>
    </div>
  );
};

export default MoviesBox;
