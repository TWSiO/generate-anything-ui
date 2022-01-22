import React, { useState } from "react";
import { generatorsToJson, jsonToGenerators, duplicateNames, mergeGeneratorSets } from "./util";
import { Link } from "react-router-dom";
import * as _ from "lodash/fp";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        jsonElem = <code>{jsonString}</code>
    }

    const list = (name, index) => <li key={index}>
        {name} <Link to={`/generator/edit/${name}`}>Edit</Link> <Link to={`/generator/run/${name}`}>Generate</Link>
        </li>;

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
                <input type="submit" value="Merge imported JSON" />
            </div>
        </form>

        <h2>Export Generators as JSON</h2>

        <Button variant="primary" onClick={() => setJsonString(generatorsToJson(props.generators))}>Export Generator set JSON</Button>

        <h2>Generators</h2>

        {jsonElem}

        <ol>
            {Object.keys(props.generators).map(list)}
        </ol>

    </main>);
}

export default Home;
