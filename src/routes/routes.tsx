import React from "react";
import App from "../App";
import Profile from "../components/Main/Profile/Profile";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Settings from "../components/Main/Settings/Settings";
import {Navigate, RouteObject} from "react-router-dom";
import Login from "../components/Main/Login/Login";

const News = React.lazy(() => import('../components/Main/News/News'));
const Users = React.lazy(() => import('../components/Main/Users/Users'));
const Chat = React.lazy(() => import('../components/Main/Chat/Chat'));

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Navigate to='/profile'/>,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "profile",
                element: <Profile/>,
                children: [
                    {
                        path: ":userId",
                        element: <Profile/>,
                    }
                ]
            },
            {
                path: "chat",
                element: <Chat/>,
            },
            {
                path: "users",
                element: <Users/>,
            },
            {
                path: "news",
                element: <News/>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
        ],
    },

];

export default routes;