import React, { createContext, useCallback, useEffect, useState } from "react";
import api from "../services/api";

export const CountryContext = createContext({});

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCountries = useCallback(() => {
    setLoading(true);
    api
      .get("/all/")
      .then((response) => {
        console.log(response);
        setCountries(
          response.data.map((item) => {
            return {
              ...item,
              id: item.cioc,
            };
          })
        );
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  return (
    <CountryContext.Provider
      value={{
        countries,
        loading,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
