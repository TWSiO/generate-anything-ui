import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";

export default function CreateGeneratorComponent(props) {
    
    return (<Container>
    <h1>Create generator component</h1>

    <Nav variant="pills">
        <Nav.Item>
            <LinkContainer to="/generator/create/table">
                <Nav.Link>Create New Table</Nav.Link>
            </LinkContainer>
        </Nav.Item>

        <Nav.Item>
            <LinkContainer to="/generator/create/entity">
                <Nav.Link>Create New Entity</Nav.Link>
            </LinkContainer>
        </Nav.Item>

        <Outlet />
    </Nav>

    </Container>);
}
