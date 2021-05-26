import React from "react";

function Pokemon({ allPokemon, handleClickUnfavorite, handleClickFavorite }) {
  return (
    <div>
      {allPokemon.map(pokemon => {
        return (
          <div key={pokemon.id}>
            <label>{pokemon.name}</label>
            <img src={pokemon.sprites.front_default} />
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
