import {List} from "antd";
import AvatarApp from "../../AvatarApp/AvatarApp";
import {useAppSelector} from "../../../redux/hooks";
import {SelectFriends} from "../../../redux/features/friendsSlice";

const Friends = (): JSX.Element => {
    const {friends} = useAppSelector(SelectFriends)

    return (
        <List
            itemLayout="horizontal"
            dataSource={friends}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<AvatarApp src={item.avatarSrc} size={40}/>}
                        title={item.name}
                        description={item.status}
                    />
                </List.Item>
            )}
        />
    )
}

export default Friends