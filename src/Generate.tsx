import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newRoot, root } from "generate-anything";

// May want to keep track of generator + seed combinations. More a convenience thing I suppose.

export function SetSeed(props) {
    const navigate = useNavigate();
    const genName = useParams().name;

    const [seed, setSeed] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        navigate(`/generator/run/${genName}/${seed}`);
    };

    return (
        <div>
            <h1>Generate</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Seed:

                    <input
                    type="text"
                    value={seed}
                    onChange={event => setSeed(event.target.value)}
                    />

                    <button type="button" onClick={event => setSeed(String(Math.random()))}>Random Seed</button>

                </label>

                <input type="submit" value="Generate" />
            </form>
        </div>
    );
}

function GeneratorValue(props) {
    const handleClick = event => props.setCurrent(props.value);

    console.log(handleClick);
    return (
        <span>
         {props.value.generator.name}
         <button type="button" onClick={handleClick}>Go to generator</button>
        </span>
    );
}

function Value(props) {
    switch(props.value.kind) {
        case "table":
            const val = props.value.get();
            let displayVal;

            console.log(val);
            switch (val.kind) {
                case "scalar":
                    displayVal = val.leaf;
                    break;
                default:
                    console.log("Table");
                    displayVal = <GeneratorValue value={val} setCurrent={props.setCurrent} />
            }

            console.log(val);
            console.log(displayVal);
            return (
                <div>
                    <h3>Table</h3>
                    <div>Value: {displayVal}</div>
                </div>
            );
        case "entity":
            const vals = props.value.getAll();
            const i = 0;
            let attributes = [];

            console.log("Entity");
            for (const key in vals) {
                attributes.push(<li key={i}>{key}: <GeneratorValue value={vals[key]} setCurrent={props.setCurrent} /></li>);
                i++;
            }

            return (
                <div>
                    <h3>Entity</h3>
                    <ol>{attributes}</ol>
                </div>
            );

        default:
            throw new Error("Unrecognized value kind.");
    }
}

export default function Generate(props) {
    const genName = useParams().name;
    const seed = useParams().seed;
    const generator = props.generators[genName];

    const rootVal = newRoot(seed, generator);

    const [current, setCurrent] = useState(rootVal);

    let goToParentButton = "";

    console.log(current.parent);
    console.log(root);
    if (current.parent !== root) {
        console.log("Putting parent");
        goToParentButton = <button type="button" onClick={() => setCurrent(current.parent)}>Go to Parent</button>
    }

    return (
        <div>
            <h1>Value Tree</h1>
            <h2>{current.generator.name}</h2>

            {goToParentButton}

            <Value value={current} setCurrent={setCurrent}/>
        </div>
    );
}
