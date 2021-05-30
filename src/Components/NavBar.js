import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logout from "./Logout";
import Typeahead from "./Typeahead";

function NavBar() {
  return (
    <div>
      <Navbar
        className="m-auto align-self-center justify-content-between w-75 align-items-center "
        fixed="bottom"
        bg="danger"
        variant="light"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "50px",
            alignSelf: "flex-start",
            width: "96px",
          }}
        >
          <Typeahead />
        </div>
        <Nav className="m-auto align-self-center" variant="tabs" fill>
          <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favorites">
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
        </Nav>
        <Logout />
      </Navbar>
    </div>
  );
}

export default NavBar;
