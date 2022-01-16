import React from "react";

function Home(props) {
    const list = (name, index) => <li key={index}>{name}</li>;

    return (
    <div>
        <h1>Home</h1>
        <ol>
            {Object.keys(props.generators).map(list)}
        </ol>
    </div>
    );
}

export default Home;
