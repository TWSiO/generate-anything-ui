import React from "react";
import Card from "react-bootstrap/Card";

export default function ExamplesPage() {
    return (<main className="container">
        <h1>Examples</h1>
        <p>Some examples, given as JSON that can be imported, are provided here.</p>


        <Card>
            <Card.Header>Generate a person with a random name.</Card.Header>
            <Card.Body>
                <code>{`{"First Name":{"kind":"table","name":"First Name","table":["John","Jacob","Jinglemeyer"]},"Last Name":{"kind":"table","name":"Last Name","table":["Smith","Doe","Wilson"]},"Person":{"kind":"entity","name":"Person","attributes":{"First":{"kind":"reference","name":"First Name"},"Last":{"kind":"reference","name":"Last Name"}}}}`}</code>
            </Card.Body>
        </Card>
    </main>);
}
