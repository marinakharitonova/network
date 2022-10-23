import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import UserInfo from "./UserInfo/UserInfo";

const Profile = (): JSX.Element => {

    return (
        <>
            <Banner/>
            <UserInfo/>
            <PostForm/>
            <PostsList/>
        </>

    )
}

export default Profile