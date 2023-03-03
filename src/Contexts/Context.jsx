import React, { createContext, useCallback, useEffect, useState } from "react";
import api from "../services/api";

export const CountryContext = createContext({});

export const CountryProvider = ({ children }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCountries = useCallback(() => {
    setLoading(true);
    api
      .get("/all/")
      .then((response) => {
        console.log(response);
        const items = response.data.map((item) => {
          return {
            ...item,
            id: item.cioc,
          };
        });
        setCountriesToShow(items);
        setAllCountries(items);
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

  const onSearch = (text) => {
    // Filtrar na lista
    console.log("onSearch: ", text);

    setCountriesToShow([
      ...allCountries.filter((item) => {
        const name = (item.name || "").toLowerCase();
        return name.includes((text || "").toLowerCase());
      }),
    ]);
  };

  return (
    <CountryContext.Provider
      value={{
        allCountries,
        countriesToShow,
        loading,
        onSearch,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
