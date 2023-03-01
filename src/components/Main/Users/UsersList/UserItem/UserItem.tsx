import {Button, List} from "antd";
import AvatarApp from "../../../../AvatarApp/AvatarApp";
import {useAppSelector} from "../../../../../features/hooks";
import {Link, useNavigate} from "react-router-dom";
import {memo} from "react";
import {selectCurrentUser} from "../../../../../features/auth/authSlice";
import useMutationResponseHandler from "../../../../../hooks/useMutationResponseHandler";
import {useToggleFollowUsersMutation} from "../../../../../features/api/apiSlice";

interface UserItemProps {
    user: IUser,
    page: number,
    pageSize: number
}

const UserItem = ({user, page, pageSize}: UserItemProps) => {
    const currentUser = useAppSelector(selectCurrentUser)
    const navigate = useNavigate();
    const [toggleFollow] = useToggleFollowUsersMutation()
    const userURL = `/profile/${user.id}`
    const handleResponse = useMutationResponseHandler()
    const isCurrentUserItem = currentUser && currentUser.id === user.id

    const handleToggleFollow = () => {
        if (!currentUser) {
            navigate('/login')
            return
        }
        handleResponse(toggleFollow({userId: user.id, isFollowed: user.followed, page, pageSize}))
    }

    return (
        <List.Item
            style={{minHeight: '73px'}}
            actions={
                isCurrentUserItem
                    ? undefined
                    : [<Button type='primary'
                               onClick={handleToggleFollow}>
                        {user.followed ? 'Unfollow' : 'Follow'}
                    </Button>]
            }>
            <List.Item.Meta
                avatar={<AvatarApp src={user.photos.small} size={40} key={user.id}/>}
                title={<Link to={userURL}>{user.name}</Link>}
                description={user.status}
            />
        </List.Item>
    )
}

export default memo(UserItem)