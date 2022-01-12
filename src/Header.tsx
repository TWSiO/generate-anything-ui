import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
    <header>
        <Link to="/">Home</Link>
        <Link to="/generator/create">Create generator component</Link>
    </header>
    );
}
