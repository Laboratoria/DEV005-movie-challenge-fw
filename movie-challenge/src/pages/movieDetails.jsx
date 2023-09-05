import { useParams } from "react-router-dom";
//import movie from "./movie.json";
import styles from "./movieDetails.module.css";
import { get } from "../utils/httpClient";
import { useEffect, useState } from "react";

export function MovieDetails() {
  const { movieId } = useParams();
  //console.log(movieId);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    get("/movie/" + movieId).then((data) => {
      setMovie(data);
    });
  }, [movieId]);

  if (!movie) {
    return null;
  }

  const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  return (
    <div className={styles.detailsContainer}>
      <img
        className={`${styles.column} ${styles.movieImage}`}
        src={imageUrl}
        alt={movie.title}
      />
      <div className={`${styles.column} ${styles.movieDetails}`} src={imageUrl}>
        <p className={styles.firsItem}>
          <strong>Title:</strong> {movie.title}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {movie.overview}
        </p>
      </div>
    </div>
  );
}
