import React, { useState } from "react";
import { duplicateNames, mergeGeneratorSets } from "./util";
import { generatorsToJson, jsonToGenerators } from "./GeneratorJson";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { passEventValue } from "./util";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

function Home(props) {
    const [jsonString, setJsonString] = useState("");
    const [importJson, setImportJson] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    let errorMsgComponent = null;
    if (errorMsg !== "") {
        errorMsgComponent = (<Alert variant={"danger"}>{errorMsg}</Alert>);
    }
    
    let jsonElem = "";
    if (jsonString !== "") {
        jsonElem = (
            <Card body>
                <code>{jsonString}</code>
            </Card>
        );
    }

    const list = (name, index) => <LinkContainer to={`/generator/${name}`} key={index}><ListGroup.Item action>{name}</ListGroup.Item></LinkContainer>;

    const handleSubmit = event => {
        event.preventDefault();

        let merged;
        
        try {
            merged = mergeGeneratorSets(props.generators, jsonToGenerators(importJson));
        } catch (e) {
            setErrorMsg("Invalid generator JSON");
            return;
        }

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

    const handleExportClick = () => {
        try {
            setJsonString(generatorsToJson(props.generators));
        } catch (e) {
            setErrorMsg("Issue exporting generators.");
        }
    };

    return (<main className="container">
        <h1>Welcome!</h1>

        <p className="mt-2">This site provides the ability to create generators which generate random values which can also reference other randomly generated values. This means you can randomly generate an infinite amount of related values which can be useful for use in things like Dungeons & Dragons and other Tabletop Roleplaying Games. Visit the <Link to="/about">about page</Link> for more information.</p>


        <Alert variant={"danger"}>If you close or refresh the page, all the current generators and everything will be lost. Make sure to copy and save the exported JSON of any generators you want to save as well as any seeds you want to save.</Alert>

        <h2>Import Generators</h2>

        <form onSubmit={handleSubmit}>
            <textarea className="mb-2" value={importJson} onChange={passEventValue(setImportJson)} />
            {errorMsgComponent}
            <div>
                <Button as="input" type="submit" value="Merge imported JSON" />
            </div>
        </form>

        <h2>Export Generators as JSON</h2>

        <Row>
            <Col xs={4}>
                <Button variant="primary" onClick={handleExportClick}>Export Generator set JSON</Button>
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
