import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../Components/NavBar";

function Favorites() {
  const logedIn = localStorage.getItem("logedIn");
  const history = useHistory();

  useEffect(() => {
    if (!logedIn) history.push("/");
  }, []);

  return (
    <div>
      <div>Favorites</div>
      <NavBar />
    </div>
  );
}

export default Favorites;
