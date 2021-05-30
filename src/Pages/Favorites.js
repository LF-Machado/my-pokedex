import React from "react";
import NavBar from "../Components/NavBar";
import FavoriteList from "../Components/FavoriteList";
import Card from "react-bootstrap/Card";
import { Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Favorites() {
  return (
    <div>
      <Card
        className="m-auto p-3 align-content-center w-75 align-self-center flex-row fixed-top"
        bg="danger"
      >
        <div style={{ display: "flex", flex: "1 1 0px" }}>
          <LinkContainer to="/home">
            <Navbar.Brand className="align-self-start justify-content-start ml-3">
              My Pokédex
            </Navbar.Brand>
          </LinkContainer>
        </div>
        <div style={{ flex: "1 1 0px" }} />
        <div style={{ flex: "1 1 0px" }} />
      </Card>
      <FavoriteList />
      <NavBar />
    </div>
  );
}

export default Favorites;
