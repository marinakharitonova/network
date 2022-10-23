import {Menu} from "antd";
import {Link} from "react-router-dom";
import AvatarApp from "../../../AvatarApp/AvatarApp";

type DialogsMenuProps = {
    dialogs: IDialog[]
}

const DialogsMenu = ({dialogs}: DialogsMenuProps): JSX.Element => {

    const dialogItems = dialogs.map(el => ({
        label: (<Link to={String(el.id)}>{el.name}</Link>),
        key: String(el.id),
        icon: <AvatarApp src={el.avatarSrc} style={{marginRight: '10px'}}/>
    }))

    return (
        <Menu items={dialogItems} mode="inline" style={{height: '100%'}}/>
    )
}

export default DialogsMenu