import React, { useState, useReducer } from "react";
import { GeneratorRepr } from "generate-anything";
import { emptyGenerator, GeneratorField } from "./Fields";
import { hasDuplicates } from "./util";
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
                        <Form.Control type="text" value={props.name} onChange={setEventValue(props.setName)} />
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

function uncurriedSubmit(navigate, attributes, name, initName, generators, setErrorMsg, setGenerators, event) {
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
            setEntity = GeneratorRepr.createEntity(name, objAttr);
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

export function EditEntityComponent(props) {
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
    
    const reducer = (state, action) => {
        switch(action.kind) {
            case "add":
                return [...state, {name: action.name, value: action.value}];
            case "setName":
                const newList = [...state];
                newList[action.index].name = action.name;
                return newList;
            case "setValue":
                const otherNewList = [...state];
                otherNewList[action.index].value = action.value;
                return otherNewList;
            default:
                throw new Error();
        }
    };

    const [attributes, attributesDispatch] = useReducer(reducer, initAttributes);

    let nameField = <h3>{initName}</h3>;

    if (initName === "") {
        nameField = (
                <Row className="mb-2">
                    <Form.Group as={Col} xs={3}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={setEventValue(setName)} />
                    </Form.Group>
                </Row>
                );
    }

    const addAttribute = () => {
        attributesDispatch({
        kind: "add",
        name: "",
        value: emptyGenerator,
        });
    }

    const setAttributeName = index => name => attributesDispatch({kind: "setName", index: index, name: name});
    const setValue = index => value => attributesDispatch({kind: "setValue", index: index, value: value});

    const attributeFields = attributes
        .map((attribute, index) =>
            <Attribute
            index={index}
            name={attribute.name}
            value={attribute.value}
            generators={props.generators}
            setValue={setValue(index)}
            setName={setAttributeName(index)}
            />
            );

    return (<React.Fragment>
            {errorMsgComponent}
            <Form onSubmit={submit(navigate, attributes, name, initName, props.generators, setErrorMsg, props.setGenerators)}>
                {nameField}

                <ListGroup className="mb-2">
                    {attributeFields}
                </ListGroup>

                <Button className="mb-2" onClick={addAttribute}>Add Attribute</Button>

                <Row><Col>
                    <Button as="input" type="submit" value="Save" />
                </Col></Row>
            </Form>
    </React.Fragment>);
}

export default function CreateEntityComponent(props) {
        return (<main className="create-entity container">
            <h2>Creating an Entity</h2>
            <p>About entity</p>
            <EditEntityComponent {...props} />
        </main>
        );
}
