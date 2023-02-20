import {ConfigProvider, Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";
import React from "react";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {ColorContext, defaultColor} from "./context/theme-context";
import {useAuthQuery} from "./redux/features/api/apiSlice";

const App = (): JSX.Element => {
    const [color, setColor] = useLocalStorage<string>("appColor", defaultColor);

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useAuthQuery()

    return (
        <ConfigProvider theme={{token: {colorPrimary: color}}}>
            <ColorContext.Provider value={{color, setColor}}>
                <Layout style={{minHeight: "100vh"}}>
                    <HeaderApp isLoading={isLoading} isSuccess={isSuccess}/>
                    <Main isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error}/>
                    <FooterApp/>
                </Layout>
            </ColorContext.Provider>
        </ConfigProvider>
    );
}

export default App;