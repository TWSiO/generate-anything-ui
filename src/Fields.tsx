
export const emptyGenerator: unique symbol = Symbol();

// Probably could be reusable
export function GeneratorField(props) {
    console.log(props.generators);

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
export function ValueField(props) {
    const temp = event => {
        props.setValue(event.target.value)
    };
    return <input type="text" value={props.value} onChange={temp} />;
}
