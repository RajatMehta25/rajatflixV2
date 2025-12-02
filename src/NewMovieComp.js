import { set } from "date-fns";
import React, { useEffect, useState } from "react";

const NewMovieComp = () => {
  const [movieName, setMovieName] = useState("");
  const [Movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState("tt1375666");
  const handleChange = (e) => {
    setMovieName(e.target.value);
  };
  const fetchMovies = async (name = "") => {
    try {
      const response = await fetch(`https://moviesapi.to/api/discover/movie?query=${name}`);

      const { data } = await response.json();
      console.log(data);
      setMovies(data ?? []);
    } catch (error) {
      setMovies([]);
    }
  };
  useEffect(() => {
    fetchMovies(movieName);
  }, [movieName]);

  return (
    <div>
      <div>Movies</div>
      <iframe src={`https://moviesapi.club/movie/${movieId}}`} style={{ width: "100%", height: "300px" }} allow="fullscreen" />
      <iframe
        src={`https://player.vidplus.to/embed/movie/${movieId}?server=14}`}
        style={{ width: "100%", height: "300px" }}
        allow="fullscreen"
      />

      <input
        type="text"
        placeholder="Search movie name"
        value={movieName}
        onChange={handleChange}
        style={{ width: "100%", margin: "1rem", padding: "1rem" }}
      />
      {Movies.map((movie, index) => (
        <div
          key={index}
          style={{ border: "2px solid white", margin: "1rem", padding: "1rem", cursor: "pointer" }}
          onClick={() => setMovieId(movie.tmdbid)}
        >
          <div>{movie.orig_title}</div>
          <div>{movie.quality}</div>
          <div>{movie.year}</div>
        </div>
      ))}
    </div>
  );
};

export default NewMovieComp;
