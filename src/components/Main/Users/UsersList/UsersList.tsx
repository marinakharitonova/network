import {List} from "antd";
import {useAppSelector} from "../../../../redux/hooks";
import {selectUserIds} from "../../../../redux/features/usersSlice";
import UserItem from "./UserItem/UserItem";

const UsersList = (): JSX.Element => {

    console.log('render list');

    const usersIds = useAppSelector(selectUserIds);

    return (
        <List
            itemLayout="horizontal"
            dataSource={usersIds}
            renderItem={id => (<UserItem id={id}/>)}
        />
    )
}

export default UsersList