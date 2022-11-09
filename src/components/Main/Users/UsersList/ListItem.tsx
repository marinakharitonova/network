import {Button, List} from "antd";
import AvatarApp from "../../../AvatarApp/AvatarApp";

type ListItemProps = {
    user: IUser,
    handler: (id: number) => void
}

const ListItem = ({user, handler}: ListItemProps): JSX.Element => {

    console.log('render list item');

    return (
        <List.Item
            actions={
                [<Button type='primary'
                         onClick={() => handler(user.id)}>
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

export default ListItem