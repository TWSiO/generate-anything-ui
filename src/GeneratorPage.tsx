import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NotFound, passEventValue } from "./util";
import EditGeneratorSchema from "./EditGeneratorSchema";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

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

export default function GeneratorPage(props) {
    const [seedMsg, setSeedMsg] = useState(null);

    const initName = useParams().name;

    const generator = props.generators[initName];

    if (generator === undefined) {
        return <NotFound />;
    }

    return (<main className="container">
        <h1>{generator.name}</h1>

        <h2>Run Generator</h2>

        <Alert variant={"warning"}>If you want to regenerate the same values later, make sure to save the input seed.</Alert>

        {seedMsg}

        <SetSeed name={initName} setMessage={setSeedMsg} />

        <h2>Edit</h2>
        <EditGeneratorSchema generators={props.generators} setGenerators={props.setGenerators} />
    </main>);
}
