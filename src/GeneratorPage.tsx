import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditGeneratorComponent from "./EditGeneratorComponent";
import { SetSeed } from "./Generate";
import Alert from "react-bootstrap/Alert";

function NotFound() {
    return (<main className="container">
                <h1>Generator Not Found</h1>
                <p>Generator wasn't found for this URL. Generators disappear when the page is refreshed so the generator may have disappeared. Make sure to frequently export generators to save them.</p>
            </main>);
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

        <Alert variant={"warning"}>If you want to refer back to some generated values, or generate the same values, make sure to save the input seed.</Alert>

        {seedMsg}

        <SetSeed name={initName} setMessage={setSeedMsg} />

        <h2>Edit</h2>
        <EditGeneratorComponent generators={props.generators} setGenerators={props.setGenerators} />
    </main>);
}
