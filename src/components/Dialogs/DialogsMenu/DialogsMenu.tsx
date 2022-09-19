import {FC} from "react"
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {IDialog} from "../../../../models/dialog.module";

interface DialogsMenuProps {
    dialogs: IDialog[]
}

const DialogsMenu: FC<DialogsMenuProps> = ({dialogs}: DialogsMenuProps) => {
    const dialogItems = dialogs.map(el => ({label: (<Link to={String(el.id)}>{el.name}</Link>), key: String(el.id)}))

    return (
        <Menu items={dialogItems} mode="inline" style={{height: '100%'}}/>
    )
}

export default DialogsMenu