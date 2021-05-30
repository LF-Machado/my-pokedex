import React, { useEffect, useState } from "react";
import getDetails from "../utils/getDetails";
import { useLocation, useHistory } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import {
  checkFavorites,
  getFavorites,
  saveFavorites,
  makeUnfavorite,
  makeFavorite,
} from "../utils/favoritesFunctions";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function DetailView() {
  const [pokeDetails, setPokeDetails] = useState([]);
  const currUser = localStorage.getItem("user");
  const [favoritesArray, setFavoritesArray] = useState(
    getFavorites(currUser) || []
  );
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const id = parseInt(new URLSearchParams(location.search).get("id"));
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    async function fetchData() {
      try {
        const details = await getDetails(url);
        const checkedPokemon = checkFavorites([details], favoritesArray);
        setPokeDetails(...checkedPokemon);
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, [location.search, favoritesArray]);

  useEffect(() => {
    saveFavorites(currUser, favoritesArray);
  }, [currUser, favoritesArray]);

  const handleClickUnfavorite = ({ target }) => {
    const [newPokemon, newFavorites] = makeUnfavorite(
      target,
      [pokeDetails],
      favoritesArray
    );

    setPokeDetails(...newPokemon);
    setFavoritesArray([...newFavorites]);
  };

  const handleClickFavorite = ({ target }) => {
    const [newPokemon, newFavorites] = makeFavorite(
      target,
      [pokeDetails],
      favoritesArray
    );

    setPokeDetails(...newPokemon);
    setFavoritesArray([...newFavorites]);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const defineStyle = type => {
    const colorTypes = {
      normal: "#A8A878",
      fire: "#F08030",
      fighting: "#C03028",
      water: "#6890F0",
      flying: "#A890F0",
      grass: "#78C850",
      poison: "#A040A0",
      electric: "#F8D030",
      ground: "#E0C068",
      psychic: "#F85888",
      rock: "#B8A038",
      ice: "#98D8D8",
      bug: "#A8B820",
      dragon: "#7038F8",
      ghost: "#705898",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
      other: "#68A090",
    };

    const color = colorTypes[type] || colorTypes.other;

    return {
      backgroundColor: color,
      width: "100px",
      borderRadius: "20px",
      border: `1px solid ${color}`,
      color: "white",
      textShadow: "2px 2px 4px grey",
    };
  };

  return (
    <Container className="d-flex justify-content-center" fluid>
      <Card
        className="d-flex align-self-center text-center w-75 p-0 m-3"
        border="primary"
        bg="dark"
        text="light"
      >
        <Row>
          <Col className="d-flex align-items-center ml-4">
            <Button className="m-2" variant="danger" onClick={handleGoBack}>
              Go Back
            </Button>
          </Col>
          <Col>
            <Card.Header className="d-flex align-items-center pl-5 pr-5 pt-3">
              <Col className=" ">
                <h4>
                  {pokeDetails?.name?.charAt(0).toUpperCase() +
                    pokeDetails?.name?.slice(1)}
                </h4>
                <h5>{`Id# ${pokeDetails?.id}`}</h5>
              </Col>
            </Card.Header>
          </Col>
          <Col className="mr-4"></Col>
        </Row>
        <Card
          className="d-flex align-self-center text-center w-100 pt-0 pl-2 pb-0 pr-2"
          border="primary"
          bg="secondary"
          text="light"
        >
          <Row className="justify-content-center">
            <FavoriteButton
              pokemon={pokeDetails}
              handleClickUnfavorite={handleClickUnfavorite}
              handleClickFavorite={handleClickFavorite}
            />
          </Row>
          <Row className="justify-content-center">
            <img
              src={
                pokeDetails?.sprites?.other["official-artwork"]?.front_default
              }
              alt="Official Artwork"
              style={{ width: "60%" }}
            />
          </Row>
          <Card bg="primary" border="primary" className="pt-0  m-2">
            <Card.Header>Sprites</Card.Header>
            <Card bg="dark" border="primary" className="pt-0 pl-5 pb-5 pr-5 ">
              <Row>
                <Col>
                  <img
                    src={pokeDetails?.sprites?.front_default}
                    alt="Default sprite"
                    style={{ width: "50%" }}
                  />
                  <br />
                  <small>Default</small>
                </Col>
                <Col>
                  <img
                    src={pokeDetails?.sprites?.front_shiny}
                    alt="Shiny sprite"
                    style={{ width: "50%" }}
                  />
                  <br />
                  <small>Shiny</small>
                </Col>
              </Row>
            </Card>
          </Card>
          <Card bg="primary" border="primary" className="pt-0  m-2">
            <Card.Header>Types</Card.Header>
            <Card bg="dark" border="primary" className="pt-0 pl-5 pb-0 pr-5 ">
              <Row className="m-3 justify-content-center">
                {pokeDetails?.types?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="m-2"
                      style={defineStyle(e.type.name)}
                    >
                      {e.type.name}
                    </div>
                  );
                })}
              </Row>
            </Card>
          </Card>
        </Card>
      </Card>
    </Container>
  );
}

export default DetailView;
