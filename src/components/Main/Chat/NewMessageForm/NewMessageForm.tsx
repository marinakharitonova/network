import TextArea from "antd/es/input/TextArea";
import {Button, Form} from "antd";
import {useEffect, useState} from "react";

type NewMessageFormProps = {
    onMessageSend: (v: string) => void
}

const NewMessageForm = ({onMessageSend} : NewMessageFormProps): JSX.Element => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: any) => {
        onMessageSend(values.message)
        form.resetFields()
    }

    const isBtnDisabled = () => {
        return !form.getFieldsValue(true).message
    }

    return (
        <Form
            name="newMessage"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            style={{marginTop: 'auto'}}
        >
            <Form.Item
                name="message"
                style={{marginBottom: '15px'}}
            >
                <TextArea showCount maxLength={300} placeholder={'Type your message'}/>
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