import React, { useState } from "react";
import * as _ from "lodash/fp";

const emptyGenerator: unique symbol = Symbol();

// Probably could be reusable
function GeneratorField(props) {

    const options = Object.keys(props.generators)
        .map(key => <option value={key}>{key}</option>);

    const selectGenerator = event => _.compose([
        props.generatorSetter,
        props.generators.find,
        g => g.name === event.target.value
        ]);

    let value;

    if (props.value === emptyGenerator) {
        value = "<Unselected>";
    } else {
        value = props.value.name;
    }

    return <select value={value} onChange={selectGenerator}>{options}</select>;
}

// Display, get value, set value.
// New fields
// String and generator values
function ValueField(props) {
    return <input type="text" value={props.value} onChange={event => props.setValue(event.target.value)} />;
}

export default function CreateTableComponent(props) {
    const setEventValue = (setter) => (event) => setter(event.target.value);

    const [name, setName] = useState("");
    const [values, setValues] = useState([]);
    //const [valueFields, setValueFields] = useState([]);

    // Have generator fields have a null field.
    // May not need valueFields. Only place where potentially want is generator fields null and maybe duplicate values.

    const submit = (event) => {
        // TODO
        // Do validation here. (Could do when adding field, but here is fine and probably easier)
        //
    };

    const setValue = index => value => {
        values[index] = value;
        setValues(values);
    };

    const valueFields = values.map((value, index) => {
        if (typeof value === "string") {
            return <li key={index}><ValueField value={values[index]} setValue={setValue(index)} /></li>
        } else {
            return <li key={index}><GeneratorField value={values[index]} generatorSetter={setValue(index)} generators={props.generators} /></li>
        }
    });

    return (
        <div className="create-table">
            <h2>Creating a table</h2>

            <form onSubmit={submit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={setEventValue(setName)} />
                    </label>
                </div>

                <ol>
                    {valueFields}
                </ol>

                <button type="button" onClick={() => setValues([...values, ""]}>New Value</button>
                <button type="button" onClick={() => setValues([...values, emptyGenerator]}>New Generator Value</button>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
