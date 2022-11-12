import {Descriptions, Row, Col, Button} from 'antd';
import AvatarApp from "../../../AvatarApp/AvatarApp";
import {FacebookOutlined, GithubOutlined, SelectOutlined, TwitterOutlined, YoutubeOutlined} from "@ant-design/icons";

type ProfileInfoProps = {
    profileInfo: IProfile
}

const ProfileInfo = ({profileInfo}: ProfileInfoProps): JSX.Element | null => {
    function validateUrl(str: string) {
        if(/(http(s?)):\/\//i.test(str)) {
            return str
        } else {
            return `https:\\${str}`
        }
    }

    function hasContacts(contacts: IProfile["contacts"]){
        return Object.values(contacts).some(elem => elem !== null)
    }

    console.log('render profile info');

    return (
        <Row gutter={16} style={{marginBottom: '36px'}}>
            <Col span={4}>
                <AvatarApp src={profileInfo.photos.large} shape="square" size={128}/>
            </Col>
            <Col span={18}>
                <Descriptions style={{marginBottom: '36px'}}>
                    <Descriptions.Item label="User name" span={3}>{profileInfo.fullName}</Descriptions.Item>
                    {profileInfo.aboutMe &&
                        <Descriptions.Item label="About me" span={3}>{profileInfo.aboutMe}</Descriptions.Item>
                    }
                    <Descriptions.Item
                        label="Looking for a job" span={3}>
                        {profileInfo.lookingForAJob ? 'Yes' : 'No'}
                        {profileInfo.lookingForAJobDescription &&
                            <>
                                <br/> {profileInfo.lookingForAJobDescription}
                            </>
                        }
                    </Descriptions.Item>
                    {hasContacts(profileInfo.contacts) &&
                        <Descriptions.Item label="Contacts" span={3} labelStyle={{alignSelf: 'center'}}>
                            {profileInfo.contacts.github &&
                                <Button
                                    type='link'
                                    icon={<GithubOutlined/>}
                                    href={validateUrl(profileInfo.contacts.github)}
                                    target='_blank'
                                />
                            }
                            {profileInfo.contacts.facebook &&
                                <Button
                                    type='link'
                                    icon={<FacebookOutlined/>}
                                    href={validateUrl(profileInfo.contacts.facebook)}
                                    target='_blank'
                                />
                            }
                            {profileInfo.contacts.twitter &&
                                <Button
                                    type='link'
                                    icon={<TwitterOutlined/>}
                                    href={validateUrl(profileInfo.contacts.twitter)}
                                    target='_blank'
                                />
                            }
                            {profileInfo.contacts.website &&
                                <Button
                                    type='link'
                                    icon={<SelectOutlined/>}
                                    href={validateUrl(profileInfo.contacts.website)}
                                    target='_blank'
                                />
                            }
                            {profileInfo.contacts.youtube &&
                                <Button
                                    type='link'
                                    icon={<YoutubeOutlined/>}
                                    href={validateUrl(profileInfo.contacts.youtube)}
                                    target='_blank'
                                />
                            }
                        </Descriptions.Item>
                    }
                </Descriptions>
            </Col>
        </Row>
    )
}

export default ProfileInfo