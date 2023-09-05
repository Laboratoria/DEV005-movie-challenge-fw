const API = "https://api.themoviedb.org/3";

export function get(path) {
  return fetch(API + path, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzhiYzIwOTA4OTBkMTljNjYwZTg1OTk5NGQ0YjVkMyIsInN1YiI6IjY0ZWNlOGQ1YzYxM2NlMDEwYjhlMTc5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j2EFFzdtHq7i5DxRp0T22gxLKsn-fVZ3XP5hLqBHHXQ",
      "content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());
}
