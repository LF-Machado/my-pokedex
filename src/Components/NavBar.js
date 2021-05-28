import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Nav className="m-auto" variant="pills" fill>
          <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favorites">
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
