import {Button, List} from "antd";
import AvatarApp from "../../../../AvatarApp/AvatarApp";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {selectUserById, toggleFollow} from "../../../../../redux/features/usersSlice";
import {EntityId} from "@reduxjs/toolkit";
import {Link} from "react-router-dom";
import {useState} from "react";

type UserItemProps = {
    id: EntityId,
}

const UserItem = ({id}: UserItemProps): JSX.Element => {

    const user = useAppSelector(state => selectUserById(state, id))!;
    const dispatch = useAppDispatch();
    const [followRequestStatus, setFollowRequestStatus] = useState<IRequest['status']>('idle')

    const userURL = `/profile/${id}`;

    const handleToggleFollow = async () => {
        try {
            setFollowRequestStatus('loading')
            await dispatch(toggleFollow({userId: user.id, isFollow: user.followed})).unwrap();
        } catch (err) {
            console.error('Failed to follow user: ', err)
        } finally {
            setFollowRequestStatus('idle')
        }
    }

    const isFollowBtnDisabled = followRequestStatus === 'loading';

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