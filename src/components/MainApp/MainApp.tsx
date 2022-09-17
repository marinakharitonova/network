import React, {FC} from 'react';
import { Outlet } from "react-router-dom";
import {Col, Layout, Row} from 'antd';
import SiderApp from '../SiderApp/SiderApp';

const {Content} = Layout;

const MainApp: FC = () => {
    return (
        <Layout>
            <div className="container">
                <Row gutter={30}>
                    <Col span={4}>
                        <SiderApp></SiderApp>
                    </Col>
                    <Col span={20}>
                        <Content style={{paddingBottom: '36px'}}>
                            <Outlet />
                        </Content>
                    </Col>
                </Row>
            </div>
        </Layout>
    )

}

export default MainApp