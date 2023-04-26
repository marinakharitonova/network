import React, {useEffect} from "react";
import {ChatMessage} from "../../../../features/api/apiSlice";
import {List} from "antd";
import AvatarApp from "../../../AvatarApp/AvatarApp";
import {Link} from "react-router-dom";

type MessagesListProps = {
    messages: ChatMessage[]
    onLoadCb: () => void
}

const MessagesList = ({messages, onLoadCb}: MessagesListProps): JSX.Element => {

    useEffect(() => {
        onLoadCb()
    }, [onLoadCb])

    return (
        <List
            itemLayout="horizontal"
            dataSource={messages}
            split={false}
            style={{}}
            className={'chat-list'}
            renderItem={message => (
                <List.Item style={{
                    padding: '0',
                    margin: '10px',
                }}>
                    <List.Item.Meta
                        avatar={<Link to={`/profile/${message.userId}`}><AvatarApp src={message.photo}
                                                                                   size={40}/></Link>}
                        title={<Link to={`/profile/${message.userId}`}>{message.userName}</Link>}
                        description={message.message}
                    />
                </List.Item>
            )}
        />
    )
}

export default MessagesList