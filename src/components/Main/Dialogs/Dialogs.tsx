import {Row, Col} from "antd";
import DialogsMenu from "./DialogsMenu/DialogsMenu";
import MessagesList from "./MessagesList/MessagesList";
import {IDialog} from "../../../../models/dialog.module";
import {IMessage} from "../../../../models/message.module";

type DialogsProps = {
    dialogs: IDialog[],
    messages: IMessage[]
}


const Dialogs = ({dialogs, messages}: DialogsProps): JSX.Element => {

    return (
        <Row gutter={16} style={{height: '100%'}}>
            <Col span={6}>
                <DialogsMenu dialogs={dialogs}/>
            </Col>
            <Col span={18}>
               <MessagesList messages={messages}/>
            </Col>
        </Row>
    )
}

export default Dialogs