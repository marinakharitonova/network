import {Button, List} from "antd";
import AvatarApp from "../../../../AvatarApp/AvatarApp";
import {useAppSelector} from "../../../../../redux/hooks";
import {Link, useNavigate} from "react-router-dom";
import {useToggleFollowMutation} from "../../../../../redux/features/api/apiSlice";
import ErrorMessage from "../../../../ErrorMessage/ErrorMessage";
import {memo} from "react";
import {selectCurrentUser} from "../../../../../redux/features/auth/authSlice";
import {useErrorNotification} from "../../../../../hooks/useErrorNotification";
import {createPortal} from "react-dom";

interface UserItemProps {
    user: IUser,
    page: number,
    pageSize: number
}

const UserItem = ({user, page, pageSize}: UserItemProps) => {
    const currentUser = useAppSelector(selectCurrentUser)
    const navigate = useNavigate();
    const [toggleFollow] = useToggleFollowMutation()
    const userURL = `/profile/${user.id}`

    const [contextHolder, showError] = useErrorNotification()

    const handleToggleFollow = () => {
        if (!currentUser) {
            navigate('/login')
            return
        }
        toggleFollow({userId: user.id, isFollowed: user.followed, page, pageSize})
            .unwrap()
            .then((payload) => {
                if (payload.resultCode === 1) {
                    showError(payload.messages[0])
                }
            })
            .catch((error) => {
                let errMsg = ''
                if (error && 'status' in error) {
                    errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
                }
                showError(errMsg)
            })
    }

    return (
        <>
            {createPortal(contextHolder, document.body)}
            <List.Item
                actions={
                    [<Button type='primary'
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
        </>

    )
}

export default memo(UserItem)