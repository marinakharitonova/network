import {Avatar, Button, List, Tooltip, Typography} from 'antd';
import {LikeOutlined, UserOutlined,} from '@ant-design/icons';
import {IPost} from "../../../../../models/post.model";

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
                            avatar={item.avatarSrc ? <Avatar src={item.avatarSrc}/> : <Avatar icon={<UserOutlined/>}/>}
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