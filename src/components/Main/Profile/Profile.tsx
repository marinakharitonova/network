import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import UserInfo from "./UserInfo/UserInfo";

import {IPost} from "../../../../models/post.model";

type ProfileProps = {
    posts: IPost[]
}

const Profile = ({posts} : ProfileProps): JSX.Element => {
    return (
        <>
            <Banner/>
            <UserInfo/>
            <PostForm/>
            <PostsList posts={posts}/>
        </>

    )
}

export default Profile