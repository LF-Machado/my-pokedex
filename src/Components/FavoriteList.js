import React, { useEffect, useState } from "react";
import getDetails from "../utils/getDetails";
import Pokemon from "./Pokemon";
import {
  getFavorites,
  saveFavorites,
  makeUnfavorite,
} from "../utils/favoritesFunctions";
import { useHistory } from "react-router-dom";

function FavoriteList() {
  const [allPokemon, setAllPokemon] = useState([]);
  const currUser = localStorage.getItem("user");
  const history = useHistory();
  const [favoritesArray, setFavoritesArray] = useState(
    getFavorites(currUser) || []
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const detailPokemon = await Promise.all(
          favoritesArray.map(id => {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            const details = getDetails(url);
            return details;
          })
        );

        const favoritePokemon = detailPokemon.map(pokemon => {
          pokemon.favorite = true;
          return pokemon;
        });

        setAllPokemon(favoritePokemon);
      } catch (error) {}
    }
    fetchData();
  }, [favoritesArray]);

  useEffect(() => {
    saveFavorites(currUser, favoritesArray);
  }, [currUser, favoritesArray]);

  const handleClickUnfavorite = ({ target }) => {
    const [newPokemon, newFavorites] = makeUnfavorite(
      target,
      allPokemon,
      favoritesArray
    );

    setAllPokemon([...newPokemon]);
    setFavoritesArray([...newFavorites]);
  };

  const goToDetail = ({ target }) => {
    const id = parseInt(target.id);
    history.push(`/detail?id=${id}`);
  };

  return (
    <Pokemon
      allPokemon={allPokemon}
      handleClickUnfavorite={handleClickUnfavorite}
      goToDetail={goToDetail}
    />
  );
}

export default FavoriteList;
