import React from "react";
import DetailView from "../Components/DetailView";
import { CSSTransition } from "react-transition-group";
import "./Detail.css";

function Detail() {
  return (
    <CSSTransition in={true} appear={true} timeout={800} classNames="fade">
      <DetailView />
    </CSSTransition>
  );
}

export default Detail;
