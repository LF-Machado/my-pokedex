import React from "react";
import NavBar from "../Components/NavBar";
import ScrollList from "../Components/ScrollList";
import Logout from "../Components/Logout";

function Home() {
  return (
    <div>
      <ScrollList />
      <NavBar />
    </div>
  );
}

export default Home;
