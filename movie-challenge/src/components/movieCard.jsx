import { Link } from "react-router-dom";
import styles from "./movieCard.module.css";
import PropTypes from "prop-types";
export function MovieCard({ movie }) {
  //console.log(styles);
  const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  return (
    <li className={styles.movieTitle}>
      <Link to={"/movies/" + movie.id}>
        <img
          width={230}
          height={345}
          className={styles.movieImage}
          src={imageUrl}
          alt={movie.title}
        />
        <div>{movie.title}</div>
      </Link>
    </li>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object,
};
