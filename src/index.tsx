import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'
import {purple} from '@ant-design/colors';
import {ConfigProvider} from 'antd';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes/routes";
import {store} from "./redux/store";
import {Provider} from "react-redux"

ConfigProvider.config({
    theme: {
        primaryColor: purple[6],
    }
});

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const AppColorContext = React.createContext(purple[6]);

root.render(
    <React.StrictMode>
        <ConfigProvider>
            <Provider store={store}>
                <AppColorContext.Provider value={purple[6]}>
                    <RouterProvider router={router}/>
                </AppColorContext.Provider>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);

reportWebVitals();
