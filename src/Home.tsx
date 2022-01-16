import React, { useState } from "react";
import { generatorsToJson, jsonToGenerators } from "./util";
import { Link } from "react-router-dom";

function Home(props) {
    const [jsonString, setJsonString] = useState("");
    const [importJson, setImportJson] = useState("");
    
    let jsonElem = "";
    if (jsonString !== "") {
        jsonElem = <code>{jsonString}</code>
    }

    const list = (name, index) => <li key={index}>{name} <Link to={`/generator/run/${name}`}>Generate</Link></li>;

    const handleSubmit = event => {
        event.preventDefault();

        props.setGenerators({
            kind: "import",
            value: jsonToGenerators(importJson),
        });
    };

    return (
    <div>
        <h1>Home</h1>

        <form onSubmit={handleSubmit}>
            <textarea value={importJson} onChange={event => setImportJson(event.target.value)} />
            <input type="submit" value="Import JSON" />
        </form>

        <button type="button" onClick={() => setJsonString(generatorsToJson(props.generators))}>Export Generator set JSON</button>

        {jsonElem}

        <ol>
            {Object.keys(props.generators).map(list)}
        </ol>
    </div>
    );
}

export default Home;
