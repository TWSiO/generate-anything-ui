import React, { useState, useReducer } from "react";
import * as _ from "lodash/fp";
import { TableGeneratorSchema, createTableSchema } from "generate-anything";
import { emptyGenerator, GeneratorField, ValueField } from "./Fields";
import { useParams, useNavigate  } from "react-router-dom";
import { passEventValue } from "./util";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function uncurriedHandleSubmit(values, setTableError, setGenerators, name, navigate, event) {
    event.preventDefault();

    // Validation
    if (values.includes(emptyGenerator))) {
        setTableError(<Alert variant={"danger"}>Can't have an empty generator field</Alert>);
    } else if (name === "") {
        setTableError(<Alert variant={"danger"}>Generator name cannot be blank</Alert>);
    } else {
        setTableError(null);
        const newTable: TableGeneratorSchema = createTableSchema(name, values);
        setGenerators({kind: "set", key: name, value: newTable});

        navigate(`/generator/${name}`)
    }
}

const handleSubmit = _.curry(uncurriedHandleSubmit);

const tableValuesReducer = (state, action) => {
    switch(action.kind) {
        case "add":
            return [...state, action.value];

        case "set":
            const newList = [...state];
            newList[action.index] = action.value;
            return newList;
        default:
            throw new Error();
    }
};

function createNameField(name, setName) {
    return (
            <Row className="mb-2">
                <Form.Group as={Col} xs={3}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={passEventValue(setName)} />
                </Form.Group>
            </Row>
           );
}

export function EditTableSchema(props) {

    const setEventValue = (setter) => (event) => setter(event.target.value);

    let initName = useParams()?.name;
    let initValues = [];

    if (initName !== undefined) {
        initValues = props.generators[initName].table;
    } else {
        initName = "";
    }

    const [name, setName] = useState(initName);
    const [tableError, setTableError] = useState("");

    const [values, valuesDispatch] = useReducer(tableValuesReducer, initValues);

    const navigate = useNavigate();

    let nameField = <h3>{initName}</h3>;

    if (initName === "") {
        nameField = createNameField(name, setName);
    }

    const setValue = index => value => {
        values[index] = value;
        valuesDispatch({kind: "set", index: index, value: value});
    };

    const valueFields = values.map((value, index) => {
        if (typeof value === "string") {
            return <ListGroup.Item key={index}><ValueField value={value} setValue={setValue(index)} /></ListGroup.Item>
        } else {
            return <ListGroup.Item key={index}><GeneratorField value={value} generatorSetter={setValue(index)} generators={props.generators} /></ListGroup.Item>
        }
    });

    return (
            <Form onSubmit={handleSubmit(values, setTableError, props.setGenerators, name, navigate)}>
                {tableError}

                {nameField}

                <Row className="mb-2">
                    <ListGroup as={Col} xs={5}>
                        {valueFields}
                    </ListGroup>
                </Row>

                <Row className="mb-2">
                    <Col xs={4}>
                        <ButtonGroup>
                            <Button variant="primary" onClick={() => valuesDispatch({kind: "add", value: ""})}>New Static Value</Button>
                            <Button variant="primary" onClick={() => valuesDispatch({kind: "add", value: emptyGenerator})}>New Generator Value</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Button as="input" type="submit" value="Save" />
                    </Col>
                </Row>
            </Form>
    );
}

export function CreateTableSchemaPage(props) {
    return (
        <main className="create-table container">
            <h2>Creating a table</h2>

            <p>A table generator generates a random value from the generator's table set here.</p>

            <EditTableSchema {...props} />

        </main>
    );
}
