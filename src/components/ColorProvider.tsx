import React from 'react';
import {ConfigProvider} from "antd";
import {useAppColor} from "../hooks/useAppColor";

type ColorProviderProps = {
    children: JSX.Element
}

function ColorProvider({children}: ColorProviderProps) {
    const appColor = useAppColor()
    return (
        <ConfigProvider theme={{token: {colorPrimary: appColor}}}>
            {children}
        </ConfigProvider>
    );
}

export default ColorProvider;