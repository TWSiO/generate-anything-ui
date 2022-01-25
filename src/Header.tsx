import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

export default function Header() {
    return (
    <header>
        <Navbar bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Generate Anything</Navbar.Brand></LinkContainer>
                <Nav>
                    <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
                    <LinkContainer to="/examples"><Nav.Link>Examples</Nav.Link></LinkContainer>
                    <LinkContainer to="/generator/create"><Nav.Link>Create generator</Nav.Link></LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    </header>
    );
}
