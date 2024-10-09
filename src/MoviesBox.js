import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const MoviesBox = () => {
  const [search, onChangeSearch] = useState("");
  const [data, setData] = useState([]);
  const [iframeLink, setIframeLink] = useState("");
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/Movie.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        onChangeSearch("");
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
      <div>Kapil Season 2 Ep3</div>
      <div style={{ width: "100%" }}>
        <iframe
          className="iframe"
          src="https://drive.google.com/file/d/15PBFDR6x-ncSwuBNWKF7gW-BUlvnJPeL/preview"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
        />
      </div>

      <div className="MovieList">
        {searchMovie(data)?.map((ele, i) => (
          <MovieCard key={ele + i} photo={ele.image} />
        ))}
      </div>
    </div>
  );
};

export default MoviesBox;
