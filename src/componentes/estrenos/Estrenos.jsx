import { useState } from "react";
import { useFetch } from "../../servicios/useFetch";
import { useGenres } from "../../servicios/useGeneros";
import SelectGenero from "../selects/SelectGenero";
import { orderAZ } from "../../servicios/orderAZ";

const Estrenos = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const [estrenosGenero, setEstrenosGenero] = useState(false);
  const [orderAbc, setOrderAbc] = useState(null);
  const [select, setSelect] = useState(null);

  const { data } = useFetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=es-ES&page=1"
  );

  const generos = useGenres();

  let dataMovies = [];

  if (data.results) {
    dataMovies = data.results.slice();
  }

  const handleOrderChange = (e) => {
    const selectedOrder = e.target.value;

    if (selectedOrder === "ASCENDENTE") {
      setOrderAbc(orderAZ(dataMovies, (title) => title.title, "asc"));
      console.log("az");
    } else if (selectedOrder === "DESCENDENTE") {
      setOrderAbc(orderAZ(dataMovies, (title) => title.title, "desc"));
      console.log("za");
    } else {
      setOrderAbc(null);
    }
    setSelect(selectedOrder);
  };

  return (
    <div>
      <div className="flex gap-5 ml-2">
        <select
          onChange={handleOrderChange}
          className="bg-purple-500 text-white text-xl text-center rounded-md w-40 h-10 cursor-pointer"
        >
          <option disabled selected>
            A-Z
          </option>
          <option value={"ASCENDENTE"}>ASCENDENTE</option>
          <option value={"DESCENDENTE"}>DESCENDENTE</option>
        </select>
        <SelectGenero estrenosGenero={true} />
      </div>

      <div className="flex flex-wrap">
        {data.results && !estrenosGenero ? (
          data.results.map((movie) => (
            <div key={movie.id} className="px-2 w-1/4 pb-4">
              <img
                src={`${imageUrl + movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={400}
              />
              <h1>{movie.title}</h1>
              <p>Género: {generos[movie.genre_ids[0]]}</p>
              <p>Calificación: {movie.vote_average}</p>
            </div>
          ))
        ) : (
          <div>
            <p>No se encuentran las películas</p>
            {/* <SelectGenero /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Estrenos;
