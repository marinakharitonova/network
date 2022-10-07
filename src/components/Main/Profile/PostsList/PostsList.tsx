import {Button, List, Tooltip, Typography} from 'antd';
import {LikeOutlined} from '@ant-design/icons';
import {IPost} from "../../../../../models/post.model";
import AvatarApp from "../../../AvatarApp/AvatarApp";

const {Title} = Typography;

type PostsListProps = {
    posts: IPost[]
}

const PostsList = ({posts}: PostsListProps): JSX.Element => {
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