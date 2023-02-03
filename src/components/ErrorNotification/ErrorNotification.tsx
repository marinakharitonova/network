import {message} from "antd";
import {useAppSelector} from "../../redux/hooks";
import {useEffect} from "react";

const ErrorNotification = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const {isError, message: errMessage} = useAppSelector(state => state.error)

    useEffect(() => {
        if (isError) {
            messageApi.open({
                type: 'error',
                content: errMessage,
            });
        }

    }, [isError, errMessage, messageApi])

    return <div>{contextHolder}</div>
}

export default ErrorNotification