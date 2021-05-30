import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import getDetails from "../utils/getDetails";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Search } from "@material-ui/icons";

function Typeahead() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [foundPokemon, setFoundPokemon] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCount = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1`
        );

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${responseCount.data.count}`
        );

        setAllPokemon(response.data.results);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const searchedPokemon = allPokemon
      .filter(pokemon => pokemon.name.includes(searchValue.toLowerCase()))
      .slice(0, 5);

    const fetchData = async () => {
      try {
        const allUrl = searchedPokemon.map(pokemon => {
          return pokemon.url;
        });
        const detailPokemon = await Promise.all(
          allUrl.map(url => {
            const image = getDetails(url);
            return image;
          })
        );

        setFoundPokemon(detailPokemon);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, [searchValue]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchValue(value);
  };

  const goToDetail = ({ target }) => {
    const id = parseInt(target.id);
    history.push(`/detail?id=${id}`);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (foundPokemon[0]) {
      const obj = { target: { id: foundPokemon[0].id } };
      goToDetail(obj);
    }
  };

  return (
    <div style={{ position: "relative", display: "flex" }}>
      {searchValue ? (
        <Card
          className="mb-2 pt-2 pr-3 pb-1 pl-3"
          style={{
            position: "absolute",
            zIndex: "9",
            bottom: 40,
            left: 0,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            width: "15vw",
            textAlign: "left",
          }}
        >
          {foundPokemon?.map(pokemon => (
            <h6 id={pokemon.id} key={pokemon.id} onClick={goToDetail}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h6>
          ))}
        </Card>
      ) : (
        false
      )}
      <Form
        style={{ display: "flex", flexDirection: "row" }}
        onSubmit={handleSubmit}
      >
        <Form.Control
          className="mt-1"
          id="search"
          name="search"
          type="text"
          autoComplete="off"
          placeholder="Search..."
          style={{ width: "15vw" }}
          onChange={handleChange}
          value={searchValue}
        />
        <Button className="mt-1 ml-2" type="submit">
          <Search />
        </Button>
      </Form>
    </div>
  );
}

export default Typeahead;
