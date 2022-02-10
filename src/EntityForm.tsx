import React, { useState, useReducer } from "react";
import { createEntitySchema } from "generate-anything";
import { emptyGenerator, GeneratorField } from "./Fields";
import { hasDuplicates, passEventValue } from "./util";
import { useParams, useNavigate } from "react-router-dom";
import * as _ from "lodash/fp";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

const setEventValue = (setter) => (event) => setter(event.target.value);

function Attribute(props) {
    return (<ListGroup.Item variant="primary" key={props.index}>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Attribute Name</Form.Label>
                        <Form.Control type="text" value={props.name} onChange={passEventValue(props.setName)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Attribute Generator</Form.Label>
                        <GeneratorField
                        value={props.value}
                        generatorSetter={props.setValue}
                        generators={props.generators}
                        />
                    </Form.Group>
                </Row>
            </ListGroup.Item>);
}

const getNames = _.map(_.flip(_.get)("name"))
const hasDuplicateNames = _.compose([hasDuplicates, getNames]);

function uncurriedSubmit(navigate, attributes, name, generators, setErrorMsg, setGenerators, event) {
    event.preventDefault();

    if (hasDuplicateNames(attributes)) {
        setErrorMsg("Can't have attributes with the same name");
    } else if (name === "") {
        setErrorMsg("Generator name cannot be blank");
    } else {
        const reducer = (accum, val) => {
            accum[val.name] = val.value;
            return accum;
        }

        const objAttr = attributes.reduce(reducer, {});

        let setEntity;
        // Set the new entity value
        if (!(name in generators)) {
            setEntity = createEntitySchema(name, objAttr);
        } else {
            const toModify = generators[name]
            toModify.attributes = objAttr;
            setEntity = toModify
        }
        setGenerators({kind: "set", key: name, value: setEntity});
        setErrorMsg("");
        navigate(`/generator/${name}`);
    }
}

const submit = _.curry(uncurriedSubmit);
    
const attributesReducer = (state, action) => {
    switch(action.kind) {
        case "add":
            return [...state, {name: action.name, value: action.value}];
        case "setName": {
            const newList = [...state];
            newList[action.index].name = action.name;
            return newList;
        }
        case "setValue": {
            const otherNewList = [...state];
            otherNewList[action.index].value = action.value;
            return otherNewList;
        }
        default:
            throw new Error();
    }
};

const addAttribute = attributesDispatch => () => {
    attributesDispatch({
    kind: "add",
    name: "",
    value: emptyGenerator,
    });
}

function createNameField(name, setName) {
    return (
            <Row className="mb-2">
                <Form.Group as={Col} xs={3}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={setEventValue(setName)} />
                </Form.Group>
            </Row>
           );
}

export function EditEntitySchema(props) {
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    let errorMsgComponent = null;
    if (errorMsg !== "") {
        errorMsgComponent = (<Alert variant={"danger"}>{errorMsg}</Alert>);
    }

    let initAttributes = [];
    let initName = useParams()?.name;

    if (initName !== undefined) {
        const attr = props.generators[initName].attributes
        initAttributes = _.map(key => ({name: key, value: attr[key]}))(_.keys(attr));
    } else {
        initName = "";
    }

    const [name, setName] = useState(initName);

    const [attributes, attributesDispatch] = useReducer(attributesReducer, initAttributes);

    let nameField = <h3>{initName}</h3>;

    if (initName === "") {
        nameField = createNameField(name, setName);
    }

    const setAttributeName = index => name => attributesDispatch({kind: "setName", index: index, name: name});
    const setValue = index => value => attributesDispatch({kind: "setValue", index: index, value: value});

    const attributeFields = attributes
        .map((attribute, index) =>
            <Attribute
            index={index}
            key={index}
            name={attribute.name}
            value={attribute.value}
            generators={props.generators}
            setValue={setValue(index)}
            setName={setAttributeName(index)}
            />
            );

    return (<React.Fragment>
            {errorMsgComponent}
            <Form onSubmit={submit(navigate, attributes, name, props.generators, setErrorMsg, props.setGenerators)}>
                {nameField}

                <ListGroup className="mb-2">
                    {attributeFields}
                </ListGroup>

                <Button className="mb-2" onClick={addAttribute(attributesDispatch)}>Add Attribute</Button>

                <Row><Col>
                    <Button as="input" type="submit" value="Save" />
                </Col></Row>
            </Form>
    </React.Fragment>);
}

export function CreateEntitySchemaPage(props) {
        return (<main className="create-entity container">
            <h2>Creating an Entity</h2>
            <p>An entity generator generates an entity which has other values generated by other generators as attributes.</p>
            <p>This allows you to create some entity with randomized attributes.</p>
            <EditEntitySchema {...props} />
        </main>
        );
}
