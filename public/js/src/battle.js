import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";


const containers = document.querySelectorAll( '.asl-battle' );

for (let battle of containers) {
    const root = createRoot( document.getElementById( battle.id ) );
    root.render(
        <React.StrictMode>
            <App id={battle.dataset['battle']}/>
        </React.StrictMode>,
    );
}



