import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import UserInfo from "./UserInfo/UserInfo";

import {IPost} from "../../../models/post.model";
import { FC } from 'react';

const data: IPost[] = [
    {
        id: 1,
        avatarSrc: 'https://avatars.mds.yandex.net/i?id=efb47ec07435b74e8dcf00ba0dba0874-5236416-images-thumbs&n=13&exp=1',
        title: 'Ant Design Title 1',
        description: 'desc1',
        likesCount: 100
    },
    {
        id: 2,
        avatarSrc: null,
        title: 'Ant Design Title 2',
        description: 'desc2',
        likesCount: 3
    },
    {
        id: 3,
        avatarSrc: null,
        title: 'Title 3',
        description: 'Hello, Marina',
        likesCount: 7000
    }
];

const Profile: FC = () => {
    return (
        <>
            <Banner/>
            <UserInfo/>
            <PostForm/>
            <PostsList posts={data}/>
        </>

    )
}

export default Profile