import React, {FC} from "react"
import {Space, Avatar, Typography} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {IMessage} from "../../../../../models/message.module";

const {Text} = Typography;

const messageStyle: React.CSSProperties = {
    border: '1px solid #f0f2f5',
    padding: '8px 10px',
    borderRadius: '20px',
    boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
};

const messageAnswerStyle: React.CSSProperties =
    Object.assign({}, messageStyle, {justifySelf: 'flex-end'});

interface MessageProps extends IMessage {}

const Message: FC<MessageProps> = (props: MessageProps) => {
    return (
        <Space align="start" style={messageStyle}>
            {props.author.avatarSrc ? <Avatar src={props.author.avatarSrc} size={30}/>
                : <Avatar icon={<UserOutlined/>} size={30}/>}
            <Text>{props.text}</Text>
        </Space>
    )
}

export default Message