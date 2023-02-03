import {Descriptions, Row, Col, Button} from 'antd';
import AvatarApp from "../../../AvatarApp/AvatarApp";
import {FacebookOutlined, GithubOutlined, SelectOutlined, TwitterOutlined, YoutubeOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../../../redux/hooks";
import UserStatus from "./UserStatus/UserStatus";
import React from "react";

const ProfileInfo = (): JSX.Element => {

    const info = useAppSelector(state => state.profile.profileInfo);

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
                    <AvatarApp src={info.photos.large} shape="square" size={128}/>
                </Col>
                <Col span={18}>
                    <Descriptions style={{marginBottom: '36px'}}>
                        <Descriptions.Item label="User name" span={3}>{info.fullName}</Descriptions.Item>
                        {info.aboutMe &&
                            <Descriptions.Item label="About me" span={3}>{info.aboutMe}</Descriptions.Item>
                        }
                        <Descriptions.Item
                            label="Looking for a job" span={3}>
                            {info.lookingForAJob ? 'Yes' : 'No'}
                            {info.lookingForAJobDescription &&
                                <>
                                    <br/> {info.lookingForAJobDescription}
                                </>
                            }
                        </Descriptions.Item>
                        {hasContacts(info.contacts) &&
                            <Descriptions.Item label="Contacts" span={3} labelStyle={{alignSelf: 'center'}}>
                                {info.contacts.github &&
                                    <Button
                                        type='link'
                                        icon={<GithubOutlined/>}
                                        href={validateUrl(info.contacts.github)}
                                        target='_blank'
                                    />
                                }
                                {info.contacts.facebook &&
                                    <Button
                                        type='link'
                                        icon={<FacebookOutlined/>}
                                        href={validateUrl(info.contacts.facebook)}
                                        target='_blank'
                                    />
                                }
                                {info.contacts.twitter &&
                                    <Button
                                        type='link'
                                        icon={<TwitterOutlined/>}
                                        href={validateUrl(info.contacts.twitter)}
                                        target='_blank'
                                    />
                                }
                                {info.contacts.website &&
                                    <Button
                                        type='link'
                                        icon={<SelectOutlined/>}
                                        href={validateUrl(info.contacts.website)}
                                        target='_blank'
                                    />
                                }
                                {info.contacts.youtube &&
                                    <Button
                                        type='link'
                                        icon={<YoutubeOutlined/>}
                                        href={validateUrl(info.contacts.youtube)}
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