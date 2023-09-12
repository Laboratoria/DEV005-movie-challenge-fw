import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [movies, setMovies] = useState([]);

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
      const res = await fetch(url, options);
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      error;
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data: movies };
};
