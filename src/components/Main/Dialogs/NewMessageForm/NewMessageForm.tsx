import TextArea from "antd/es/input/TextArea";
import {Button, Form} from "antd";
import {sendMessage} from "../../../../redux/features/dialogsSlice";
import {useAppDispatch} from "../../../../redux/hooks";
import {useEffect, useState} from "react";

const NewMessageForm = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: any) => {
        dispatch(sendMessage(values.message))
        form.resetFields()
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const isBtnDisabled = () => {
        return !form.getFieldsValue(true).message
    }

    return (
        <Form
            name="newMessage"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{marginTop: 'auto'}}
        >
            <Form.Item
                name="message"
                style={{marginBottom: '0'}}
            >
                <TextArea showCount maxLength={300}/>
            </Form.Item>

            <Form.Item shouldUpdate style={{marginBottom: 0}}>
                {() => (
                    <>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isBtnDisabled()}
                        >
                            Send
                        </Button>
                    </>

                )}
            </Form.Item>

        </Form>
    )
}

export default NewMessageForm