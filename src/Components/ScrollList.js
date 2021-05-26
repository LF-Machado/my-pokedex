import React, { useEffect, useState } from "react";
import axios from "axios";

function ScrollList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const logedIn = localStorage.getItem("logedIn");

  useEffect(() => {
    if (logedIn) {
      const fetchData = async () => {
        try {
          const request = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
          );
          setPokemon(request);
          console.log(request.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [logedIn]);

  return <div></div>;
}

export default ScrollList;
