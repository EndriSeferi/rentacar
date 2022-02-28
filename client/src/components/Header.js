import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  const lang = localStorage.getItem("lang");

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
          Tirana Rent A Car
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            <Nav.Link as={Link} to="/">
              {lang === "sq" ? "Kryefaqja" : "Home"}
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              {lang === "sq" ? "Rreth Nesh" : "About Us"}
            </Nav.Link>
            <Nav.Link as={Link} to="/ourpolicy">
              {lang === "sq" ? "Kontrata" : "Our Policy"}
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
