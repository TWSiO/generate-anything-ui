import React from "react";
import { useParams } from "react-router-dom";
import EditGeneratorComponent from "./EditGeneratorComponent";
import { SetSeed } from "./Generate";

function NotFound() {
    return (<main className="container">
                <h1>Generator Not Found</h1>
                <p>Generator wasn't found for this URL. Generators disappear when the page is refreshed so the generator may have disappeared. Make sure to frequently export generators to save them.</p>
            </main>);
}

export default function GeneratorPage(props) {
    const initName = useParams().name;

    const generator = props.generators[initName];

    if (generator === undefined) {
        return <NotFound />;
    }

    return (<main className="container">
        <h1>{generator.name}</h1>

        <h2>Run Generator</h2>

        <p>Probably note to save seed here.</p>

        <SetSeed name={initName} />

        <h2>Edit</h2>
        <EditGeneratorComponent generators={props.generators} setGenerators={props.setGenerators} />
    </main>);
}
