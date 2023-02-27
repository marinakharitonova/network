import {Button, Checkbox, Form, Input, Typography} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import {Navigate} from "react-router-dom";
import {useLoginMutation} from "../../../features/api/apiSlice";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import {useAppSelector} from "../../../features/hooks";
import useMutationResponseHandler from "../../../hooks/useMutationResponseHandler";

const {Title} = Typography;

const Login = (): JSX.Element => {
    const [login, {isLoading}] = useLoginMutation()
    const currentUser = useAppSelector(selectCurrentUser)
    const handleLoginResponse = useMutationResponseHandler('You are successfully authorized!')

    const onFinish = (values: any) => {
        handleLoginResponse(login(values))
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
                autoComplete="off"
                disabled={isLoading}
            >
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your username!'},
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