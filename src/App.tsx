import {ConfigProvider, Layout, message} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";
import React from "react";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {ColorContext, defaultColor} from "./context/theme-context";
import {useAuthQuery} from "./redux/features/api/apiSlice";
import {MessageApiContext} from "./context/messageApi-context";

const App = (): JSX.Element => {
    const [color, setColor] = useLocalStorage<string>("appColor", defaultColor);

    const [api, contextHolder] = message.useMessage();

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useAuthQuery()

    return (
        <ConfigProvider theme={{token: {colorPrimary: color}}}>
            <ColorContext.Provider value={{color, setColor}}>
                <MessageApiContext.Provider value={api}>
                    <Layout style={{minHeight: "100vh"}}>
                        {contextHolder}
                        <HeaderApp isLoading={isLoading} isSuccess={isSuccess}/>
                        <Main isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error}/>
                        <FooterApp/>
                    </Layout>
                </MessageApiContext.Provider>
            </ColorContext.Provider>
        </ConfigProvider>
    );
}

export default App;