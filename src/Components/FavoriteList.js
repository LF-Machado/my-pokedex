import React, { useEffect, useState } from "react";
import getDetails from "../utils/getDetails";
import Pokemon from "./Pokemon";
import {
  getFavorites,
  saveFavorites,
  makeUnfavorite,
} from "../utils/favoritesFunctions";
import { useHistory } from "react-router-dom";
import "./FavoriteList.css";
import { Navbar, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function FavoriteList() {
  const [allPokemon, setAllPokemon] = useState([]);
  const currUser = localStorage.getItem("user");
  const history = useHistory();
  const [favoritesArray, setFavoritesArray] = useState(
    getFavorites(currUser) || []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const favoriteListStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={favoriteListStyle}>
      <Card
        className="m-auto p-3 align-content-center w-75 align-self-center flex-row fixed-top"
        bg="danger"
      >
        <div style={{ display: "flex", flex: "1 1 0px" }}>
          <LinkContainer to="/home">
            <Navbar.Brand className="align-self-start justify-content-start ml-3 link">
              My Pokédex
            </Navbar.Brand>
          </LinkContainer>
        </div>
        <div style={{ flex: "1 1 0px" }} />
        <div style={{ flex: "1 1 0px" }} />
      </Card>
      <Pokemon
        allPokemon={allPokemon}
        handleClickUnfavorite={handleClickUnfavorite}
        goToDetail={goToDetail}
        scrollList={false}
      />
    </div>
  );
}

export default FavoriteList;
