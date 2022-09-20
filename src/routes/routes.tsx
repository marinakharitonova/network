import React from "react";
import App from "../App";
import Profile from "../components/Main/Profile/Profile";
import Dialogs from "../components/Main/Dialogs/Dialogs";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Settings from "../components/Main/Settings/Settings";
import News from "../components/Main/News/News";
import Music from "../components/Main/Music/Music";
import {IPost} from "../../models/post.model";
import {RouteObject} from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        // element: <App/>,
        errorElement: <ErrorPage />,
        // loader: rootLoader,
        children: [
            // {
            //     path: "profile",
            //     element: <Profile posts={}/>,
            // },
            // {
            //     path: "dialogs",
            //     element: <Dialogs dialogs={}/>,
            //     children: [
            //         {
            //             path: ":dialogId",
            //             element: <Dialogs/>,
            //         }
            //     ]
            // },
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