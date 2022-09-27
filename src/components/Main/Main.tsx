import {Outlet} from "react-router-dom";
import {Col, Layout, Row, Card} from 'antd';
import Sidebar from './Sidebar/Sidebar';

const {Content} = Layout;


const Main = (): JSX.Element => {
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
                                <Outlet />
                            </Card>
                        </Content>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Main