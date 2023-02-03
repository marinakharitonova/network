import {Outlet} from "react-router-dom";
import {Col, Layout, Row, Card} from 'antd';
import Sidebar from './Sidebar/Sidebar';
import ContentLoader from "../ContentLoader/ContentLoader";
import {useAppSelector} from "../../redux/hooks";
import {selectAuthorizationStatus} from "../../redux/features/authSlice";
import {useOnlineStatus} from "../../hooks/useOnlineStatus";

const {Content} = Layout;


const Main = (): JSX.Element => {
    const status = useAppSelector(selectAuthorizationStatus)
    const isOnline = useOnlineStatus()
    return (
        <Layout>
            <div className="container">
                <Row gutter={30} style={{height: '100%'}}>
                    <Col span={4}>
                        <Sidebar/>
                    </Col>
                    <Col span={20}>
                        <Content style={{height: '100%', paddingBottom: '36px'}}>
                            <ContentLoader status={status}>
                                <Card bordered={false} style={{height: '100%'}}>
                                    {isOnline ? <Outlet/> : <h1>Reconnecting...</h1>}
                                </Card>
                            </ContentLoader>
                        </Content>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Main