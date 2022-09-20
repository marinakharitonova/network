import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'
import {purple} from '@ant-design/colors';
import {ConfigProvider} from 'antd';
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
//import routes from "./routes/routes";
import App from "./App";
import {IDialog} from "../models/dialog.module";
import {IMessage} from "../models/message.module";
import {IPost} from "../models/post.model";

//const router = createBrowserRouter(routes);

ConfigProvider.config({
    theme: {
        primaryColor: purple[6],
    }
});

const dialogsData: IDialog[] = [
    {
        id: 1,
        name: 'Dima'
    },
    {
        id: 2,
        name: 'Valera',
    },
    {
        id: 3,
        name: 'Sveta',
    },
]
const messagesData: IMessage[] = [
    {
        id: 1,
        author: {
            avatarSrc: null,
        },
        text: 'blabla'
    },
    {
        id: 2,
        author: {
            avatarSrc: null,
        },
        text: 'Hello'
    },
]
const postsData: IPost[] = [
    {
        id: 1,
        avatarSrc: 'https://avatars.mds.yandex.net/i?id=efb47ec07435b74e8dcf00ba0dba0874-5236416-images-thumbs&n=13&exp=1',
        title: 'Ant Design Title 1',
        description: 'desc1',
        likesCount: 100
    },
    {
        id: 2,
        avatarSrc: null,
        title: 'Ant Design Title 2',
        description: 'desc2',
        likesCount: 3
    },
    {
        id: 3,
        avatarSrc: null,
        title: 'Title 3',
        description: 'Hello, Marina',
        likesCount: 7000
    }
];

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ConfigProvider>
            <BrowserRouter>
                <App dialogsData={dialogsData} messagesData={messagesData} postsData={postsData}/>
            </BrowserRouter>
            {/*<RouterProvider router={router}/>*/}
        </ConfigProvider>
    </React.StrictMode>
);

reportWebVitals();
