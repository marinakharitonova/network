import {Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import MainApp from "./components/MainApp/MainApp";
import FooterApp from "./components/FooterApp/FooterApp";

function App() {
    return (
        <Layout style={{minHeight: "100vh"}}>
            <HeaderApp/>
            <MainApp/>
            <FooterApp/>
        </Layout>
    );
}

export default App;