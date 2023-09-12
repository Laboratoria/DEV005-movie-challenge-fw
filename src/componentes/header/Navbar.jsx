import { Link } from "react-router-dom";
import Logo from "../../assets/LogoMovie.png";

const Navbar = () => {
  return (
    <div>
      <div className="bg-purple-800 text-white flex justify-between p-2 text-xl font-bold">
        <img
          src={Logo}
          alt="Cinema Zone"
          width={80}
          height={80}
          className="flex justify-self-start ml-2"
        />
        <div className="flex justify-around items-center w-full">
          <Link to="/" className="hover:text-yellow-500">
            HOME
          </Link>
          <Link to="/estrenos" className="hover:text-yellow-500">
            ESTRENOS
          </Link>
          <Link to="/top" className="hover:text-yellow-500">
            MEJOR CALIFICADAS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
