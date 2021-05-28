import React from "react";
import Button from "react-bootstrap/Button";

function favoriteButton({
  pokemon,
  handleClickUnfavorite,
  handleClickFavorite,
}) {
  return (
    <div>
      {pokemon?.favorite ? (
        <Button
          className="m-2"
          variant="warning"
          border="dark"
          id={pokemon.id}
          onClick={handleClickUnfavorite}
        >
          Favorite
        </Button>
      ) : (
        <Button
          className="m-2"
          variant="outline-light"
          id={pokemon.id}
          onClick={handleClickFavorite}
        >
          Add
        </Button>
      )}
    </div>
  );
}

export default favoriteButton;
