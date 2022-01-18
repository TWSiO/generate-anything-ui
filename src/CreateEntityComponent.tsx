import React, { useState, useReducer } from "react";
import { GeneratorRepr } from "generate-anything";
import { emptyGenerator, GeneratorField } from "./Fields";
import { hasDuplicates } from "./util";
import * as _ from "lodash/fp";

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

export default function CreateEntityComponent(props) {

    const [errorMsg, setErrorMsg] = useState("");

    let errorMsgComponent = null;
    if (errorMsg !== "") {
        errorMsgComponent = (<p>{errorMsg}</p>);
    }

    const [name, setName] = useState("");
    
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

    const [attributes, attributesDispatch] = useReducer(reducer, []);

    const submit = (event) => {
        event.preventDefault();

        const getNames = _.map(_.flip(_.get)("name"))
        const hasDuplicateNames = _.compose([hasDuplicates, getNames]);

        if (hasDuplicateNames(attributes)) {
            setErrorMsg("Can't have attributes with the same name.");
        } else if (name !== "" && !(name in Object.keys(props.generators))) {
            const reducer = (accum, val) => {
                accum[val.name] = val.value;
                return accum;
            }

            const objAttr = attributes.reduce(reducer, {});

            // Set the new entity value
            setErrorMsg("");
            const newEntity = GeneratorRepr.createEntity(name, objAttr);
            props.setGenerators({kind: "set", key: name, value: newEntity});
        }
    }

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
        <div className="create-entity">
            <h2>Creating an Entity</h2>
            {errorMsgComponent}
            <form onSubmit={submit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={setEventValue(setName)} />
                    </label>
                </div>

                <ol>
                    {attributeFields}
                </ol>

                <button type="button" onClick={addAttribute}>Add Attribute</button>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
