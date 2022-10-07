import React from "react";
import {Space, Typography} from "antd";
import {IMessage} from "../../../../../../models/message.module";
import AvatarApp from "../../../../AvatarApp/AvatarApp";

const {Text} = Typography;

const messageStyle: React.CSSProperties = {
    border: '1px solid #f0f2f5',
    padding: '8px 10px',
    borderRadius: '20px',
    boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
};

const messageAnswerStyle: React.CSSProperties =
    Object.assign({}, messageStyle, {justifySelf: 'flex-end'});

type MessageProps = IMessage

const Message = (props: MessageProps): JSX.Element => {
    return (
        <Space align="start" style={messageStyle}>
            <AvatarApp src={props.author.avatarSrc}/>
            <Text>{props.text}</Text>
        </Space>
    )
}

export default Message