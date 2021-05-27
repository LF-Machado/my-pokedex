import React from "react";
import "./Pokemon.css";
import FavoriteButton from "./FavoriteButton";

function Pokemon({
  allPokemon,
  handleClickUnfavorite,
  handleClickFavorite,
  goToDetail,
}) {
  return (
    <div>
      {allPokemon.map(pokemon => {
        return (
          <div key={pokemon.id}>
            <label>{pokemon.name}</label>
            <img
              className="pokemon__image"
              // src={pokemon.sprites.front_default}
              src={pokemon.sprites.other["official-artwork"].front_default}
              id={pokemon.id}
              onClick={goToDetail}
            />
            <FavoriteButton
              pokemon={pokemon}
              handleClickUnfavorite={handleClickUnfavorite}
              handleClickFavorite={handleClickFavorite}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Pokemon;
