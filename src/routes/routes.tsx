import React from "react";
import App from "../App";
import Profile from "../components/Main/Profile/Profile";
import Dialogs from "../components/Main/Dialogs/Dialogs";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Settings from "../components/Main/Settings/Settings";
import News from "../components/Main/News/News";
import Music from "../components/Main/Music/Music";
import Friends from "../components/Main/Friends/Friends";
import {RouteObject} from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "profile",
                element: <Profile/>,
            },
            {
                path: "dialogs",
                element: <Dialogs/>,
                children: [
                    {
                        path: ":dialogId",
                        element: <Dialogs/>,
                    }
                ]
            },
            {
                path: "friends",
                element: <Friends/>,
            },
            {
                path: "news",
                element: <News/>,
            },
            {
                path: "music",
                element: <Music/>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
        ],
    },

];

export default routes;