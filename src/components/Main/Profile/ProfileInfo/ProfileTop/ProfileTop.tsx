import React from 'react';
import UserStatus from "../UserStatus/UserStatus";
import {Button, Col, Row} from "antd";
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
        <Row gutter={16}>
            <Col span={18}>
                <UserStatus userId={userId}/>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
                {
                    !isProfileOwner
                    &&
                    <Button type="primary" onClick={handleToggleFollow}>{followStatus ? 'Unfollow' : 'Follow'}</Button>
                }
            </Col>
        </Row>
    );
}

export default ProfileTop;