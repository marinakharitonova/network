import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {fetchProfile, fetchUserStatus} from "../../../redux/features/profileSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";

const Profile = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.profile.status);
    const error = useAppSelector(state => state.profile.error);
    const authorizedUserId = useAppSelector(state => state.auth.id);
    const isUserAuthorized = useAppSelector(state => state.auth.isUserAuthorized);
    let {userId} = useParams();
    const profileId = userId ? Number(userId) : authorizedUserId!

    const navigate = useNavigate();

    useEffect(() => {

        if (!(profileId || isUserAuthorized)) navigate('/login');

        dispatch(fetchProfile(profileId))

        dispatch(fetchUserStatus(profileId!))
    }, [profileId])

    return (
        <ContentLoader error={error} status={status}>
            <Banner/>
            <ProfileInfo/>
            <PostForm/>
            <PostsList/>
        </ContentLoader>
    )
}

export default Profile