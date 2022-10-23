import React from "react";
import Message from "./Message/Message";


const messagesListStyle: React.CSSProperties = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyItems: 'flex-start',
    gridGap: '10px',
}

type MessagesListProps = {
    messages: IMessage[]
}


const MessagesList = ({messages}: MessagesListProps): JSX.Element => {
    const messageItems = messages.map(el =>
        (<Message key={el.id} id={el.id} text={el.text} author={el.author}/>))

    return (
        <div style={messagesListStyle}>
            {messageItems}
        </div>
    )
}

export default MessagesList