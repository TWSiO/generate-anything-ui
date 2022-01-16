import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function CreateGeneratorComponent(props) {
    
    return (
    <div>
        <h1>Create generator component</h1>

        <Link to="/generator/create/table">Create New Table</Link>
        <Link to="/generator/create/entity">Create New Entity</Link>

        <Outlet />
    </div>
    );
}
