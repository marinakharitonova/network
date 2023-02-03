import {Button, List} from "antd";
import AvatarApp from "../../../../AvatarApp/AvatarApp";
import {useAppSelector} from "../../../../../redux/hooks";
import {selectUserById, toggleFollow} from "../../../../../redux/features/usersSlice";
import {EntityId} from "@reduxjs/toolkit";
import {Link, useNavigate} from "react-router-dom";
import {useDispatchThunk} from "../../../../../hooks/useDispatchThunk";

type UserItemProps = {
    id: EntityId,
}

const UserItem = ({id}: UserItemProps): JSX.Element => {

    const user = useAppSelector(state => selectUserById(state, id))!
    const isUserAuthorized = useAppSelector(state => state.auth.isUserAuthorized)
    const navigate = useNavigate();
    const [status, tryCatchWrapper] = useDispatchThunk()
    const userURL = `/profile/${id}`;

    const handleToggleFollow = () => {
        if (!isUserAuthorized) navigate('/login')
        tryCatchWrapper(toggleFollow({userId: user.id, isFollow: user.followed}))
    }

    const isFollowBtnDisabled = status === 'loading';

    return (
        <List.Item
            actions={
                [<Button type='primary' disabled={isFollowBtnDisabled}
                         onClick={handleToggleFollow}>
                    {user.followed ? 'Unfollow' : 'Follow'}
                </Button>]
            }>
            <List.Item.Meta
                avatar={<AvatarApp src={user.photos.small} size={40}/>}
                title={<Link to={userURL}>{user.name}</Link>}
                description={user.status}
            />
            <div>{user.location && `${user.location.country}, ${user.location.city}`}</div>
        </List.Item>
    )
}

export default UserItem