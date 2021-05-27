import React from "react";
import "./Pokemon.css";

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
            {pokemon?.favorite ? (
              <button id={pokemon.id} onClick={handleClickUnfavorite}>
                favorite
              </button>
            ) : (
              <button id={pokemon.id} onClick={handleClickFavorite}>
                -
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Pokemon;
