import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {changeStatus, fetchProfile, fetchUserStatus} from "../../../redux/features/profileSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";

const Profile = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.profile.status);
    const error = useAppSelector(state => state.profile.error);
    const profileInfo = useAppSelector(state => state.profile.profileInfo);
    const userStatus = useAppSelector(state => state.profile.userStatus);
    const authorizedUserId = useAppSelector(state => state.auth.id);
    const isUserAuthorized = useAppSelector(state => state.auth.isUserAuthorized);
    let {userId} = useParams();
    const profileId = userId ? Number(userId) : authorizedUserId;

    const navigate = useNavigate();

    useEffect(() => {
        if (!(profileId || isUserAuthorized)) navigate('/login');

        dispatch(fetchProfile({id: profileId!}))

        dispatch(fetchUserStatus(profileId!))

        return () => {
            dispatch(changeStatus('idle'))
        }
    }, [dispatch, profileId])

    const profileContent = (
        <>
            <Banner/>
            <ProfileInfo profileInfo={profileInfo} userStatus={userStatus}/>
            <PostForm/>
            <PostsList/>
        </>
    )

    return <ContentLoader error={error} status={status} renderContent={profileContent}/>
}


export default Profile