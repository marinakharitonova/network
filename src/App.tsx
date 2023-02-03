import {ConfigProvider, Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";
import React, {useEffect} from "react";
import {useLocalStorage} from "./hooks/useLocalStorage";
import ErrorNotification from "./components/ErrorNotification/ErrorNotification";
import {fetchAuthorization} from "./redux/features/authSlice";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {defaultColor, ColorContext} from "./context/theme-context";

const App = (): JSX.Element => {
    const [color, setColor] = useLocalStorage<string>("appColor", defaultColor);
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.auth.status)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAuthorization())
        }
    }, [status])


    return (
        <ConfigProvider theme={{token: {colorPrimary: color}}}>
            <ColorContext.Provider value={{color, setColor}}>
                <Layout style={{minHeight: "100vh"}}>
                    <ErrorNotification/>
                    <HeaderApp/>
                    <Main/>
                    <FooterApp/>
                </Layout>
            </ColorContext.Provider>
        </ConfigProvider>
    );
}

export default App;