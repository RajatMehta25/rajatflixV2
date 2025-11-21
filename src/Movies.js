import React, { useState, useEffect } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const allMovies = await fetch("https://moviesapi.to/api/discover/movie?direction=desc&page=1");
    const MovieJSON = await allMovies.json();
    console.log("Fetched movies data:", MovieJSON);
    const allImagesPromises = MovieJSON.data.map(async (movie) => {
      const imagesData = await fetchImages(movie.imdb_id);
      return {
        ...movie,
        imageUrl: imagesData,
      };
    });
    const moviesWithImages = await Promise.all(allImagesPromises);
    setMovies(moviesWithImages);
  };
  useEffect(() => {
    // document.title = "Movies Page";
    fetchMovies();
  }, []);
  const fetchImages = (movieId) => {
    let url = fetch(`https://api.imdbapi.dev/titles/${movieId}/images`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched images data:", data);
        return data.images[0]?.url || null;
      })
      .catch((error) => {
        console.error("Error fetching images data:", error);
        return null;
      });
    return url;
  };
  return (
    <div>
      <h1>Movies Page</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.tmdbid} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{movie.orig_title}</h2>
            <img src={movie.imageUrl} alt={movie.orig_title} style={{ width: "150px" }} />
            <p>{movie.quality}</p>
            <p>{movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
