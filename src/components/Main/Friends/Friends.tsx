import {List} from "antd";
import {useLoaderData} from "react-router-dom";
import {IFriend} from "../../../../models/friend.module";
import AvatarApp from "../../AvatarApp/AvatarApp";

type FriendsData = {
    friends: IFriend[]
}

const Friends = (): JSX.Element => {
    const friendsData = useLoaderData() as FriendsData;

    return (
        <List
            itemLayout="horizontal"
            dataSource={friendsData.friends}
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