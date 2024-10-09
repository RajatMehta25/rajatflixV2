import React from "react";
import MovieCard from "./MovieCard";

const MoviesBox = () => {
  const arr = [1, 2, 3, 4];
  return (
    <div className="MovieContainer">
      <div>
        <iframe
          className="iframe"
          src="https://drive.google.com/file/d/14WkAYtJ78HuDx0PMZwd7b3hZoiXQLJX5/preview"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
        />
      </div>
      <div className="MovieList">
        {arr.map((ele, i) => (
          <MovieCard key={ele + i} />
        ))}
      </div>
    </div>
  );
};

export default MoviesBox;
