import React from "react";
import "./Pokemon.css";
import FavoriteButton from "./FavoriteButton";
import Card from "react-bootstrap/Card";

function Pokemon({
  allPokemon,
  handleClickUnfavorite,
  handleClickFavorite,
  goToDetail,
}) {
  return (
    <Card
      className="ml-5 mr-5 p-3 w-75 align-self-center "
      bg="dark"
      border="primary"
    >
      {allPokemon.map(pokemon => {
        return (
          <Card
            className="d-flex align-self-center text-center w-50 mb-3 ml-4 mr-4"
            border="primary"
            bg="secondary"
            text="light"
            key={pokemon.id}
          >
            <h4 onClick={goToDetail} id={pokemon.id}>
              {pokemon.name}
            </h4>
            <FavoriteButton
              pokemon={pokemon}
              handleClickUnfavorite={handleClickUnfavorite}
              handleClickFavorite={handleClickFavorite}
            />
            <Card.Img
              className="align-self-center w-50 m-2"
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt="404 image not found"
              id={pokemon.id}
              onClick={goToDetail}
            />
          </Card>
        );
      })}
    </Card>
  );
}

export default Pokemon;
