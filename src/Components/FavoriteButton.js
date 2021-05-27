import React from "react";

function favoriteButton({
  pokemon,
  handleClickUnfavorite,
  handleClickFavorite,
}) {
  return (
    <div>
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
}

export default favoriteButton;
