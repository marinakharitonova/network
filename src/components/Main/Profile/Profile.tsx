import {useLoaderData} from "react-router-dom";
import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import UserInfo from "./UserInfo/UserInfo";
import {IPost} from "../../../../models/post.model";

type ProfileData = {
    posts: IPost[]
}

const Profile = (): JSX.Element => {
    const profileData = useLoaderData() as ProfileData;
    return (
        <>
            <Banner/>
            <UserInfo/>
            <PostForm/>
            <PostsList posts={profileData.posts}/>
        </>

    )
}

export default Profile