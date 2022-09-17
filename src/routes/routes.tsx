import React from "react";
import App from "../App";
import Profile from "../components/Profile/Profile";
import Dialogs from "../components/Dialogs/Dialogs";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Settings from "../components/Settings/Settings";
import News from "../components/News/News";
import Music from "../components/Music/Music";

const Routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Profile/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            },
            {
                path: "/dialogs",
                element: <Dialogs/>,
            },
            {
                path: "/news",
                element: <News/>,
            },
            {
                path: "/music",
                element: <Music/>,
            },
            {
                path: "/settings",
                element: <Settings/>,
            },
        ],
    },

];

export default Routes;