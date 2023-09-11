import "./App.css";
import logo from "./assets/logotipo1.png";
//import { MoviesGrid } from "./components/moviesGrid";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { MovieDetails } from "./pages/movieDetails";
import { LandingPage } from "./pages/landingPage";
import styles from "./App.module.css";
import { Search } from "./components/search";

export function App() {
  return (
    <Router className="homepage">
      <header>
        <div className="headerMovie">
          <div className="leftHeader">
            <img src={logo} alt={"logo"} className="loguito" />
          </div>
          <div className="rightHeader">
            <div>
              <Search />
            </div>
            <div className="rightInicio">
              <Link to="/">
                <h1 className={styles.inicio}>Inicio</h1>
              </Link>
            </div>
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
