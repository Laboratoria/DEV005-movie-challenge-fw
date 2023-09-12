import { useEffect, useState } from "react";

const useFiltroGeneros = (genreId) => {
  const [genre, setGenres] = useState([]);

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
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
        options
      );
      const data = await res.json();
      setGenres(data);
      console.log(data, 23);
    } catch (error) {
      error;
      setGenres([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data: genre };
};

export default useFiltroGeneros;
