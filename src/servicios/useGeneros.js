import { useEffect, useState } from "react";

export const useGenres = () => {
  const [genres, setGenres] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjdmMDQ1Y2U2YmZjNjRmZTk5MmUwODgxMTNjN2VkZCIsInN1YiI6IjY0ZWUyYzZiMjcxNjcxMDEzYTNlN2UzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cpAwkgz9QRZ1SmvMrEjfLtZiJc5I7DbeZTJmjbRQcmA",
    },
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=es",
        options
      );
      const data = await res.json();
      setGenres(data);
    } catch (error) {
      console.error(error);
      setGenres([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generosMap = genres.genres;

  const generosIdNombre = {};
  for (const key in generosMap) {
    const genero = generosMap[key];
    generosIdNombre[genero.id] = genero.name;
  }

  console.log(generosIdNombre, "prubea");
  return generosIdNombre;
};
