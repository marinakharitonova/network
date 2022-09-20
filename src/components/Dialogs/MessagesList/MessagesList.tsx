import Message from "./Message/Message";
import {IMessage} from "../../../../models/message.module";

const messagesListStyle: React.CSSProperties = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyItems: 'flex-start',
    gridGap: '10px',
}

const messagesData: IMessage[] = [
    {
        id: 1,
        author: {
            avatarSrc: null,
        },
        text: 'blabla'
    },
    {
        id: 2,
        author: {
            avatarSrc: null,
        },
        text: 'Hello'
    },
]

const MessagesList = (): JSX.Element => {
    return (
        <div style={messagesListStyle}>
            <Message id={messagesData[0].id} text={messagesData[0].text} author={messagesData[0].author}/>
            <Message id={messagesData[1].id} text={messagesData[1].text} author={messagesData[1].author}/>
        </div>
    )
}

export default MessagesList