import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function CreateGeneratorComponent(props) {
/*
    const neither = Symbol();

    // Could just hold entire generator.
    const [currentGenerator, setCurrentGenerator] = useState(neither);

    let genReactComponent = null;
    if (currentGenerator === neither) {
        genReactComponent = null;
    } else if (currentGenerator.kind === "entity") {
        genReactComponent = <CreateEntityComponent currentGenerator={currentGenerator} />;
    }
    */
    
    return (
    <div>
        <h1>Create generator component</h1>

        <Link to="/generator/create/table">Create New Table</Link>
        <Link to="/generator/create/entity">Create New Entity</Link>

        <Outlet />
    </div>
    );
}
