import React, { useReducer } from 'react';
import Header from "./Header";
import Home from "./Home";
import CreateGeneratorComponent from "./CreateGeneratorComponent";
import CreateTableComponent from "./CreateTableComponent";
import CreateEntityComponent from "./CreateEntityComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// This would probably be easier with redux. Will probably refactor later.
function keyValueReducer(state, action) {
    switch(action.kind) {
        case "set":
            return { ...state, [action.key]: action.value };
        default:
            throw new Error();
    }
}

export default function App() {
    const [generators, setGenerators] = useReducer(keyValueReducer, {});
    return (
    <div className="app">
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generator/create" element={<CreateGeneratorComponent/>}>
                    <Route path="table" element={
                    <CreateTableComponent generators={generators} setGenerators={setGenerators} />
                    } />
                    <Route path="entity" element={
                    <CreateEntityComponent generators={generators} setGenerators={setGenerators}  />
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
    );
}
