import {Button, List, Tooltip, Typography} from 'antd';
import {LikeOutlined} from '@ant-design/icons';
import AvatarApp from "../../../AvatarApp/AvatarApp";
import {useAppSelector} from "../../../../redux/hooks";
import {SelectProfilePosts} from "../../../../redux/features/profileSlice";

const {Title} = Typography;

const PostsList = (): JSX.Element => {
    const posts = useAppSelector(SelectProfilePosts)
    return (
        <>
            <Title level={2}>My posts</Title>
            <List
                itemLayout='horizontal'
                dataSource={posts}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Tooltip title="like">
                                <Button icon={<LikeOutlined />} shape="round"> {item.likesCount} </Button>
                            </Tooltip>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<AvatarApp src={item.avatarSrc} size={40}/>}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

export default PostsList