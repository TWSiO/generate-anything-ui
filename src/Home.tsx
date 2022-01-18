import React, { useState } from "react";
import { generatorsToJson, jsonToGenerators, duplicateNames, mergeGeneratorSets } from "./util";
import { Link } from "react-router-dom";
import * as _ from "lodash/fp";

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

    const list = (name, index) => <li key={index}>{name} <Link to={`/generator/run/${name}`}>Generate</Link></li>;

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
        }
    };

    return (
    <div>
        <h1>Generate Anything</h1>

        <form onSubmit={handleSubmit}>
            <textarea value={importJson} onChange={event => setImportJson(event.target.value)} />
            {errorMsgComponent}
            <input type="submit" value="Merge imported JSON" />
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
