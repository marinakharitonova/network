import {message} from "antd";

const ErrorNotification = ({errorMessage}: { errorMessage: string }) => {
    const [messageApi, contextHolder] = message.useMessage();

    messageApi.open({
        type: 'error',
        content: errorMessage,
    });

    return <div>{contextHolder}</div>
}

export default ErrorNotification