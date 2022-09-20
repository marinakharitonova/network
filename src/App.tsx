import {Layout} from 'antd';
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Main from "./components/Main/Main";
import FooterApp from "./components/FooterApp/FooterApp";
import {getData} from "./getData";
import {useLoaderData} from "react-router-dom";
import {IDialog} from "../models/dialog.module";
import {IMessage} from "../models/message.module";
import {IPost} from "../models/post.model";

// export async function loader() {
//     const data = await getData();
//     return data;
// }
type loadedData = {
    dialogsData: IDialog[],
    messagesData: IMessage[],
    postsData: IPost[]
}

function App({dialogsData, messagesData, postsData}: loadedData) {
    //const { dialogsData, messagesData, postsData } = useLoaderData() as loadedData;
    return (
        <Layout style={{minHeight: "100vh"}}>
            <HeaderApp/>
            <Main dialogs={dialogsData} messages={messagesData} posts={postsData}/>
            <FooterApp/>
        </Layout>
    );
}

export default App;