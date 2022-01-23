import React, { useState } from "react";
import { generatorsToJson, jsonToGenerators, duplicateNames, mergeGeneratorSets } from "./util";
import { LinkContainer } from "react-router-bootstrap";
import * as _ from "lodash/fp";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

function Home(props) {
    const [jsonString, setJsonString] = useState("");
    const [importJson, setImportJson] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    let errorMsgComponent = null;
    if (errorMsg !== "") {
        errorMsgComponent = (<p>{errorMsg}</p>);
    }
    
    let jsonElem = "";
    if (jsonString !== "") {
        jsonElem = (
            <Card bg="Secondary" body>
                <code>{jsonString}</code>
            </Card>
        );
    }

    const list = (name, index) => <LinkContainer to={`/generator/${name}`}><ListGroup.Item action key={index}>{name}</ListGroup.Item></LinkContainer>;

    const handleSubmit = event => {
        event.preventDefault();
        
        const merged = mergeGeneratorSets(props.generators, jsonToGenerators(importJson));

        if (merged === duplicateNames) {
            setErrorMsg("Imported JSON has a generator with the same name as an existing generator.");
        } else {
            setErrorMsg("");
            props.setGenerators({
                kind: "import",
                value: merged,
            });
            setImportJson("");
        }
    };

    return (<main className="container">
        <p>Info about the site</p>

        <h2>Import Generators</h2>

        <form onSubmit={handleSubmit}>
            <textarea value={importJson} onChange={event => setImportJson(event.target.value)} />
            {errorMsgComponent}
            <div>
                <Button as="input" type="submit" value="Merge imported JSON" />
            </div>
        </form>

        <h2>Export Generators as JSON</h2>

        <Row>
            <Col xs={4}>
                <Button variant="primary" id="export-button" onClick={() => setJsonString(generatorsToJson(props.generators))}>Export Generator set JSON</Button>
            </Col>
        </Row>

        <Row>
            <Col>
                {jsonElem}
            </Col>
        </Row>

        <h2>Generators</h2>

        <ListGroup>
            {Object.keys(props.generators).map(list)}
        </ListGroup>

    </main>);
}

export default Home;
