import {Row, Col, Form, Button} from "antd";
import DialogsMenu from "./DialogsMenu/DialogsMenu";
import MessagesList from "./MessagesList/MessagesList";
import {IDialog} from "../../../../models/dialog.module";
import {IMessage} from "../../../../models/message.module";
import {useLoaderData} from "react-router-dom";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import React, {useRef} from "react";

type DialogsData = {
    dialogs: IDialog[],
    messages: IMessage[]
}

const Dialogs = (): JSX.Element => {

    const ref = useRef<TextAreaRef>(null);

    const sendMessage = (): void => {
        alert(ref.current?.resizableTextArea?.props.value)
    }

    const dialogsData = useLoaderData() as DialogsData;
    return (
        <Row gutter={16} style={{height: '100%'}}>
            <Col span={6}>
                <DialogsMenu dialogs={dialogsData.dialogs}/>
            </Col>
            <Col span={18} style={{display: 'flex', flexDirection: 'column'}}>
               <MessagesList messages={dialogsData.messages}/>

                <div style={{marginTop: 'auto'}}>
                    <TextArea showCount maxLength={1000} allowClear={true}
                              autoSize={{maxRows: 4, minRows: 4}} ref={ref} style={{marginBottom: '16px'}}/>
                    <Button type='primary' onClick={sendMessage}>
                        Send
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default Dialogs