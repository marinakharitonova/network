import {Button, Descriptions} from "antd";
import {
    FacebookOutlined,
    GithubOutlined,
    LinkOutlined, MessageOutlined,
    SelectOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons";
import React from "react";

type ProfileDescriptionProps = {
    profile: IProfile
};

const ProfileDescription = ({profile}: ProfileDescriptionProps) => {
    function validateUrl(str: string) {
        if (/(http(s?)):\/\//i.test(str)) {
            return str
        } else {
            return `https:\\${str}`
        }
    }

    function hasContacts(contacts: IProfile["contacts"]) {
        const copy = Object.assign({}, contacts)
        delete copy.instagram;

        return Object.values(copy).some(elem => elem !== null)
    }

    return (
        <Descriptions style={{marginBottom: '36px'}}>
            <Descriptions.Item label="Name" span={3}>{profile.fullName}</Descriptions.Item>
            {profile.aboutMe &&
                <Descriptions.Item label="About me" span={3}>{profile.aboutMe}</Descriptions.Item>
            }
            <Descriptions.Item
                label="Looking for a job" span={3}>
                {profile.lookingForAJob ? 'Yes' : 'No'}
            </Descriptions.Item>
            {profile.lookingForAJobDescription &&
                <Descriptions.Item label="My professional skills"
                                   span={3}>{profile.lookingForAJobDescription}</Descriptions.Item>
            }
            {hasContacts(profile.contacts) &&
                <Descriptions.Item label="Contacts" span={3} labelStyle={{alignSelf: 'center'}}>
                    {profile.contacts.mainLink &&
                        <Button
                            type='link'
                            icon={<LinkOutlined/>}
                            href={validateUrl(profile.contacts.mainLink)}
                            target='_blank'
                        />
                    }
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
                    {profile.contacts.vk &&
                        <Button
                            type='link'
                            icon={<MessageOutlined/>}
                            href={validateUrl(profile.contacts.vk)}
                            target='_blank'
                        />
                    }
                </Descriptions.Item>
            }
        </Descriptions>
    )
}

export default ProfileDescription