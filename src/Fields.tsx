import * as _ from "lodash/fp";
import Form from "react-bootstrap/Form";
import { passEventValue } from "./util";

export const emptyGenerator: unique symbol = Symbol();

/**
 * Creates a select field for selecting from a list of generators.
 */
export function GeneratorField(props) {

    const selectGenerator = genName => {
        const gen = props.generators[genName];
        props.generatorSetter(gen);
    }

    let value;

    const options = Object.keys(props.generators)
        .map(key => <option value={key}>{key}</option>);

    if (options.length === 0) {
        return <p>No generators currently defined. This attribute won't be saved.</p>;
    } else if (props.value === emptyGenerator) {
        
        // Setting it to the first value since that's what dropdown list defaults to.
        const firstKey = Object.keys(props.generators)[0]
        const firstGen = props.generators[firstKey];
        value = firstGen.name;
        props.generatorSetter(firstGen);
    } else {
        value = props.value.name;
    }

    return <Form.Select value={value} onChange={passEventValue(selectGenerator)}>{options}</Form.Select>;
}

/**
 * Creates a text field to enter scalar values.
 */
export function ValueField(props) {
    return <Form.Control type="text" value={props.value} onChange={passEventValue(props.setValue)} />;
}
