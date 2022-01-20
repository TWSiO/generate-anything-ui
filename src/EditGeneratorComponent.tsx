import { useParams } from "react-router-dom";
import CreateTableComponent from "./CreateTableComponent";
import CreateEntityComponent from "./CreateEntityComponent";

export default function EditGeneratorComponent(props) {
    const initName = useParams().name;

    const gen = props.generators[initName];

    switch(gen.kind) {
        case "table":
            return <CreateTableComponent {...props} />;
        case "entity":
            return <CreateEntityComponent {...props} />;
        default:
            throw new Error("Unrecognized generator kind.");
    }
}
