import { useState } from "react";
import { useGenres } from "../../servicios/useGeneros";
import useFiltroGeneros from "../../servicios/useFiltroGeneros";

const SelectGenero = ({ handleFiltroGeneros }) => {
  const imageUrl = "https:image.tmdb.org/t/p/original";
  const generos = useGenres();
  const [selectGenero, setSelectGenero] = useState("");
  const [movieFiltro, setMovieFiltro] = useState("");

  const { data: Accion } = useFiltroGeneros("28");
  const { data: Aventura } = useFiltroGeneros("12");
  const { data: Animacion } = useFiltroGeneros("16");
  const { data: Comedia } = useFiltroGeneros("35");
  const { data: Crimen } = useFiltroGeneros("80");
  const { data: Documental } = useFiltroGeneros("99");
  const { data: Drama } = useFiltroGeneros("18");
  const { data: Familiar } = useFiltroGeneros("10751");
  const { data: Fantasia } = useFiltroGeneros("14");
  const { data: Historia } = useFiltroGeneros("36");
  const { data: Horror } = useFiltroGeneros("27");
  const { data: Musica } = useFiltroGeneros("10402");
  const { data: Misterio } = useFiltroGeneros("9648");
  const { data: Romance } = useFiltroGeneros("10749");
  const { data: CienciaFiccion } = useFiltroGeneros("878");
  const { data: Suspenso } = useFiltroGeneros("53");
  const { data: Tv } = useFiltroGeneros("10770");
  const { data: Western } = useFiltroGeneros("37");
  const { data: Belico } = useFiltroGeneros("10752");

  const handleGeneroChange = (e) => {
    const selectedGenero = e.target.value;

    if (selectedGenero == "Aventura") {
      console.log(Aventura);
      setMovieFiltro(Aventura);
    } else if (selectedGenero === "Fantasía") {
      setMovieFiltro(Fantasia);
    } else if (selectedGenero === "Animación") {
      setMovieFiltro(Animacion);
    } else if (selectedGenero === "Drama") {
      setMovieFiltro(Drama);
    } else if (selectedGenero === "Terror") {
      setMovieFiltro(Horror);
    } else if (selectedGenero === "Acción") {
      setMovieFiltro(Accion);
    } else if (selectedGenero === "Comedia") {
      setMovieFiltro(Comedia);
    } else if (selectedGenero === "Historia") {
      setMovieFiltro(Historia);
    } else if (selectedGenero === "Western") {
      setMovieFiltro(Western);
    } else if (selectedGenero === "Suspense") {
      setMovieFiltro(Suspenso);
    } else if (selectedGenero === "Crimen") {
      setMovieFiltro(Crimen);
    } else if (selectedGenero === "Documental") {
      setMovieFiltro(Documental);
    } else if (selectedGenero === "Ciencia ficción") {
      setMovieFiltro(CienciaFiccion);
    } else if (selectedGenero === "Misterio") {
      setMovieFiltro(Misterio);
    } else if (selectedGenero === "Música") {
      setMovieFiltro(Musica);
    } else if (selectedGenero === "Romance") {
      setMovieFiltro(Romance);
    } else if (selectedGenero === "Familia") {
      setMovieFiltro(Familiar);
    } else if (selectedGenero === "Bélica") {
      setMovieFiltro(Belico);
    } else if (selectedGenero === "Película de TV") {
      setMovieFiltro(Tv);
    } else {
      console.log("genero");
    }

    handleFiltroGeneros();
    setSelectGenero(selectedGenero, "selectGenero");
  };

  console.log(movieFiltro.results, 79);

  return (
    <div>
      <select
        name="filtroGeneros"
        onChange={handleGeneroChange}
        value={selectGenero}
        className="bg-purple-500 text-white text-xl text-center rounded-md w-40 h-10 cursor-pointer"
      >
        <option disabled selected>
          GENERO
        </option>
        {Object.keys(generos).map((genero) => (
          <option key={genero.id} value={genero.id}>
            {generos[genero]}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap ">
        {movieFiltro !== "" ? (
          movieFiltro.results.map((movie) => (
            <div key={movie.id} className="px-2 w-1/4 pb-4">
              <img
                src={`${imageUrl + movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={400}
              />
              <h1>{movie.title}</h1>

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

export default SelectGenero;

/* import { useState } from "react";
import { useGenres } from "../../servicios/useGeneros";
import useFiltroGeneros from "../../servicios/useFiltroGeneros";

const SelectGenero = ({ handleFiltroGeneros }) => {
  const imageUrl = "https:image.tmdb.org/t/p/original";
  const generos = useGenres();
  const [selectGenero, setSelectGenero] = useState("");
  const [movieFiltro, setMovieFiltro] = useState("");

  const { data: Accion } = useFiltroGeneros("28");
  const { data: Aventura } = useFiltroGeneros("12");
  const { data: Animacion } = useFiltroGeneros("16");
  const { data: Comedia } = useFiltroGeneros("35");
  const { data: Crimen } = useFiltroGeneros("80");
  const { data: Documental } = useFiltroGeneros("99");
  const { data: Drama } = useFiltroGeneros("18");
  const { data: Familiar } = useFiltroGeneros("10751");
  const { data: Fantasia } = useFiltroGeneros("14");
  const { data: Historia } = useFiltroGeneros("36");
  const { data: Horror } = useFiltroGeneros("27");
  const { data: Musica } = useFiltroGeneros("10402");
  const { data: Misterio } = useFiltroGeneros("9648");
  const { data: Romance } = useFiltroGeneros("10749");
  const { data: CienciaFiccion } = useFiltroGeneros("878");
  const { data: Suspenso } = useFiltroGeneros("53");
  const { data: Tv } = useFiltroGeneros("10770");
  const { data: Western } = useFiltroGeneros("37");
  const { data: Belico } = useFiltroGeneros("10752");

  const handleGeneroChange = (e) => {
    const selectedGenero = e.target.value;

    if (selectedGenero == "Aventura") {
      console.log(Aventura);
      setMovieFiltro(Aventura);
    } else if (selectedGenero === "Fantasía") {
      setMovieFiltro(Fantasia);
    } else if (selectedGenero === "Animación") {
      setMovieFiltro(Animacion);
    } else if (selectedGenero === "Drama") {
      setMovieFiltro(Drama);
    } else if (selectedGenero === "Terror") {
      setMovieFiltro(Horror);
    } else if (selectedGenero === "Acción") {
      setMovieFiltro(Accion);
    } else if (selectedGenero === "Comedia") {
      setMovieFiltro(Comedia);
    } else if (selectedGenero === "Historia") {
      setMovieFiltro(Historia);
    } else if (selectedGenero === "Western") {
      setMovieFiltro(Western);
    } else if (selectedGenero === "Suspense") {
      setMovieFiltro(Suspenso);
    } else if (selectedGenero === "Crimen") {
      setMovieFiltro(Crimen);
    } else if (selectedGenero === "Documental") {
      setMovieFiltro(Documental);
    } else if (selectedGenero === "Ciencia ficción") {
      setMovieFiltro(CienciaFiccion);
    } else if (selectedGenero === "Misterio") {
      setMovieFiltro(Misterio);
    } else if (selectedGenero === "Música") {
      setMovieFiltro(Musica);
    } else if (selectedGenero === "Romance") {
      setMovieFiltro(Romance);
    } else if (selectedGenero === "Familia") {
      setMovieFiltro(Familiar);
    } else if (selectedGenero === "Bélica") {
      setMovieFiltro(Belico);
    } else if (selectedGenero === "Película de TV") {
      setMovieFiltro(Tv);
    } else {
      console.log("genero");
    }

    handleFiltroGeneros();
    setSelectGenero(selectedGenero, "selectGenero");
  };

  console.log(movieFiltro.results, 79);

  return (
    <div>
      <select
        name="filtroGeneros"
        onChange={handleGeneroChange}
        value={selectGenero}
        className="bg-purple-500 text-white text-xl text-center rounded-md  w-40 h-10 cursor-pointer"
      >
        <option disabled selected>
          GENERO
        </option>
        {Object.keys(generos).map((genero) => (
          <option key={genero.id} value={genero.id}>
            {generos[genero]}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap justify-start">
        {movieFiltro &&
          movieFiltro.results.map((movie) => (
            <div key={movie.id} className=" w-1/4 pb-4">
              <img
                src={`${imageUrl + movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={400}
              />
              <h1>{movie.title}</h1>
              <p>Calificación: {movie.vote_average}⭐</p>
            </div>
          ))}
        {/* {!movieFiltro && <p>no has seleccionado el género</p>} 
      </div>
    </div>
  );
};

export default SelectGenero;
 */
