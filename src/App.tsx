import {Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";

function App() {
    return (
        <Layout style={{minHeight: "100vh"}}>
            <HeaderApp/>
            <Main />
            <FooterApp/>
        </Layout>
    );
}

export default App;