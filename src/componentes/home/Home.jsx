import { useContext, useState } from "react";
import { orderAZ } from "../../servicios/orderAZ";
import { useFetch } from "../../servicios/useFetch";
import { useGenres } from "../../servicios/useGeneros";
import SelectGenero from "../selects/SelectGenero";
import { MostarPeliculasContext } from "../context/Context";
import Banner from "../slider/Slider";

const Home = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original";

  const [orderAbc, setOrderAbc] = useState(null);
  /*   const [select, setSelect] = useState(null); */
  const [filtroGeneros, setFiltroGeneros] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const context = useContext(MostarPeliculasContext);

  const { data } = useFetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc"
  );

  const generos = useGenres();
  let dataMovies = [];

  if (data.results) {
    dataMovies = data.results.slice();
  }
  console.log(generos, 24);

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
    context.setSelect(selectedOrder);
  };

  const orderMovies = orderAbc || dataMovies;
  //console.log(filtroGeneros);

  const handleFiltroGeneros = () => {
    setFiltroGeneros(true);
  };

  return (
    <div>
      <Banner />
      <div className="flex gap-5 ml-2 pb-4 w-100 h-14">
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
        <SelectGenero handleFiltroGeneros={handleFiltroGeneros} />
      </div>

      <div className="flex flex-wrap">
        {data.results && !filtroGeneros ? (
          orderMovies.map((movie) => (
            <div key={movie.id} className="px-2 w-1/4 pb-4">
              <div className="mb-4">
                <img
                  src={`${imageUrl + movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={400}
                />
              </div>
              <h1>{movie.title}</h1>
              <p>Género: {generos[movie.genre_ids[0]]}</p>
              <p>Calificación: {movie.vote_average}⭐</p>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Home;

{
  /* <button onClick={() => setFiltroGeneros(!filtroGeneros)}>
        probando genero
      </button> */
}

{
  /* <select>
        <option disabled selected>
          GENERO
        </option>
        <option>AVENTURA</option>
        <option>FANTASIA</option>
        <option>ANIMACIÓN</option>
        <option>DRAMA</option>
        <option>HORROR</option>
        <option>ACTION</option>
        <option>COMEDY</option>
        <option>HISTORIA</option>
        <option>WESTERN</option>
        <option>SUSPENSO</option>
        <option>CRIMEN</option>
        <option>DOCUMENTAL</option>
        <option>CIENCIA FICCIÓN</option>
        <option>MISTERIO</option>
        <option>MÚSICA</option>
        <option>ROMANCE</option>
        <option>FAMILIA</option>
        <option>BÉLICA</option>
        <option>PELÍCULA DE TV</option>
      </select>
      <select>
        <option disabled selected>
          PUNTAJE
        </option>
        <option> 0 - 1 ⭐</option>
        <option> 1 - 2 ⭐</option>
        <option> 2 - 3 ⭐</option>
        <option> 3 - 4 ⭐</option>
        <option> 4 - 5 ⭐</option>
        <option> 5 - 6 ⭐</option>
        <option> 6 - 7 ⭐</option>
        <option> 7 - 8 ⭐</option>
        <option> 8 - 9 ⭐</option>
      </select> */
}
