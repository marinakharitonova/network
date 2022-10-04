import {Row, Col} from "antd";
import DialogsMenu from "./DialogsMenu/DialogsMenu";
import MessagesList from "./MessagesList/MessagesList";
import {IDialog} from "../../../../models/dialog.module";
import {IMessage} from "../../../../models/message.module";
import {useLoaderData} from "react-router-dom";

type DialogsData = {
    dialogs: IDialog[],
    messages: IMessage[]
}

const Dialogs = (): JSX.Element => {
    const dialogsData = useLoaderData() as DialogsData;

    return (
        <Row gutter={16} style={{height: '100%'}}>
            <Col span={6}>
                <DialogsMenu dialogs={dialogsData.dialogs}/>
            </Col>
            <Col span={18}>
               <MessagesList messages={dialogsData.messages}/>
            </Col>
        </Row>
    )
}

export default Dialogs