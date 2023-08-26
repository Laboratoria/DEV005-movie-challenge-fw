import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/logotipo1.png";
import { MoviesGrid } from "./moviesGrid";
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
        <MoviesGrid />
      </main>
    </div>
  );
}

//export default App;
