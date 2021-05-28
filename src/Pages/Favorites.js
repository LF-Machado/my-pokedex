import React from "react";
import NavBar from "../Components/NavBar";
import FavoriteList from "../Components/FavoriteList";
import Card from "react-bootstrap/Card";

function Favorites() {
  return (
    <div>
      <Card
        className="m-auto p-3 align-content-center w-75 align-self-center fixed-top"
        bg="danger"
      >
        <div style={{ padding: "1.1rem" }}></div>
      </Card>
      <FavoriteList />
      <NavBar />
    </div>
  );
}

export default Favorites;
