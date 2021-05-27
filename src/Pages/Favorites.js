import React from "react";
import NavBar from "../Components/NavBar";
import Logout from "../Components/Logout";
import FavoriteList from "../Components/FavoriteList";

function Favorites() {
  return (
    <div>
      <div>Favorites</div>
      <Logout />
      <FavoriteList />
      <NavBar />
    </div>
  );
}

export default Favorites;
