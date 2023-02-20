import {List} from "antd";
import UserItem from "./UserItem/UserItem";

interface UsersListProps {
    users: IUser[],
    page: number,
    pageSize: number,
    isFetching: boolean
}

const UsersList = ({users, page, pageSize, isFetching}: UsersListProps) => {

    const style = isFetching ? {opacity: 0.5, transition: 'opacity 0.3s'} : {opacity: 1, transition: 'opacity 0.3s'}

    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={user => (<UserItem user={user} page={page} pageSize={pageSize}/>)}
            style={style}
        />
    )
}

export default UsersList