import React from "react";
import FavoriteButton from "./FavoriteButton";
import Card from "react-bootstrap/Card";

function Pokemon({
  allPokemon,
  handleClickUnfavorite,
  handleClickFavorite,
  goToDetail,
  scrollList,
}) {
  return (
    <Card
      className="ml-5 mr-5 mb-5 mt-5 p-5 w-75 align-self-center align-items-center"
      style={{ minHeight: "100vh", position: "relative" }}
      bg="dark"
      border="primary"
    >
      {!scrollList && !allPokemon.length ? (
        <h2
          style={{
            color: "white",
            margin: 0,
            position: "absolute",
            top: "43%",
            msTransform: "translateY(-43%)",
            transform: "translateY(-43%)",
          }}
        >
          You have no favorties
        </h2>
      ) : (
        allPokemon.map(pokemon => {
          return (
            <Card
              className="d-flex align-self-center text-center w-50 mb-3 mt-2 ml-4 mr-4 p-2"
              border="primary"
              bg="secondary"
              text="light"
              key={pokemon.id}
            >
              <h4 onClick={goToDetail} id={pokemon.id}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
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
        })
      )}
    </Card>
  );
}

export default Pokemon;
