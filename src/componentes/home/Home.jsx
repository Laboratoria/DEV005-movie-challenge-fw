import { useContext, useEffect, useState } from "react";
import { orderAZ } from "../../servicios/orderAZ";
import { useFetch } from "../../servicios/useFetch";
import { useGenres } from "../../servicios/useGeneros";
import SelectGenero from "../selects/SelectGenero";
import { MostarPeliculasContext } from "../context/Context";
import MovieModal from "../modal/Modal";

const Home = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original";

  const [orderAbc, setOrderAbc] = useState(null);
  /*   const [select, setSelect] = useState(null); */
  const [filtroGeneros, setFiltroGeneros] = useState(false);

  const context = useContext(MostarPeliculasContext);

  const { data } = useFetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc"
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
    } else if (selectedOrder === "DESCENDENTE") {
      setOrderAbc(orderAZ(dataMovies, (title) => title.title, "desc"));
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

  //lógica buscador
  const [buscadorMovies, setBuscadorMovies] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState(null);

  const filteredMoviesByTitle = (movies, searchByTitle) => {
    return movies?.filter((movie) =>
      movie.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchByTitle) {
      setBuscadorMovies(filteredMoviesByTitle(dataMovies, searchByTitle));
    } else {
      setBuscadorMovies([]);
    }
  }, [searchByTitle]);

  const { select } = useContext(MostarPeliculasContext);
  //console.log(select);

  //lógica modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="mt-0 flex justify-center">
        <input
          type="text"
          placeholder="Ingresa el nombre de la película"
          className="rounded-lg border border-black w-full h-8 p-4 mb-6 focus:outline-none text-center "
          onChange={(event) => setSearchByTitle(event.target.value)}
        />
      </div>
      <div className="flex gap-5  pb-4 w-100 h-14">
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

      <div className="flex flex-wrap  content-center pl-16">
        {buscadorMovies.length > 0
          ? buscadorMovies.map((movie) => (
              <div
                key={movie.id}
                className="px-2 w-1/4 pb-4"
                onClick={() => openModal(movie)}
                style={{ cursor: "pointer" }}
              >
                <div className="mb-4">
                  <img
                    src={`${imageUrl + movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={400}
                  />
                </div>
                <p className="text-2xl font-bold ">{movie.title}</p>
                <p className="text-xl">Género: {generos[movie.genre_ids[0]]}</p>
                <p className="text-xl">Calificación: {movie.vote_average}⭐</p>
              </div>
            ))
          : select
          ? select.results.map((movie) => (
              <div
                key={movie.id}
                className="px-2 w-1/4 pb-4"
                onClick={() => openModal(movie)}
                style={{ cursor: "pointer" }}
              >
                <div className="mb-4">
                  <img
                    src={`${imageUrl + movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={400}
                  />
                </div>
                <p className="text-2xl font-bold ">{movie.title}</p>
                <p className="text-xl">Género: {generos[movie.genre_ids[0]]}</p>
                <p className="text-xl">Calificación: {movie.vote_average}⭐</p>
              </div>
            ))
          : orderMovies.map((movie) => (
              <div
                key={movie.id}
                className="px-2 w-1/4 pb-4"
                onClick={() => openModal(movie)}
                style={{ cursor: "pointer" }}
              >
                <div className="mb-4">
                  <img
                    src={`${imageUrl + movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={400}
                  />
                </div>
                <p className="text-2xl font-bold ">{movie.title}</p>
                <p className="text-xl">Género: {generos[movie.genre_ids[0]]}</p>
                <p className="text-xl">Calificación: {movie.vote_average}⭐</p>
              </div>
            ))}
      </div>
      {modalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;
