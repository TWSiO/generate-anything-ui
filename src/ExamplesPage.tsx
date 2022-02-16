import React from "react";
import Card from "react-bootstrap/Card";

export default function ExamplesPage() {
    return (<main className="container">
        <h1>Examples</h1>
        <p>Some examples, given as JSON that can be imported, are provided here.</p>

        <Card>
            <Card.Header>A table that generates random musical instruments.</Card.Header>
            <Card.Body>
                <code>{`{"Musical Instrument":{"kind":"table","name":"Musical Instrument","table":["Lute","Horn","Drum","Hurdy-gurdy"]}}`}</code>
            </Card.Body>
        </Card>

        <Card>
            <Card.Header>The musical instrument generator and a tool generator which can include musical instruments using the other generator.</Card.Header>
            <Card.Body>
                <code>{`{"Musical Instrument":{"kind":"table","name":"Musical Instrument","table":["Lute","Horn","Drum","Hurdy-gurdy"]},"Tools":{"kind":"table","name":"Tools","table":["Saw","Hammer","Brush",{"kind":"reference","name":"Musical Instrument"}]}}`}</code>
            </Card.Body>
        </Card>

        <Card>
            <Card.Header>A first and last name generator and a generator which generates a person with first and last names.</Card.Header>
            <Card.Body>
                <code>{`{"First Name":{"kind":"table","name":"First Name","table":["John","Jacob","Jinglemeyer"]},"Last Name":{"kind":"table","name":"Last Name","table":["Smith","Doe","Wilson"]},"Person":{"kind":"entity","name":"Person","attributes":{"First":{"kind":"reference","name":"First Name"},"Last":{"kind":"reference","name":"Last Name"}}}}`}</code>
            </Card.Body>
        </Card>
    </main>);
}
