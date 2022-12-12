import {message} from "antd";
import {useAppSelector} from "../../redux/hooks";
import {useEffect} from "react";

const ErrorNotification = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const errMessages = useAppSelector(state => state.error.messages)
    const showError = () => {
        if (!errMessages.length) return
        messageApi.open({
            type: 'error',
            content: errMessages.join(','),
        });
    }
    useEffect(showError, [errMessages])
    return (
        <div>
            {contextHolder}
        </div>
    )
}

export default ErrorNotification