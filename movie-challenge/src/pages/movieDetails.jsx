import { useParams } from "react-router-dom";
import movie from "./movie.json";
import styles from "./movieDetails.module.css";

export function MovieDetails() {
  const { movieId } = useParams();
  console.log(movieId);
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
