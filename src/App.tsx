import {Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import MainApp from "./components/MainApp/MainApp";
import FooterApp from "./components/FooterApp/FooterApp";
import {GlobalStyle} from "./styles/global";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Layout style={{minHeight: "100vh"}}>
                <HeaderApp/>
                <MainApp/>
                <FooterApp/>
            </Layout>
        </ThemeProvider>
    );
}

export default App;