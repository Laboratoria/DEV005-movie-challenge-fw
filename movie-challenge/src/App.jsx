import "./App.css";
import logo from "./assets/logotipo1.png";
//import { MoviesGrid } from "./components/moviesGrid";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MovieDetails } from "./pages/movieDetails";
import { LandingPage } from "./pages/landingPage";

export function App() {
  return (
    <Router className="homepage">
      <header>
        <div className="headerMovie">
          <div className="leftHeader">
            <img src={logo} alt={"logo"} className="loguito" />
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

//export default App;
