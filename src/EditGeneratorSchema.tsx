import React from "react";
import { useParams } from "react-router-dom";
import { EditTableSchema } from "./TableForm";
import { EditEntitySchema } from "./EntityForm";

export default function EditGeneratorSchema(props) {
    const initName = useParams().name;

    const gen = props.generators[initName];

    switch(gen.kind) {
        case "table":
            return <EditTableSchema {...props} />;
        case "entity":
            return <EditEntitySchema {...props} />;
        default:
            throw new Error("Unrecognized generator kind.");
    }
}
