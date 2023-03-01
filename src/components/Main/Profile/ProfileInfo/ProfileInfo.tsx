import {Col, Row} from 'antd';
import React from "react";
import {useAppSelector} from "../../../../features/hooks";
import {selectCurrentUser} from "../../../../features/auth/authSlice";
import ProfileTop from "./ProfileTop/ProfileTop";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import ProfileData from "./ProfileData/ProfileData";

type ProfileInfoProps = {
    profile: IProfile,
    followStatus: boolean
}

const ProfileInfo = ({profile, followStatus}: ProfileInfoProps): JSX.Element => {
    const currentUser = useAppSelector(selectCurrentUser)
    const canUpdateProfile = currentUser ? currentUser.id === profile.userId : false

    return (
        <>
            <ProfileTop userId={profile.userId} isProfileOwner={canUpdateProfile} followStatus={followStatus}/>

            <Row gutter={16} style={{marginBottom: '36px'}}>
                <Col span={4}>
                    <ProfileAvatar canUpdate={canUpdateProfile} avatar={profile.photos.large} userId={profile.userId}/>
                </Col>
                <Col span={18}>
                    <ProfileData canUpdate={canUpdateProfile} profile={profile}/>
                </Col>
            </Row>
        </>
    )
}

export default ProfileInfo