import React, { useReducer } from 'react';
import Header from "./Header";
import Home from "./Home";
import CreateGeneratorComponent from "./CreateGeneratorComponent";
import CreateTableComponent from "./CreateTableComponent";
import CreateEntityComponent from "./CreateEntityComponent";
import Generate, { SetSeed } from "./Generate";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// This would probably be easier with redux. Will probably refactor later.
function keyValueReducer(state, action) {
    let reduced;
    console.log(action);
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
    <div className="app">
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                path="/"
                element={<Home generators={generators} setGenerators={setGenerators} />}
                />

                <Route path="/generator/create" element={<CreateGeneratorComponent />}>

                    <Route path="table" element={
                        <CreateTableComponent generators={generators} setGenerators={setGenerators} />
                    } />

                    <Route path="entity" element={
                        <CreateEntityComponent generators={generators} setGenerators={setGenerators}  />
                    } />

                </Route>

                <Route path="/generator/run/:name" element={<SetSeed />} />
                <Route path="/generator/run/:name/:seed" element={<Generate generators={generators} />} />

                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    </div>
    );
}
