import React from "react";

function Pokemon({ allPokemon }) {
  return (
    <div>
      {allPokemon.map(pokemon => {
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

export default Pokemon;
