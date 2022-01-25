import React, { useReducer, useEffect } from 'react';
import Header from "./Header";
import Home from "./Home";
import CreateGeneratorComponent from "./CreateGeneratorComponent";
import CreateTableComponent from "./CreateTableComponent";
import CreateEntityComponent from "./CreateEntityComponent";
import GeneratorPage from "./GeneratorPage";
import ExamplesPage from "./ExamplesPage";
import About from "./About";
import Generate from "./Generate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as _ from "lodash/fp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// This would probably be easier with redux. Will probably refactor later.
function keyValueReducer(state, action) {
    let reduced;
    switch(action.kind) {
        case "set":
            reduced = { ...state, [action.key]: action.value };
            break;
        case "import":
            reduced = action.value;
            break;
        default:
            throw new Error("Unrecognized generator set action.");
    }

    return reduced;
}

export default function App() {
    const [generators, setGenerators] = useReducer(keyValueReducer, {});

    return (
    <React.Fragment>
        <BrowserRouter>
            <Header />

            <Routes>
                <Route
                path="/"
                element={<Home generators={generators} setGenerators={setGenerators} />}
                />

                <Route path="/about" element={<About />} />
                <Route path="/examples" element={<ExamplesPage />} />

                <Route path="/generator/create" element={<CreateGeneratorComponent />}>

                    <Route path="table" element={
                        <CreateTableComponent generators={generators} setGenerators={setGenerators} />
                    } />

                    <Route path="entity" element={
                        <CreateEntityComponent generators={generators} setGenerators={setGenerators} />
                    } />

                </Route>

                <Route path="/generator/:name/run/:seed" element={<Generate generators={generators} />} />
                <Route path="/generator/:name" element={<GeneratorPage generators={generators} setGenerators={setGenerators} />} />

                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    </React.Fragment>
    );
}
