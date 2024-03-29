import {Button, Checkbox, Form, Input, Typography} from 'antd';
import {KeyOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {useGetCaptchaQuery, useLoginMutation} from "../../../features/api/apiSlice";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import {useAppSelector} from "../../../features/hooks";
import useMutationResponseHandler from "../../../hooks/useMutationResponseHandler";
import {MessageApiContext} from "../../../context/messageApi-context";

const {Title} = Typography;

const Login = (): JSX.Element => {
    const [login, {isLoading}] = useLoginMutation()
    const currentUser = useAppSelector(selectCurrentUser)
    const handleLoginResponse = useMutationResponseHandler({message: 'You are successfully authorized!'})
    const messageApi = useContext(MessageApiContext)

    const [skipCaptcha, setSkipCaptcha] = useState(true)

    const {data: captcha, isSuccess: isCaptchaSuccess} = useGetCaptchaQuery(undefined, {skip: skipCaptcha})

    const onFinish = (values: any) => {
        handleLoginResponse(login(values))

        login(values)
            .unwrap()
            .then((result) => {
                if (result.resultCode === 10) {
                    messageApi.open({type: 'error', content: result.messages[0]})
                    setSkipCaptcha(false)
                }
            })
    }

    if (currentUser) return <Navigate replace to="/profile"/>

    return (
        <>
            <Title level={2}>Login</Title>
            <Form
                name="login"
                wrapperCol={{span: 12}}
                initialValues={{rememberMe: true}}
                onFinish={onFinish}
                disabled={isLoading}
            >
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'},
                        {type: "email", message: 'It is not a valid email!'}]}

                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder={"email"}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder={"password"}/>
                </Form.Item>

                <Form.Item name="rememberMe" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {
                    isCaptchaSuccess
                    && <>
                        <img src={captcha.url} alt=""
                             style={{width: '150px', height: '50px', objectFit: 'cover', marginBottom: '5px'}}/>
                        <Form.Item
                            name="captcha"
                            rules={[{required: true, message: 'Please input symbols from image!'}]}
                        >
                            <Input prefix={<KeyOutlined className="site-form-item-icon"/>}
                                   placeholder={"Symbols from image"}/>
                        </Form.Item>
                    </>
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login