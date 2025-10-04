import React, { createContext, useState } from "react";


const Appcontext = createContext();

const AppcontextProvider = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Appcontext.Provider
      value={{
        backendurl,
        token,
        setToken,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export { Appcontext, AppcontextProvider };
