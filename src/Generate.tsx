import React, { useState } from "react";
import * as _ from "lodash/fp";
import { useParams, useNavigate } from "react-router-dom";
import { newRoot, root } from "generate-anything";
import { passEventValue } from "./util";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

export function SetSeed(props) {
    const navigate = useNavigate();

    const [seed, setSeed] = useState("");

    const handleRun = event => {
        event.preventDefault();

        if (seed === "") {
            props.setMessage(<Alert variant={"danger"}>Seed should not be blank</Alert>);
        } else {
            props.setMessage("");
            navigate(`/generator/${props.name}/run/${seed}`);
        }
    };

    return (
        <Form onSubmit={handleRun}>
            <Form.Group>
                <Form.Label>Seed</Form.Label>

                <InputGroup>
                    <Button onClick={() => setSeed(String(Math.random()).slice(2))}>Random Seed</Button>
                    <Form.Control
                    type="text"
                    placeholder="seed"
                    value={seed}
                    onChange={passEventValue(setSeed)}
                    />


                    <Button as="input" type="submit" value="Run" />
                </InputGroup>
            </Form.Group>
        </Form>
    );
}

function GeneratorValue(props) {
    const handleClick = event => props.setCurrent(props.value);

    let header;

    if (props.header !== undefined) {
        header = <Card.Header>{props.header}</Card.Header>
    }

    return (
        <Card>
            {header}
            <Card.Body>
                <Card.Title>{props.value.generator.name}</Card.Title>
                <Button type="button" onClick={handleClick}>Go to generated value</Button>
            </Card.Body>
        </Card>
    );
}

function ScalarValue(props) {
    let header;

    if (props.header !== undefined) {
        header = <Card.Header>{props.header}</Card.Header>
    }

    return (<Card bg={"secondary"} text={"light"}>
                {header}
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>{props.value}</Card.Text>
                </Card.Body>
            </Card>);
}

function TableValue(props) {
    const val = props.value.get();
    let displayVal;

    switch (val.kind) {
        case "scalar":
            displayVal = <ScalarValue name={props.value.generator.name} value={val.leaf} />;
            break;
        default:
            displayVal = <GeneratorValue value={val} setCurrent={props.setCurrent} />;
    }

    return displayVal;
}

function OneLevel(props) {
    const vals = props.value.getAll();
    const createGenVal = (key, i) => (
        <ListGroup.Item key={i}>
            <GeneratorValue header={key} value={vals[key]} setCurrent={props.setCurrent} />
        </ListGroup.Item>
    );
    const attributes = Object.keys(vals).map(createGenVal);

    return <ListGroup>{attributes}</ListGroup>;
}

function uncurriedAttributeDisplay(vals, setCurrent, name) {
    const val = vals[name];
    let displayVal;

    switch(val.kind) {
        case "scalar":
            displayVal = <ScalarValue name={"Value"} value={val.leaf} />
            break;
        case "table":
            const tableVal = val.get();

            switch(tableVal.kind) {
                case "scalar":
                    displayVal = <ScalarValue name={val.generator.name} value={tableVal.leaf} />
                    break;
                default:
                    displayVal = <GeneratorValue header={val.generator.name} value={tableVal} setCurrent={setCurrent} />;
                    break;
            }
            break;
        case "entity":
            displayVal = <GeneratorValue value={val} setCurrent={setCurrent} />;
            break;
    }

    const attrDisplayVal = (<Col><Card>
            <Card.Header>{name}</Card.Header>
            <Card.Body>{displayVal}</Card.Body>
            </Card></Col>);

    return attrDisplayVal;
}

const attributeDisplay = _.curry(uncurriedAttributeDisplay);

function EntityValue(props) {
    const vals = props.value.getAll();

    const attributes = Object.keys(vals).map(attributeDisplay(vals, props.setCurrent));

    return <CardGroup><Row>{attributes}</Row></CardGroup>;
}

function Value(props) {
    switch(props.value.kind) {
        case "table":
            return <TableValue {...props} />
        case "entity":
            return <EntityValue {...props} />
        default:
            throw new Error("Unrecognized value kind.");
    }
}

function NotFound() {
    return (<main className="container">
                <h1>Generator Not Found</h1>
                <p>Generator wasn't found for this URL. Generators disappear when the page is refreshed so the generator may have disappeared. Make sure to frequently export generators to save them.</p>
            </main>);
}

export default function Generate(props) {
    const genName = useParams().name;
    const seed = useParams().seed;
    const generator = props.generators[genName];

    if (generator === undefined) {
        return <NotFound />;
    }

    const rootVal = newRoot(seed, generator);

    const [current, setCurrent] = useState(rootVal);

    let goToParentButton = "";

    if (current.parent !== root) {
        goToParentButton = <Button className="mb-2" onClick={() => setCurrent(current.parent)}>Go to parent value</Button>
    }

    return (<main className="container">
            <h1>{current.generator.name}</h1>

            <Alert variant={"info"}>Since you can generate other generators as values, there can be an infinite number of generated values which obviously can't be displayed here. The generator will provide a link to values generated by some other generators.</Alert>

            {goToParentButton}

            <Value value={current} setCurrent={setCurrent}/>
        </main>);
}
