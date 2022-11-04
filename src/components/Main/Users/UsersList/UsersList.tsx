import {Button, List} from "antd";
import AvatarApp from "../../../AvatarApp/AvatarApp";
import {useAppDispatch} from "../../../../redux/hooks";
import {toggleFollow} from "../../../../redux/features/usersSlice";

type UsersListProps = {
    users: IUser[],
}

const UsersList = ({users}: UsersListProps): JSX.Element => {
    const dispatch = useAppDispatch();

    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={user => (
                <List.Item
                    actions={
                    [<Button type='primary'
                             onClick={() => dispatch(toggleFollow(user.id))}>{user.isFriend ? 'Unfollow' : 'Follow'}
                    </Button>]
                }>
                    <List.Item.Meta
                        avatar={<AvatarApp src={user.avatarSrc} size={40}/>}
                        title={user.name}
                        description={user.status}
                    />
                    <div>{user.location && `${user.location.country}, ${user.location.city}`}</div>
                </List.Item>
            )}
        />
    )
}

export default UsersList