import React, { useState, useReducer } from "react";
import { GeneratorRepr } from "generate-anything";
import { emptyGenerator, GeneratorField } from "./Fields";
import { hasDuplicates } from "./util";
import { useParams } from "react-router-dom";
import * as _ from "lodash/fp";
import Button from "react-bootstrap/Button";

const setEventValue = (setter) => (event) => setter(event.target.value);

function Attribute(props) {
    return (<li key={props.index}>
                <label>
                    Attribute Name:
                    <input type="text" value={props.name} onChange={setEventValue(props.setName)} />
                </label>

                <GeneratorField
                value={props.value}
                generatorSetter={props.setValue}
                generators={props.generators}
                />
            </li>);
}

const getNames = _.map(_.flip(_.get)("name"))
const hasDuplicateNames = _.compose([hasDuplicates, getNames]);

function uncurriedSubmit(attributes, name, initName, generators, setErrorMsg, setGenerators, event) {
    event.preventDefault();

    if (hasDuplicateNames(attributes)) {
        setErrorMsg("Can't have attributes with the same name");
    } else if (name === "") {
        setErrorMsg("Generator name can't be blank");
    } else {
        const reducer = (accum, val) => {
            accum[val.name] = val.value;
            return accum;
        }

        const objAttr = attributes.reduce(reducer, {});

        let setEntity;
        // Set the new entity value
        if (!(name in generators)) {
            setEntity = GeneratorRepr.createEntity(name, objAttr);
        } else {
            const toModify = generators[name]
            toModify.attributes = objAttr;
            setEntity = toModify
        }
        setGenerators({kind: "set", key: name, value: setEntity});
        setErrorMsg("");
    }
}

const submit = _.curry(uncurriedSubmit);

export default function CreateEntityComponent(props) {

    const [errorMsg, setErrorMsg] = useState("");

    let errorMsgComponent = null;
    if (errorMsg !== "") {
        errorMsgComponent = (<p>{errorMsg}</p>);
    }

    let initAttributes = [];
    let initName = useParams()?.name;

    if (initName !== undefined) {
        const attr = props.generators[initName].attributes
        initAttributes = _.map(key => ({name: key, value: attr[key]}))(_.keys(attr));
    } else {
        initName = "";
    }

    const [name, setName] = useState(initName);
    
    const reducer = (state, action) => {
        switch(action.kind) {
            case "add":
                return [...state, {name: action.name, value: action.value}];
            case "setName":
                const newList = [...state];
                newList[action.index].name = action.name;
                return newList;
            case "setValue":
                const otherNewList = [...state];
                otherNewList[action.index].value = action.value;
                return otherNewList;
            default:
                throw new Error();
        }
    };

    const [attributes, attributesDispatch] = useReducer(reducer, initAttributes);

    const addAttribute = () => {
        attributesDispatch({
        kind: "add",
        name: "",
        value: emptyGenerator,
        });
    }

    const setAttributeName = index => name => attributesDispatch({kind: "setName", index: index, name: name});
    const setValue = index => value => attributesDispatch({kind: "setValue", index: index, value: value});

    const attributeFields = attributes
        .map((attribute, index) =>
            <Attribute
            index={index}
            name={attribute.name}
            value={attribute.value}
            generators={props.generators}
            setValue={setValue(index)}
            setName={setAttributeName(index)}
            />
            );

    return (
        <main className="create-entity container">
            <h2>Creating an Entity</h2>
            {errorMsgComponent}
            <form onSubmit={submit(attributes, name, initName, props.generators, setErrorMsg, props.setGenerators)}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={setEventValue(setName)} />
                    </label>
                </div>

                <ol>
                    {attributeFields}
                </ol>

                <Button onClick={addAttribute}>Add Attribute</Button>

                <Button as="input" type="submit" value="Submit" />
            </form>
        </main>
    );
}
