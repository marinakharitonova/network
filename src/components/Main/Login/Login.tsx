import {Button, Checkbox, Form, Input, Typography} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import {Navigate} from "react-router-dom";
import {useLoginMutation} from "../../../redux/features/api/apiSlice";
import {selectCurrentUser} from "../../../redux/features/auth/authSlice";
import {useAppSelector} from "../../../redux/hooks";
import {useErrorNotification} from "../../../hooks/useErrorNotification";
import {createPortal} from "react-dom";

const {Title} = Typography;

const Login = (): JSX.Element => {
    const [login] = useLoginMutation()
    const currentUser = useAppSelector(selectCurrentUser)
    const [contextHolder, showError] = useErrorNotification()

    const onFinish = (values: any) => {
        login(values)
            .unwrap()
            .then((payload) => {
                if (payload.resultCode === 1) {
                    showError(payload.messages[0])
                }
            })
            .catch((error) => {
                let errMsg = ''
                if (error && 'status' in error) {
                    errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
                }
                showError(errMsg)
            })
    }

    if (currentUser) return <Navigate replace to="/profile"/>

    return (
        <>
            {createPortal(contextHolder, document.body)}
            <Title level={2}>Login</Title>
            <Form
                name="login"
                wrapperCol={{span: 12}}
                initialValues={{rememberMe: true}}
                onFinish={onFinish}
                autoComplete="off"
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