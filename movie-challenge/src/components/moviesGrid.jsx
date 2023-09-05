import { useEffect } from "react";
import { MovieCard } from "./movieCard";
import styles from "./moviesGrid.module.css";
import { useState } from "react";
import { get } from "../utils/httpClient";
//import movies from "./movies.json";
export function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    get("/discover/movie")
      .then((data) => {
        setMovies(data.results);
      })
      .catch(console.error);
  }, []);

  return (
    <ul className={styles.movieCardGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
