import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.variable.min.css';
import reportWebVitals from './reportWebVitals';
import { purple } from '@ant-design/colors';
import {ConfigProvider} from 'antd';


ConfigProvider.config({
    theme: {
        primaryColor: purple[6],
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ConfigProvider>
            <App/>
        </ConfigProvider>
    </React.StrictMode>
);

reportWebVitals();
