import React from "react";
import {Row, Col} from "antd";
import DialogsMenu from "./DialogsMenu/DialogsMenu";
import MessagesList from "./MessagesList/MessagesList";
import {SelectDialogs, SelectMessages} from "../../../redux/features/dialogsSlice";
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import {useAppSelector} from "../../../redux/hooks";
import {withAuth} from "../../../hoc/withAuth";

const Dialogs = (): JSX.Element => {
    const dialogs = useAppSelector(SelectDialogs);
    const messages = useAppSelector(SelectMessages);

    return (
        <Row gutter={16} style={{height: '100%'}}>
            <Col span={6}>
                <DialogsMenu dialogs={dialogs}/>
            </Col>
            <Col span={18} style={{display: 'flex', flexDirection: 'column'}}>
                <MessagesList messages={messages}/>

                <NewMessageForm/>
            </Col>
        </Row>
    )
}

export default withAuth(Dialogs)