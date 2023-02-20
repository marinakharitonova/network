import React from "react";
import {Col, Row} from "antd";
import DialogsMenu from "./DialogsMenu/DialogsMenu";
import MessagesList from "./MessagesList/MessagesList";
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import {withAuth} from "../../../hoc/withAuth";

const Dialogs = (): JSX.Element => {
    return (
        // <Row gutter={16} style={{height: '100%'}}>
        //     <Col span={6}>
        //         <DialogsMenu dialogs={dialogs}/>
        //     </Col>
        //     <Col span={18} style={{display: 'flex', flexDirection: 'column'}}>
        //         <MessagesList messages={messages}/>
        //
        //         <NewMessageForm/>
        //     </Col>
        // </Row>
        <p>Dialogs</p>
    )
}

export default withAuth(Dialogs)