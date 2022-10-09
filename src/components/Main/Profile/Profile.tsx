import {useLoaderData} from "react-router-dom";
import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import UserInfo from "./UserInfo/UserInfo";
import {IPost} from "../../../../models/post.model";

type ProfileData = {
    state: {
        posts: IPost[],
        newPostMessage: string,
    },
    addPost: () => void,
    updateNewPostMessage: () => void
}

const Profile = (): JSX.Element => {
    const profileData = useLoaderData() as ProfileData;
    return (
        <>
            <Banner/>
            <UserInfo/>
            <PostForm addPost={profileData.addPost}
                      newPostMessage={profileData.state.newPostMessage}
                      updateNewPostMessage={profileData.updateNewPostMessage}
            />
            <PostsList posts={profileData.state.posts}/>
        </>

    )
}

export default Profile