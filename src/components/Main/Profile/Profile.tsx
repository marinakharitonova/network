import Banner from "./Banner/Banner";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import {Navigate, useParams} from "react-router-dom";
import {useGetProfileQuery} from "../../../features/api/apiSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import {useAppSelector} from "../../../features/hooks";

const Profile = (): JSX.Element => {
    const currentUser = useAppSelector(selectCurrentUser)
    let {userId} = useParams()

    const profileId = userId ? Number(userId) : currentUser?.id

    const {
        data: profile,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfileQuery(profileId!, {skip: !userId && !currentUser})

    return (
        <>
            {!(userId || currentUser) && <Navigate replace to="/login"/>}
            <ContentLoader isError={isError} isLoading={isLoading} isSuccess={isSuccess} error={error}>
                {profile && <>
                    <Banner/>
                    <ProfileInfo profile={profile} key={profile.userId}/>
                </>}
                {/*<PostForm/>*/}
                {/*<PostsList/>*/}
            </ContentLoader>
        </>
    )
}

export default Profile