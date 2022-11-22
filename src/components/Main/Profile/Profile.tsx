import PostsList from './PostsList/PostsList';
import PostForm from "./PostForm/PostForm";
import Banner from "./Banner/Banner";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useParams} from "react-router-dom";
import {changeStatus, fetchProfile} from "../../../redux/features/profileSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";
import {withAuth} from "../../../hoc/withAuth";

const Profile = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.profile.status);
    const error = useAppSelector(state => state.profile.error);
    const profileInfo = useAppSelector(state => state.profile.profileInfo);
    const authorizedUserId = useAppSelector(state => state.auth.id);
    let { userId } = useParams();
    const profileId = userId ? userId : authorizedUserId;

    useEffect(() => {
        dispatch(fetchProfile(Number(profileId)))

        return () => {
            dispatch(changeStatus('idle'))
        }
    }, [dispatch, profileId])

    return <ContentLoader error={error}
                          status={status}
                          renderContent={() => {
                              return (
                                  <>
                                      <Banner/>
                                      <ProfileInfo profileInfo={profileInfo}/>
                                      <PostForm/>
                                      <PostsList/>
                                  </>
                              )
                          }}
            />
}


export default withAuth(Profile)