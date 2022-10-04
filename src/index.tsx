import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'
import {purple} from '@ant-design/colors';
import {ConfigProvider} from 'antd';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes/routes";

const router = createBrowserRouter(routes);

ConfigProvider.config({
    theme: {
        primaryColor: purple[6],
    }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ConfigProvider>
            <RouterProvider router={router}/>
        </ConfigProvider>
    </React.StrictMode>
);

reportWebVitals();
