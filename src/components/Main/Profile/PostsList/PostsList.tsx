import {List, Typography} from 'antd';
import {useAppSelector} from "../../../../redux/hooks";
import {selectPostIds} from "../../../../redux/features/profileSlice";
import PostItem from "./PostIem/PostItem";
import React from "react";

const {Title} = Typography;

const PostsList = (): JSX.Element => {
    const postIds = useAppSelector(selectPostIds);

    return (
        <>
            <Title level={2}>My posts</Title>
            <List
                itemLayout='horizontal'
                dataSource={postIds}
                renderItem={id => (<PostItem id={id}/>)}
            />
        </>
    )
}

export default PostsList