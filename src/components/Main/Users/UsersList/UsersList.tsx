import {List} from "antd";
import UserItem from "./UserItem/UserItem";

interface UsersListProps {
    users: IUser[],
    page: number,
    pageSize: number
}

const UsersList = ({users, page, pageSize}: UsersListProps) => {

    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={user => (<UserItem user={user} page={page} pageSize={pageSize}/>)}
        />
    )
}

export default UsersList