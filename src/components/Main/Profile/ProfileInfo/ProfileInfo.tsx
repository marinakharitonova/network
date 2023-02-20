import {Button, Col, Descriptions, Row} from 'antd';
import AvatarApp from "../../../AvatarApp/AvatarApp";
import {FacebookOutlined, GithubOutlined, SelectOutlined, TwitterOutlined, YoutubeOutlined} from "@ant-design/icons";
import UserStatus from "./UserStatus/UserStatus";
import React from "react";

type ProfileInfoProps = {
    profile: IProfile
}

const ProfileInfo = ({profile} : ProfileInfoProps): JSX.Element => {

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


    return (
        <>
            <UserStatus/>
            <Row gutter={16} style={{marginBottom: '36px'}}>
                <Col span={4}>
                    <AvatarApp src={profile.photos.large} shape="square" size={128}/>
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