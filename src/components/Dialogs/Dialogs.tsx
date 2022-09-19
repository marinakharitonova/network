import {FC} from "react"
import {Row, Col} from "antd";
import DialogsMenu from "./DialogsMenu/DialogsMenu";
import MessagesList from "./MessagesList/MessagesList";
import {IDialog} from "../../../models/dialog.module";

const dialogsData: IDialog[] = [
    {
        id: 1,
        name: 'Dima'
    },
    {
        id: 2,
        name: 'Valera',
    },
    {
        id: 3,
        name: 'Sveta',
    },
]

const Dialogs: FC = () => {

    return (
        <Row gutter={16} style={{height: '100%'}}>
            <Col span={6}>
                <DialogsMenu dialogs={dialogsData}/>
            </Col>
            <Col span={18}>
               <MessagesList/>
            </Col>
        </Row>
    )
}

export default Dialogs