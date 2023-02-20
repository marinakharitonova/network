import {message} from "antd";
import {JSXElementConstructor, ReactElement} from "react";

export const useErrorNotification = (): [ReactElement<any, string | JSXElementConstructor<any>>, (errorMessage: string) => void] => {
    const [messageApi, contextHolder] = message.useMessage();

    return [
        contextHolder,
        (errorMessage: string) => {
            messageApi.open({
                type: 'error',
                content: errorMessage,
            });
        }
    ]
}