import {Outlet, Routes, Route} from "react-router-dom";
import {Col, Layout, Row, Card} from 'antd';
import Sidebar from './Sidebar/Sidebar';
import {IDialog} from "../../../models/dialog.module";
import {IMessage} from "../../../models/message.module";
import {IPost} from "../../../models/post.model";
import Profile from "./Profile/Profile";
import Dialogs from "./Dialogs/Dialogs";

const {Content} = Layout;

type MainProps = {
    dialogs: IDialog[],
    messages: IMessage[],
    posts: IPost[]
}

const Main = ({dialogs, messages, posts}: MainProps): JSX.Element => {
    return (
        <Layout>
            <div className="container">
                <Row gutter={30} style={{height: '100%'}}>
                    <Col span={4}>
                        <Sidebar/>
                    </Col>
                    <Col span={20}>
                        <Content style={{height: '100%', paddingBottom: '36px'}}>
                            <Card bordered={false} style={{height: '100%'}}>
                                <Routes>
                                    <Route path="profile" element={<Profile posts={posts}/>}/>
                                    <Route path="dialogs/*" element={<Dialogs dialogs={dialogs} messages={messages}/>}/>
                                </Routes>
                            </Card>
                        </Content>
                    </Col>
                </Row>
            </div>
        </Layout>
    )

}

export default Main