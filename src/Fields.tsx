import * as _ from "lodash/fp";

export const emptyGenerator: unique symbol = Symbol();

// Probably could be reusable
export function GeneratorField(props) {

    const options = Object.keys(props.generators)
        .map(key => <option value={key}>{key}</option>);

/*
    const selectGenerator = _.compose([
        props.generatorSetter,
        _.get(props.generators),
        _.flip(_.get("target.value"))
        ]);
        */

    // I want to make this the nice composed version, but need to debug with longer version first.
    const selectGenerator = event => props.generatorSetter(props.generators[event.target.value]);

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
export function ValueField(props) {
    const temp = event => {
        props.setValue(event.target.value)
    };
    return <input type="text" value={props.value} onChange={temp} />;
}
