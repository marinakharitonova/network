import {Button, Col, Row} from 'antd';
import AvatarApp from "../../../AvatarApp/AvatarApp";
import UserStatus from "./UserStatus/UserStatus";
import React, {useMemo, useState} from "react";
import {useUpdateAvatarMutation} from "../../../../features/api/apiSlice";
import ImageUploader from "../../../ImageUploader/ImageUploader";
import {useAppSelector} from "../../../../features/hooks";
import {selectCurrentUser} from "../../../../features/auth/authSlice";
import useMutationResponseHandler from "../../../../hooks/useMutationResponseHandler";
import ProfileInfoEditor from "./ProfileInfoEditor/ProfileInfoEditor";
import ProfileDescription from "./ProfileDescription/ProfileDescription";

type ProfileInfoProps = {
    profile: IProfile
}
type OmittedProfile = Omit<IProfile, 'photos' | 'userId' | 'contacts'>
type ModeType = 'show' | 'edit'

const ProfileInfo = ({profile}: ProfileInfoProps): JSX.Element => {
    const currentUser = useAppSelector(selectCurrentUser)
    const canUpdateProfile = currentUser && currentUser.id === profile.userId
    const [mode, setMode] = useState<ModeType>('show')

    const [updateAvatar, {isLoading}] = useUpdateAvatarMutation()
    const handleResponse = useMutationResponseHandler()

    const uploadAvatarCb = (formData: FormData) => {
        handleResponse(updateAvatar({data: formData, userId: profile.userId}))
    };

    const editFormInitialValues = useMemo(() => {
        const initValues = {} as OmittedProfile

        for (let key in profile){
            if (key === 'userId'|| key === 'photos' || key === 'contacts') continue
            (initValues as any)[key] = profile[key as keyof OmittedProfile]
        }

        return Object.assign(initValues, profile.contacts)

    }, [profile])

    return (
        <>
            <UserStatus userId={profile.userId}/>
            <Row gutter={16} style={{marginBottom: '36px'}}>
                <Col span={4}>
                    {
                        canUpdateProfile
                            ? <ImageUploader imageUrl={profile.photos.large} size={128}
                                             isLoading={isLoading} uploadCb={uploadAvatarCb}>
                                <AvatarApp src={profile.photos.large} shape="square" size={128}/>
                            </ImageUploader>
                            : <AvatarApp src={profile.photos.large} shape="square" size={128}/>
                    }
                </Col>
                <Col span={18}>
                    {
                        mode === 'show'
                            ? <>
                                <ProfileDescription profile={profile}/>
                                {canUpdateProfile &&
                                    <Button type="primary" onClick={() => setMode('edit')}>Edit info</Button>}
                            </>
                            : <ProfileInfoEditor initialValues={editFormInitialValues}
                                                 onFinishEdit={() => setMode('show')}
                            />
                    }
                </Col>
            </Row>
        </>
    )
}

export default ProfileInfo