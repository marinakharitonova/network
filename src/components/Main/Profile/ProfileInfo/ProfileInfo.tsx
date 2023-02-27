import {Button, Col, Descriptions, Row} from 'antd';
import AvatarApp from "../../../AvatarApp/AvatarApp";
import {FacebookOutlined, GithubOutlined, SelectOutlined, TwitterOutlined, YoutubeOutlined} from "@ant-design/icons";
import UserStatus from "./UserStatus/UserStatus";
import React, {useContext} from "react";
import {useUpdateAvatarMutation} from "../../../../features/api/apiSlice";
import {MessageApiContext} from "../../../../context/messageApi-context";
import ImageUploader from "../../../ImageUploader/ImageUploader";
import {useAppSelector} from "../../../../features/hooks";
import {selectCurrentUser} from "../../../../features/auth/authSlice";

type ProfileInfoProps = {
    profile: IProfile
};

const ProfileInfo = ({profile}: ProfileInfoProps): JSX.Element => {
    const messageApi = useContext(MessageApiContext)
    const currentUser = useAppSelector(selectCurrentUser)

    const canUpdateAvatar = currentUser && currentUser.id === profile.userId

    function validateUrl(str: string) {
        if (/(http(s?)):\/\//i.test(str)) {
            return str
        } else {
            return `https:\\${str}`
        }
    }

    function hasContacts(contacts: IProfile["contacts"]) {
        return Object.values(contacts).some(elem => elem !== null)
    }

    const [updateAvatar, {isLoading}] = useUpdateAvatarMutation()

    const uploadAvatarCb = (formData: FormData) => {
        updateAvatar({data: formData, userId: profile.userId})
            .unwrap()
            .then((response) => {
                if (response.resultCode === 1) {
                    messageApi.open({type: 'error', content: response.messages[0]})
                }
            })
            .catch((error) => {
                let errMsg = ''
                if (error && 'status' in error) {
                    errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
                }
                messageApi.open({type: 'error', content: errMsg})
            })
    };

    return (
        <>
            <UserStatus userId={profile.userId}/>
            <Row gutter={16} style={{marginBottom: '36px'}}>
                <Col span={4}>
                    {
                        canUpdateAvatar
                            ? <ImageUploader imageUrl={profile.photos.large} size={128}
                                             isLoading={isLoading} uploadCb={uploadAvatarCb}>
                                <AvatarApp src={profile.photos.large} shape="square" size={128}/>
                            </ImageUploader>
                            : <AvatarApp src={profile.photos.large} shape="square" size={128}/>
                    }
                </Col>
                <Col span={18}>
                    <Descriptions style={{marginBottom: '36px'}}>
                        <Descriptions.Item label="User name" span={3}>{profile.fullName}</Descriptions.Item>
                        {profile.aboutMe &&
                            <Descriptions.Item label="About me" span={3}>{profile.aboutMe}</Descriptions.Item>
                        }
                        <Descriptions.Item
                            label="Looking for a job" span={3}>
                            {profile.lookingForAJob ? 'Yes' : 'No'}
                            {profile.lookingForAJobDescription &&
                                <>
                                    <br/> {profile.lookingForAJobDescription}
                                </>
                            }
                        </Descriptions.Item>
                        {hasContacts(profile.contacts) &&
                            <Descriptions.Item label="Contacts" span={3} labelStyle={{alignSelf: 'center'}}>
                                {profile.contacts.github &&
                                    <Button
                                        type='link'
                                        icon={<GithubOutlined/>}
                                        href={validateUrl(profile.contacts.github)}
                                        target='_blank'
                                    />
                                }
                                {profile.contacts.facebook &&
                                    <Button
                                        type='link'
                                        icon={<FacebookOutlined/>}
                                        href={validateUrl(profile.contacts.facebook)}
                                        target='_blank'
                                    />
                                }
                                {profile.contacts.twitter &&
                                    <Button
                                        type='link'
                                        icon={<TwitterOutlined/>}
                                        href={validateUrl(profile.contacts.twitter)}
                                        target='_blank'
                                    />
                                }
                                {profile.contacts.website &&
                                    <Button
                                        type='link'
                                        icon={<SelectOutlined/>}
                                        href={validateUrl(profile.contacts.website)}
                                        target='_blank'
                                    />
                                }
                                {profile.contacts.youtube &&
                                    <Button
                                        type='link'
                                        icon={<YoutubeOutlined/>}
                                        href={validateUrl(profile.contacts.youtube)}
                                        target='_blank'
                                    />
                                }
                            </Descriptions.Item>
                        }
                    </Descriptions>
                </Col>
            </Row>
        </>
    )
}

export default ProfileInfo