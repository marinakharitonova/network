import {ConfigProvider, Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";
import React, {useEffect} from "react";
import {purple} from "@ant-design/colors";
import {useLocalStorage} from "./hooks/useLocalStorage";
import ErrorNotification from "./components/ErrorNotification/ErrorNotification";
import {fetchAuthorization} from "./redux/features/authSlice";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import ContentLoader from "./components/ContentLoader/ContentLoader";

export const defaultColor = purple[8];

interface ColorContextInterface {
    color: string;
    changeColor: (col: string) => void
}

export const ColorContext = React.createContext<ColorContextInterface | null>(null);

const App = (): JSX.Element => {
    const [appColor, setAppColor] = useLocalStorage<string>("appColor", defaultColor);
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.auth.status)

    const colorContextValue: ColorContextInterface = {
        color: appColor,
        changeColor: (color: string) => {
            setAppColor(color);
        }
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAuthorization())
        }
    }, [status, dispatch])


    return (
        <ConfigProvider theme={{token: {colorPrimary: appColor}}}>
            <ColorContext.Provider value={colorContextValue}>
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