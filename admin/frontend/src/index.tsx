import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {Spin} from "antd";
import {router} from './routes';
import { store } from './redux/store';

const container = document.getElementById('asl-battle')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider
                router={router}
                fallbackElement={<Spin size="large"/>}
            />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
