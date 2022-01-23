import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditGeneratorComponent from "./EditGeneratorComponent";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function NotFound() {
    return (<main className="container">
                <h1>Generator Not Found</h1>
                <p>Generator wasn't found for this URL. Generators disappear when the page is refreshed so the generator may have disappeared. Make sure to frequently export generators to save them.</p>
            </main>);
}

export default function GeneratorPage(props) {

    const [seed, setSeed] = useState("");

    const initName = useParams().name;
    const navigate = useNavigate();

    const generator = props.generators[initName];
    console.log(generator);

    if (generator === undefined) {
        return <NotFound />;
    }

    const handleRun = event => {
        event.preventDefault();

        navigate(`/generator/run/${initName}/${seed}`);
    };

    return (<main className="container">
        <h1>{generator.name}</h1>

        <h2>Run Generator</h2>

        <Form onSubmit={handleRun}>
            <Form.Group>
                <Form.Label>Seed</Form.Label>

                <InputGroup>
                    <Button onClick={() => setSeed(String(Math.random()))}>Random Seed</Button>
                    <Form.Control
                    type="text"
                    placeholder="seed"
                    value={seed}
                    onChange={event => setSeed(event.target.value)}
                    />


                    <Button as="input" type="submit" value="Run" />
                </InputGroup>
            </Form.Group>
        </Form>

        <h2>Edit</h2>
        <EditGeneratorComponent generators={props.generators} setGenerators={props.setGenerators} />
    </main>);
}
