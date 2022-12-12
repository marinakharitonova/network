import {Outlet} from "react-router-dom";
import {Col, Layout, Row, Card} from 'antd';
import Sidebar from './Sidebar/Sidebar';
import ContentLoader from "../ContentLoader/ContentLoader";
import {useAppSelector} from "../../redux/hooks";

const {Content} = Layout;


const Main = (): JSX.Element => {
    const renderContent = (
        <Card bordered={false} style={{height: '100%'}}>
            <Outlet/>
        </Card>
    )
    const status = useAppSelector(state => state.auth.status)
    return (
        <Layout>
            <div className="container">
                <Row gutter={30} style={{height: '100%'}}>
                    <Col span={4}>
                        <Sidebar/>
                    </Col>
                    <Col span={20}>
                        <Content style={{height: '100%', paddingBottom: '36px'}}>
                            <ContentLoader error={'err'} status={status} renderContent={renderContent}/>
                        </Content>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Main