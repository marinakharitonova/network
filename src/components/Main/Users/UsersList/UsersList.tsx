import {List} from "antd";
import ListItem from "./ListItem";

type UsersListProps = {
    users: IUser[],
    handler: (id: number) => void
}

const UsersList = ({users, handler}: UsersListProps): JSX.Element => {

    console.log('render list');

    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={user => (<ListItem user={user} handler={handler}/>)}
        />
    )
}

export default UsersList