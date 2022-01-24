import { useParams } from "react-router-dom";
import { EditTableComponent } from "./CreateTableComponent";
import { EditEntityComponent } from "./CreateEntityComponent";

export default function EditGeneratorComponent(props) {
    const initName = useParams().name;

    const gen = props.generators[initName];

    switch(gen.kind) {
        case "table":
            return <EditTableComponent {...props} />;
        case "entity":
            return <EditEntityComponent {...props} />;
        default:
            throw new Error("Unrecognized generator kind.");
    }
}
