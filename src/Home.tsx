import React, { useState } from "react";
import { generatorsToJson } from "./util";

function Home(props) {
    const [jsonString, setJsonString] = useState("");
    const [importJson, setImportJson] = useState("");
    
    let jsonElem = "";
    if (jsonString !== "") {
        console.log(jsonString);
        jsonElem = <code>{jsonString}</code>
    }

    const list = (name, index) => <li key={index}>{name}</li>;

    const handleSubmit = event => props.setGenerators(JSON.parse(importJson));

    return (
    <div>
        <h1>Home</h1>
        <ol>
            {Object.keys(props.generators).map(list)}
        </ol>

        <form onSubmit={handleSubmit}>
            <textarea value={importJson} onChange={event => setImportJson(event.target.value)} />
            <input type="submit" value="Import JSON" />
        </form>

        <button type="button" onClick={() => setJsonString(generatorsToJson(props.generators))}>Export Generator set JSON</button>

        {jsonElem}
    </div>
    );
}

export default Home;
