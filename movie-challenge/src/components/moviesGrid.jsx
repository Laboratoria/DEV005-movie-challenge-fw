import { useEffect } from "react";
import { MovieCard } from "./movieCard";
import styles from "./moviesGrid.module.css";
import { useState } from "react";
import { get } from "../utils/httpClient";
import { useQuery } from "../hooks/useQuery";
//import movies from "./movies.json";

export function MoviesGrid() {
  const [movies, setMovies] = useState([]);

  const query = useQuery();
  const search =
    query.get("search"); /*traer el parametro que le pasamos =search*/
  console.log(search);

  useEffect(() => {
    const searchUrl = search
      ? "/search/movie?query=" +
        search /*si este valor se cumple(search) entonc, asignale este valor alaurl*/
      : "/discover/movie"; /*y si no, asignale este otro*/
    get(searchUrl)
      .then((data) => {
        setMovies(data.results);
      })
      .catch(console.error);
  }, [search]);
  /*si cambi este parametro search en la url, quiero que te vuelvas a ejecutar(useEffect)*/

  return (
    <ul className={styles.movieCardGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
