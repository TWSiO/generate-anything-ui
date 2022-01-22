import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditGeneratorComponent from "./EditGeneratorComponent";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function GeneratorPage(props) {

    const [seed, setSeed] = useState("");

    const initName = useParams().name;
    const navigate = useNavigate();

    console.log(initName);
    const generator = props.generators[initName];
    console.log(generator);

    const handleRun = event => {
        event.preventDefault();

        navigate(`/generator/run/${initName}/${seed}`);
    };

    return (<main className="container">
        <h1>{generator.name}</h1>

        <h2>Run Generator</h2>

        <form onSubmit={handleRun}>
            <label>
                Seed:

                <input
                type="text"
                value={seed}
                onChange={event => setSeed(event.target.value)}
                />

                <Button onClick={() => setSeed(String(Math.random()))}>Random Seed</Button>

            </label>

            <Row>
                <Col>
                    <Button as="input" type="submit" value="Run" />
                </Col>
            </Row>
        </form>

        <h2>Edit</h2>
        <EditGeneratorComponent generators={props.generators} setGenerators={props.setGenerators} />
    </main>);
}
