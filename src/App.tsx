import {ConfigProvider, Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";
import React, {useState} from "react";
import {purple} from "@ant-design/colors";
import {useLocalStorage} from "./hooks/useLocalStorage";

export const defaultColor = purple[8];

ConfigProvider.config({
    theme: {
        primaryColor: defaultColor,
    }
});

interface ColorContextInterface {
    color: string;
    changeColor: (col: string) => void
}

export const ColorContext = React.createContext<ColorContextInterface | null>(null);

const App = (): JSX.Element => {
    const [appColor, setAppColor] = useLocalStorage<string>("appColor", defaultColor);

    const colorContextValue: ColorContextInterface = {
        color: appColor,
        changeColor: (color: string) => {
            setAppColor(color)
        }
    };

    return (
        <ConfigProvider>
            <ColorContext.Provider value={colorContextValue}>
                <Layout style={{minHeight: "100vh"}}>
                    <HeaderApp/>
                    <Main/>
                    <FooterApp/>
                </Layout>
            </ColorContext.Provider>
        </ConfigProvider>
    );
}

export default App;