import { createContext, useState } from "react";

export const MostarPeliculasContext = createContext({
  setSelect: () => {},
  select: null,
});

export const MostarPeliculasProvider = ({ children }) => {
  const [select, setSelect] = useState(null);

  return (
    <MostarPeliculasContext.Provider
      value={{
        select,
        setSelect,
      }}
    >
      {children}
    </MostarPeliculasContext.Provider>
  );
};
