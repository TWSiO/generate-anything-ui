import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newRoot, root } from "generate-anything";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

// May want to keep track of generator + seed combinations. More a convenience thing I suppose.

export function SetSeed(props) {
    const navigate = useNavigate();
    const genName = useParams().name;

    const [seed, setSeed] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        navigate(`/generator/${genName}/run/${seed}`);
    };

    return (
        <div>
            <h1>Generate</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Seed:

                    <input
                    type="text"
                    value={seed}
                    onChange={event => setSeed(event.target.value)}
                    />

                    <button type="button" onClick={event => setSeed(String(Math.random()))}>Random Seed</button>

                </label>

                <input type="submit" value="Generate" />
            </form>
        </div>
    );
}

function GeneratorValue(props) {
    const handleClick = event => props.setCurrent(props.value);

    return (
        <Card>
            <Card.Header>{props.header}</Card.Header>
            <Card.Body>
                <Card.Text>{props.value.generator.name}</Card.Text>
                <Button type="button" onClick={handleClick}>Go to generator</Button>
            </Card.Body>
        </Card>
    );
}

function TableValue(props) {
    const val = props.value.get();
    let displayVal;

    switch (val.kind) {
        case "scalar":
            displayVal = (<Card bg={"secondary"} text={"light"}>
                        <Card.Header>Value</Card.Header>
                        <Card.Body>
                            <Card.Text>{val.leaf}</Card.Text>
                        </Card.Body>
                    </Card>);
            break;
        default:
            displayVal = <GeneratorValue header={"Value"} value={val} setCurrent={props.setCurrent} />;
    }

    return displayVal;
}

function EntityValue(props) {
    const vals = props.value.getAll();
    const createGenVal = (key, i) => <ListGroup.Item key={i}><GeneratorValue header={key} value={vals[key]} setCurrent={props.setCurrent} /></ListGroup.Item>;
    const attributes = Object.keys(vals).map(createGenVal);

    return <ListGroup>{attributes}</ListGroup>;
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
        goToParentButton = <Button onClick={() => setCurrent(current.parent)}>Go to Parent</Button>
    }

    return (<main className="container">
            <h1>{current.generator.name}</h1>

            {goToParentButton}

            <Value value={current} setCurrent={setCurrent}/>
        </main>);
}
