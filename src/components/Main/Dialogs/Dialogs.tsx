import {Row, Col, Form, Button} from "antd";
import DialogsMenu from "./DialogsMenu/DialogsMenu";
import MessagesList from "./MessagesList/MessagesList";
import {IDialog} from "../../../../models/dialog.module";
import {IMessage} from "../../../../models/message.module";
import {useLoaderData} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import {sendMessageActionCreator, updateMessageActionCreator} from "../../../redux/state";

type DialogsData = {
    state: {
        dialogs: IDialog[],
        messages: IMessage[],
        messageText: string
    },
    updateMessage: (action: any) => void,
    sendMessage: (action: any) => void

}

const Dialogs = (): JSX.Element => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        dialogsData.updateMessage(updateMessageActionCreator(value));
    }

    const handleClick = () => {
        dialogsData.sendMessage(sendMessageActionCreator());
    }

    const dialogsData = useLoaderData() as DialogsData;
    return (
        <Row gutter={16} style={{height: '100%'}}>
            <Col span={6}>
                <DialogsMenu dialogs={dialogsData.state.dialogs}/>
            </Col>
            <Col span={18} style={{display: 'flex', flexDirection: 'column'}}>
                <MessagesList messages={dialogsData.state.messages}/>

                <div style={{marginTop: 'auto'}}>
                    <TextArea showCount maxLength={1000} allowClear={true}
                              value={dialogsData.state.messageText}
                              onChange={handleChange}
                              autoSize={{maxRows: 4, minRows: 4}}
                              style={{marginBottom: '16px'}}
                    />
                    <Button type='primary' onClick={handleClick}>
                        Send
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default Dialogs