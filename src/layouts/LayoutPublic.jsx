import { Outlet } from "react-router-dom";
import Navbar from "../componentes/header/Navbar.jsx";
/* import Slider from "../componentes/slider/Slider.jsx"; */
/* import Carrusel from "../componentes/carrusel/Carrusel.jsx"; */

const LayoutPublic = () => {
  return (
    <div>
      <Navbar />

      <Outlet />

      <footer>Probando Layout</footer>
    </div>
  );
};

export default LayoutPublic;

//Este componente sirve para poder poner elementos iguales en las diferentes rutas y así no tener que repetirlo en cada componente
{
  /*    <Slider /> */
}
