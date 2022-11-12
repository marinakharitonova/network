import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import {useParams} from "react-router-dom";
import {changeStatus, fetchProfile, selectPostIds} from "../../../redux/features/profileSlice";

const Profile = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.profile.status);
    const error = useAppSelector(state => state.profile.error);
    const profileInfo = useAppSelector(state => state.profile.profileInfo);
    let { userId } = useParams();

    useEffect(() => {
        dispatch(fetchProfile(Number(userId)))

        return () => {
            dispatch(changeStatus('idle'))
        }
    }, [dispatch, userId])

    return (
        <>
            {status === 'idle' && <Loader/>}
            {status === 'succeeded' &&
                <>
                    <Banner/>
                    <ProfileInfo profileInfo={profileInfo}/>
                    <PostForm/>
                    <PostsList/>
                </>
            }
            {status === 'failed' && <ErrorMessage text={error}/>}
        </>
    )
}

export default Profile