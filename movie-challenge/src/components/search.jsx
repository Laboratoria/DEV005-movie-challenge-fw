import { FaSearch } from "react-icons/fa";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "../hooks/useQuery";

export function Search() {
  /*para actualizar el imput con labusqueda y se limpie si regresa a la home*/
  const query = useQuery();
  const search = query.get("search");

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  /*este efecto s eva ejecutar siempre y cuando haya un cambio en el search*/
  useEffect(() => {
    /*cambiame el texto y ponme ese texto que me vino x la ruta*/
    setSearchText(search || "");
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault(); /*le estamos diciendo al evento que cancela por defecto loque sehace  enel formulario*/
    navigate("/?search=" + searchText);
  };
  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchImput}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
}
