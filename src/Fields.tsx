import * as _ from "lodash/fp";
import Form from "react-bootstrap/Form";
import { getObjKey } from "./util";

export const emptyGenerator: unique symbol = Symbol();

export function GeneratorField(props) {

    const options = Object.keys(props.generators)
        .map(key => <option value={key}>{key}</option>);

    const getVal = _.get("target.value")

    const selectGenerator = _.compose([
        props.generatorSetter,
        getObjKey(props.generators),
        getVal
        ]);

    let value;

    if (options.length === 0) {
        return <p>No generators defined. This attribute won't be saved.</p>;
    } else if (props.value === emptyGenerator) {
        
        // Setting it to the first value since that's what dropdown list defaults to.
        const firstKey = Object.keys(props.generators)[0]
        const firstGen = props.generators[firstKey];
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
