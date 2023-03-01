import React from 'react';
import UserStatus from "../UserStatus/UserStatus";
import {Button} from "antd";
import {useToggleFollowProfileMutation} from "../../../../../features/api/apiSlice";
import useMutationResponseHandler from "../../../../../hooks/useMutationResponseHandler";

type ProfileTopProps = {
    userId: number,
    isProfileOwner: boolean,
    followStatus: boolean
}

const ProfileTop = ({userId, isProfileOwner, followStatus}: ProfileTopProps) => {
    const [toggleFollow] = useToggleFollowProfileMutation()
    const handleResponse = useMutationResponseHandler()

    const handleToggleFollow = () => {
        handleResponse(toggleFollow({isFollowed: followStatus, userId: userId}))
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <UserStatus userId={userId}/>
            {
                !isProfileOwner
                && <Button type="primary" onClick={handleToggleFollow}>{followStatus ? 'Unfollow' : 'Follow'}</Button>
            }
        </div>
    );
}

export default ProfileTop;