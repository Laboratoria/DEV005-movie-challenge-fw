import "./App.css";
import logo from "./assets/logotipo1.png";
//import { MoviesGrid } from "./components/moviesGrid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieDetails } from "./pages/movieDetails";
import { LandingPage } from "./pages/landingPage";

export function App() {
  return (
    <div className="homepage">
      <header>
        <div className="headerMovie">
          <div className="leftHeader">
            <img src={logo} alt={"logo"} className="loguito" />
          </div>
        </div>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

//export default App;
