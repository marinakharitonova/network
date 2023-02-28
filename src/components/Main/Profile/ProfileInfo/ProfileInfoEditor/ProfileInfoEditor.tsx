import {Button, Checkbox, Col, Form, Input, Row, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {Rule} from "rc-field-form/lib/interface";
import {ProfileEditQuery, useEditProfileMutation} from "../../../../../features/api/apiSlice";
import useMutationResponseHandler from "../../../../../hooks/useMutationResponseHandler";
import {useAppSelector} from "../../../../../features/hooks";
import {selectCurrentUser} from "../../../../../features/auth/authSlice";

const {Title} = Typography;

type ProfileInfoEditorProps = {
    initialValues: {
        aboutMe: string | null,
        fullName: string,
        lookingForAJob: boolean,
        lookingForAJobDescription: string | null,
        facebook: string | null,
        github: string | null,
        mainLink: string | null,
        twitter: string | null,
        vk: string | null,
        website: string | null,
        youtube: string | null,
    },
    onFinishEdit: () => void
}

const ProfileInfoEditor = ({initialValues, onFinishEdit}: ProfileInfoEditorProps) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({})
    const currentUser = useAppSelector(selectCurrentUser)!

    const [editProfile, {isLoading}] = useEditProfileMutation()
    const handleEditResponse = useMutationResponseHandler({callback: onFinishEdit})

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: ProfileInfoEditorProps['initialValues']) => {
        const contacts = ['facebook', 'github', 'mainLink', 'twitter', 'vk', 'website', 'youtube']
        const query = {contacts: {}} as ProfileEditQuery
        for (let key in values) {
            if (contacts.includes(key)) {
                (query as any).contacts[key] = values[key as keyof typeof values]
            } else {
                (query as any)[key] = values[key as keyof typeof values]
            }
        }

        Object.assign(query, {userId: currentUser.id})

        handleEditResponse(editProfile(query))
    }

    const haveFormValuesChanged = () => {
        const currentValues = form.getFieldsValue(true)

        for (let key in currentValues) {
            if (currentValues[key] !== initialValues[key as keyof typeof initialValues]) {
                return true
            }
        }
        return false
    }

    const isDisabled = () => {
        if (!!form.getFieldsError().filter(({errors}) => errors.length).length) return true

        if (!form.isFieldsTouched(false)) {
            return true
        } else {
            return !haveFormValuesChanged()
        }
    }

    const linkFieldRule: Rule = {type: 'url', message: 'Please input a valid link!'}
    const textFieldRule: Rule = {type: 'string', min: 6, message: 'Must be at least 6 characters long!'}

    return (
        <Form form={form}
              name="profileEdit"
              layout="vertical"
              style={{maxWidth: 600}}
              initialValues={initialValues}
              onFinish={onFinish}
              autoComplete="off"
              disabled={isLoading}
        >
            <Form.Item
                label="Name"
                name="fullName"
                rules={[{required: true, message: 'Please input your name!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="About me"
                name="aboutMe"
                rules={[textFieldRule, {required: true, message: 'Please input info about you!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name="lookingForAJob" valuePropName="checked">
                <Checkbox>Looking for a job</Checkbox>
            </Form.Item>
            <Form.Item
                label="My professional skills"
                name="lookingForAJobDescription"
                rules={[textFieldRule, {required: true, message: 'Please input your professional skills!'}]}
            >
                <Input/>
            </Form.Item>
            <Title level={5}>Contacts</Title>
            <Input.Group compact>
                <Row gutter={8} style={{display: 'flex', width: '100%'}}>
                    <Col span={12}>
                        <Form.Item
                            rules={[linkFieldRule]}
                            label="Your preferred method of contact"
                            name="mainLink"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Github"
                            name="github"
                            rules={[linkFieldRule]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Вконтакте"
                            name="vk"
                            rules={[linkFieldRule]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Link to you personal website"
                            name="website"
                            rules={[linkFieldRule]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Facebook"
                            name="facebook"
                            rules={[linkFieldRule]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Twitter"
                            name="twitter"
                            rules={[linkFieldRule]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Youtube"
                            name="youtube"
                            rules={[linkFieldRule]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Input.Group>
            <Form.Item shouldUpdate>
                {() => (
                    <>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isDisabled()}
                        >
                            Submit
                        </Button>
                        <Button htmlType="button" style={{margin: '0 8px'}} onClick={onFinishEdit}>
                            Go Back
                        </Button>
                    </>
                )}
            </Form.Item>
        </Form>
    )
}

export default ProfileInfoEditor