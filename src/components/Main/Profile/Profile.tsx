import Banner from "./Banner/Banner";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import {useParams} from "react-router-dom";
import {useGetFollowStatusQuery, useGetProfileQuery} from "../../../features/api/apiSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import {useAppSelector} from "../../../features/hooks";
import {withAuth} from "../../../hoc/withAuth";

const Profile = (): JSX.Element => {
    const currentUser = useAppSelector(selectCurrentUser)
    let {userId} = useParams()

    const profileId = userId ? Number(userId) : currentUser?.id

    const {
        data: profile,
        isLoading: isProfileLoading,
        isSuccess: isProfileSuccess,
        isError: isProfileError,
        error: profileError
    } = useGetProfileQuery(profileId!, {skip: !userId && !currentUser})

    const {
        data: followStatus,
        isLoading: isFollowStatusLoading,
        isSuccess: isFollowStatusSuccess,
        isError: isFollowStatusError,
        error: followStatusError
    } = useGetFollowStatusQuery(profileId!, {skip: !userId && !currentUser})


    return (
        <>
            <ContentLoader isError={isProfileError || isFollowStatusError}
                           isLoading={isProfileLoading || isFollowStatusLoading}
                           isSuccess={isProfileSuccess && isFollowStatusSuccess}
                           error={profileError || followStatusError}>
                {profile && <>
                    <Banner userId={profile.userId}/>
                    <ProfileInfo profile={profile} key={profile.userId} followStatus={Boolean(followStatus)}/>
                </>}
                {/*<PostForm/>*/}
                {/*<PostsList/>*/}
            </ContentLoader>
        </>
    )
}

export default withAuth(Profile)