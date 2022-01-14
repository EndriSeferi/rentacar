import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: "#1c1c1c" }}
      fixed="top"
      variant="dark"
    >
      <Container fluid className="my__container">
        <Navbar.Brand as={Link} to="/" className="my__title">
          Elite Car Rental
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/ourpolicy">
              Our Policy
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
