import React, { useState, useReducer } from "react";
import * as _ from "lodash/fp";
import { GeneratorRepr } from "generate-anything";
import { emptyGenerator, GeneratorField, ValueField } from "./Fields";

export default function CreateTableComponent(props) {
    const setEventValue = (setter) => (event) => setter(event.target.value);

    const [name, setName] = useState("");
    const [tableError, setTableError] = useState("");
    // TODO Add state for individual field messages

    const reducer = (state, action) => {
        switch(action.kind) {
            case "add":
                return [...state, action.value];

            case "set":
                const newList = [...state];
                newList[action.index] = action.value;
                return newList;
            default:
                throw new Error();
        }
    };
    const [values, valuesDispatch] = useReducer(reducer, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation
        // TODO Check and make sure there's at least one value in the table as well.
        if (values.includes(emptyGenerator))) {
            setTableError("Can't have an empty generator field.");
        } else {
            setTableError("");
        }

        const newTable: GeneratorRepr.TableGeneratorRepr = GeneratorRepr.createTable(name, values);
        props.setGenerators({kind: "set", key: name, value: newTable});
    };

    const setValue = index => value => {
        values[index] = value;
        valuesDispatch({kind: "set", index: index, value: value});
    };

    const valueFields = values.map((value, index) => {
        if (typeof value === "string") {
            return <li key={index}><ValueField value={value} setValue={setValue(index)} /></li>
        } else {
            return <li key={index}><GeneratorField value={value} generatorSetter={setValue(index)} generators={props.generators} /></li>
        }
    });

    return (
        <div className="create-table">
            <h2>Creating a table</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={setEventValue(setName)} />
                    </label>
                </div>

                <ol>
                    {valueFields}
                </ol>

                <button type="button" onClick={() => valuesDispatch({kind: "add", value: ""})}>New Value</button>
                <button type="button" onClick={() => valuesDispatch({kind: "add", value: emptyGenerator})}>New Generator Value</button>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
