import React from 'react';
import 'antd/dist/antd.css';
import {Container} from '../../styles/components';
import {Col, Layout, Row} from 'antd';
import SiderApp from '../SiderApp/SiderApp';
import Profile from '../Profile/Profile';

const {Content} = Layout;

const MainApp: React.FC = () => {
    return (
        <Layout>
            <Container>
                <Row gutter={30}>
                    <Col span={4}>
                        <SiderApp></SiderApp>
                    </Col>
                    <Col span={20}>
                        <Content style={{paddingBottom: '36px'}}>
                            <Profile></Profile>
                        </Content>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}

export default MainApp