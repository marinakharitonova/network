import {Button, List} from "antd";
import AvatarApp from "../../../../AvatarApp/AvatarApp";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {selectUserById, toggleFollow} from "../../../../../redux/features/usersSlice";
import {EntityId} from "@reduxjs/toolkit";

type UserItemProps = {
    id: EntityId,
}

const UserItem = ({id}: UserItemProps): JSX.Element => {

    console.log('render list item');

    const user = useAppSelector(state => selectUserById(state, id))!;
    const dispatch = useAppDispatch();

    return (
        <List.Item
            actions={
                [<Button type='primary'
                         onClick={() => dispatch(toggleFollow(user.id))}>
                    {user.followed ? 'Unfollow' : 'Follow'}
                </Button>]
            }>
            <List.Item.Meta
                avatar={<AvatarApp src={user.photos.small} size={40}/>}
                title={user.name}
                description={user.status}
            />
            <div>{user.location && `${user.location.country}, ${user.location.city}`}</div>
        </List.Item>
    )
}

export default UserItem