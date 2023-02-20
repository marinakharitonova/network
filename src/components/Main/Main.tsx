import {Outlet} from "react-router-dom";
import {Card, Col, Layout, Row} from 'antd';
import Sidebar from './Sidebar/Sidebar';
import {useOnlineStatus} from "../../hooks/useOnlineStatus";
import {useAuthQuery} from "../../redux/features/api/apiSlice";
import ContentLoader from "../ContentLoader/ContentLoader";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

const {Content} = Layout;

type MainProps = {
    isSuccess: boolean,
    isLoading: boolean,
    isError: boolean,
    error: FetchBaseQueryError | SerializedError | undefined
}

const Main = ({isSuccess, isLoading, isError, error}: MainProps): JSX.Element => {
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
                            <ContentLoader isSuccess={isSuccess} isLoading={isLoading} isError={isError} error={error}>
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