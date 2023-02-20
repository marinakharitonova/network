import {Button, List, Tooltip} from 'antd';
import {LikeOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {EntityId} from "@reduxjs/toolkit";
import AvatarApp from "../../../../AvatarApp/AvatarApp";

type PostItemProps = {
    id: EntityId
}

const PostsItem = ({id}: PostItemProps): JSX.Element => {
    // const post = useAppSelector(state => selectPostById(state, id))!
    // const dispatch = useAppDispatch()
    // return (
    //     <List.Item
    //         key={post.id}
    //         actions={[
    //             <Tooltip title="like">
    //                 <Button icon={<LikeOutlined/>}
    //                         shape="round"
    //                         onClick={() => dispatch(likePost(id))}
    //                 > {post.likesCount} </Button>
    //             </Tooltip>
    //         ]}
    //     >
    //         <List.Item.Meta
    //             avatar={<AvatarApp src={post.avatarSrc} size={40}/>}
    //             title={post.title}
    //             description={post.description}
    //         />
    //     </List.Item>
    // )

    return <p>post</p>
}

export default PostsItem