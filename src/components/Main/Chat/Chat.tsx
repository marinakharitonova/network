import React from "react";
import MessagesList from "./MessagesList/MessagesList";
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import {withAuth} from "../../../hoc/withAuth";
import {useGetMessagesQuery, useSendMessageMutation} from "../../../features/chat/chatSlice";

const Chat = (): JSX.Element => {

    const {data, isSuccess} = useGetMessagesQuery()
    const [sendMessage] = useSendMessageMutation()

    return (

        <div>
            <div style={{
                marginBottom: '36px',
                minHeight: '500px',
                maxHeight: '500px',
                overflow: 'auto',
                border: '1px solid #d9d9d9',
                borderRadius: '6px'
            }}>
                {isSuccess && data.length > 0 && <MessagesList messages={data}/>}
            </div>

            <NewMessageForm onMessageSend={sendMessage}/>
        </div>
    )
}

export default withAuth(Chat)