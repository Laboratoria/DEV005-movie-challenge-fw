import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../servicios/useFetch";

const Banner = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const [currentIdex, setCurrentIndex] = useState(0);
  const listRef = useRef();
  const { data } = useFetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1"
  );

  const movies = data.results;
  let principales = [];

  if (movies) {
    principales = data.results.slice(0, 3);
  }

  console.log(principales, 19);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIdex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIdex]);

  const scrollToImage = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIdex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIdex === principales.length - 1;
      if (!isLastSlide) {
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="main-container py-4 px-2">
      <div className="slider-container relative h-96">
        <div
          className="leftArrow absolute top-1/2 transform -translate-y-1/2 left-4 text-4xl font-semibold text-white z-10 cursor-pointer"
          onClick={() => scrollToImage("prev")}
        >
          &#10092;
        </div>
        <div
          className="rightArrow absolute top-1/2 transform -translate-y-1/2 right-4 text-4xl font-semibold text-white z-10 cursor-pointer"
          onClick={() => scrollToImage("next")}
        >
          &#10093;
        </div>
        <div className="container-images w-full h-full rounded-lg border border-gray-300 overflow-hidden">
          <ul ref={listRef} className="flex overflow-x-scroll space-x-4">
            {data.results ? (
              principales.map((movie, index) => {
                const isActive = index === currentIdex;

                return (
                  <li
                    key={movie.id}
                    className="flex-shrink-0 w-full h-96 relative"
                  >
                    <img
                      src={`${imageUrl + movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover object-center"
                    />
                    {isActive && (
                      <p className="absolute bottom-11 left-0 right-0 bg-black bg-opacity-50 text-white text-4xl font-semibold text-center py-2">
                        {movie.title}
                      </p>
                    )}
                  </li>
                );
              })
            ) : (
              <p className="text-white">No se encuentran las películas</p>
            )}
          </ul>
        </div>
        <div className="dots-container absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {principales.map((_, idx) => (
            <div
              key={idx}
              className={`dot-container-item w-4 h-4 rounded-full bg-black ${
                idx === currentIdex ? "bg-yellow-500" : ""
              } cursor-pointer`}
              onClick={() => goToSlide(idx)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
