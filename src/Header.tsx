import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export default function Header() {
    return (
    <header>
        <Navbar bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Generate Anything</Navbar.Brand></LinkContainer>
                <Nav>
                    <LinkContainer to="/generator/create"><Nav.Link>Create generator</Nav.Link></LinkContainer>
                    <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
                    <LinkContainer to="/examples"><Nav.Link>Examples</Nav.Link></LinkContainer>
                    <Nav.Link href="https://thiswebsiteis.online">Creator</Nav.Link>
                    <Nav.Link href="https://github.com/TWSiO/generate-anything-ui">Github</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </header>
    );
}
