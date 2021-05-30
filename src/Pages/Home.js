import React from "react";
import NavBar from "../Components/NavBar";
import ScrollList from "../Components/ScrollList";
import { CSSTransition } from "react-transition-group";
import "./Home.css";

function Home() {
  return (
    <div>
      <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
        <div>
          <ScrollList />
          <NavBar />
        </div>
      </CSSTransition>
    </div>
  );
}

export default Home;
