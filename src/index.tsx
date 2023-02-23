import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes/routes";
import {Provider} from "react-redux";
import {setupStore} from "./features/store";

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <Provider store={setupStore()}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>
);

reportWebVitals();
