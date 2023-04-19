import {Layout, message} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";
import React from "react";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {useAuthQuery} from "./features/api/apiSlice";
import {MessageApiContext} from "./context/messageApi-context";
import {ColorsContext} from "./context/ColorsContext";
import ColorProvider from "./components/ColorProvider";

const App = (): JSX.Element => {
    const [colors, setColors] = useLocalStorage<{ userId: number, color: string }[]>("network-color", []);

    const [api, contextHolder] = message.useMessage();

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useAuthQuery()

    return (
        <ColorsContext.Provider value={{colors, setColors}}>
            <ColorProvider>
                <MessageApiContext.Provider value={api}>
                    <Layout style={{minHeight: "100vh"}}>
                        {contextHolder}
                        <HeaderApp isLoading={isLoading} isSuccess={isSuccess}/>
                        <Main isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error}/>
                        <FooterApp/>
                    </Layout>
                </MessageApiContext.Provider>
            </ColorProvider>
        </ColorsContext.Provider>
    );
}

export default App;