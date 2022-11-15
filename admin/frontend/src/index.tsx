import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {Spin} from "antd";
import {router} from './routes';
import {store} from './redux/store';

const container = document.getElementById('asl-battle')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <RouterProvider
            router={router}
            fallbackElement={<Spin size="large"/>}
        />
    </Provider>
);
