import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'
import {purple} from '@ant-design/colors';
import {ConfigProvider} from 'antd';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes/routes";
import {store} from "./redux/state";

ConfigProvider.config({
    theme: {
        primaryColor: purple[6],
    }
});

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function rerenderTree(){
    root.render(
        <React.StrictMode>
            <ConfigProvider>
                <RouterProvider router={router}/>
            </ConfigProvider>
        </React.StrictMode>
    );
}

rerenderTree();

store.subscribe(rerenderTree)

reportWebVitals();
