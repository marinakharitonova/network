import {FC} from "react";
import {useRouteError} from "react-router-dom"
import {Typography, Space} from 'antd';

const {Title, Text} = Typography;

interface RouteError {
    statusText?: string,
    message?: string
}

const ErrorPage: FC = () => {
    const error = useRouteError();
    const {statusText, message} = error as RouteError;

    return (
        <Space align='center' direction='vertical' style={{width: '100%', marginTop: '100px'}}>
            <Title>Oops!</Title>
            <Title level={2}>Sorry, an unexpected error has occurred.</Title>
            <Title level={2} italic type="danger">
                <i>{statusText || message}</i>
            </Title>
        </Space>

    )
}

export default ErrorPage