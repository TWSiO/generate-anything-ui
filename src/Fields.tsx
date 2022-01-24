import * as _ from "lodash/fp";
import Form from "react-bootstrap/Form";

export const emptyGenerator: unique symbol = Symbol();

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

    if (options.length === 0) {
        return <p>No generators defined. This attribute won't be saved.</p>;
    } else if (props.value === emptyGenerator) {
        // Setting it to the first value since that's what dropdown list defaults to.
        const firstGen = props.generators[Object.keys(props.generators)[0]];
        value = firstGen.name;
        props.generatorSetter(firstGen);
    } else {
        value = props.value.name;
    }

    return <Form.Select value={value} onChange={selectGenerator}>{options}</Form.Select>;
}

export function ValueField(props) {
    const temp = event => {
        props.setValue(event.target.value)
    };

    return <Form.Control type="text" value={props.value} onChange={temp} />;
}
