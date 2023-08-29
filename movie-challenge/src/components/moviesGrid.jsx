import { useEffect } from "react";
import { MovieCard } from "./movieCard";
import styles from "./moviesGrid.module.css";
import { useState } from "react";
//import movies from "./movies.json";
export function MoviesGrid() {
  //let movies = [];
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzhiYzIwOTA4OTBkMTljNjYwZTg1OTk5NGQ0YjVkMyIsInN1YiI6IjY0ZWNlOGQ1YzYxM2NlMDEwYjhlMTc5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j2EFFzdtHq7i5DxRp0T22gxLKsn-fVZ3XP5hLqBHHXQ",
        "content-Type": "application/json;charset=utf-8",
      },
    })
      .then((result) => result.json())
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
