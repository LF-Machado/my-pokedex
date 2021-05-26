import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScrollList.css";
import getImage from "../utils/getImage";
import { useLocation } from "react-router-dom";

function ScrollList(props) {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const logedIn = localStorage.getItem("logedIn");
  // let location = useLocation();

  useEffect(() => {
    if (logedIn) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
          );

          const generalPokemon = response.data.results;

          const allUrl = generalPokemon.map(pokemon => {
            return pokemon.url;
          });

          const detailPokemon = await Promise.all(
            allUrl.map(url => {
              const image = getImage(url);
              return image;
            })
          );

          setPokemon(detailPokemon);
          console.log(detailPokemon);
          console.log(generalPokemon);

          // const image = await getImage(response.data.results[0].url);
          // console.log(image);

          // const page = parseInt(
          //   new URLSearchParams(location.search).get("page")
          // );

          // console.log(location);
          // console.log(page);
        } catch (error) {
          alert(error);
        }
      };
      fetchData();
    }
  }, [logedIn, offset, limit]);

  // function sprite(url) {
  //   console.log(url);
  //   return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png";
  // }

  return (
    <div className="scroll__container">
      {pokemon.map(pokemon => {
        return (
          <div key={pokemon.id}>
            <label>{pokemon.name}</label>
            <img src={pokemon.sprites.front_default} />
          </div>
        );
      })}
    </div>
  );
}

export default ScrollList;
