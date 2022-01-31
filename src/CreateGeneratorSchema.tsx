import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CreateGeneratorSchema(props) {
    
    return (<Container>
    <h1>Create generator</h1>

    <Nav className="mb-2" variant="pills">
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
    </Nav>

    <Row><Col xs={3}>
        <Card body>Create a new generator</Card>
    </Col></Row>

    <Outlet />

    </Container>);
}
