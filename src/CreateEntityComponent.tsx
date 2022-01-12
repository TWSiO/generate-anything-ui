import React, { useState } from "react";
import { createEntity } from "generate-anything";


// I'll want edit component functionality as well, especially if want to link a generator component to another generator component that isn't created yet.
// I should maybe just have all of the attributes just be field form elements rather than set as text so you can edit it at any time.

export default function CreateEntityComponent(props) {

    const [errorMsg, setErrorMsg] = useState("");

    let errorMsgComponent = null;
    if (errorMsg !== "") {
        errorMsgComponent = (<p>{errorMsg}</p>);
    }
    const [name, setName] = useState("");
    const [attributes, setAttributes] = useState({});

    const [attributeKey, setAttributeKey] = useState("");
    const [attributeValue, setAttributeValue] = useState("");

    const attributeUi = Object.keys(attributes).map(key => 
        (<div>
            <p>Attribute</p>
            <p>Name: {key}</p>
            <p>Gen name: {attributes[key]}</p>
        </div>);
    );

    const submit = (event) => {
        event.preventDefault();

        // Set the new entity value
        if (name !== "" && !(name in Object.keys(props.generators))) {
            const newEntity = createEntity(name, attributes);
            props.setGenerators(name, newEntity);
        }
    }

    const addAttribute = () => {
        if (attributeKey === "") {
            setErrorMsg("Attribute name cannot be blank.");
            return;
        } else if (!(attributeKey in Object.keys(attributes))) {
            setErrorMsg("There's already an attribute with that name.");
            return;
        }

       setErrorMsg("");
       setAttributes({ ...attributes, [attributeKey]: attributeValue});
    }

    const setEventValue = (setter) => (event) => setter(event.target.value);

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

                {attributeUi}
                
                <div>
                    <label>
                        Attribute Name:
                        <input type="text" value={attributeKey} onChange={setEventValue(setAttributeKey)} />
                    </label>
                    
                    <label>
                        Attribute Value:
                        <input type="text" value={attributeValue} onChange={setEventValue(setAttributeValue)} />
                    </label>
                </div>

                <button type="button" onClick={addAttribute}>Add Attribute</button>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
