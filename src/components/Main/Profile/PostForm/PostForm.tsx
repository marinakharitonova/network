import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useAppDispatch} from "../../../../redux/hooks";
import {addPost} from "../../../../redux/features/profileSlice";
import {useEffect, useState} from "react";

const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const PostForm = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: any) => {
        dispatch(addPost(values.post))
        form.resetFields()

    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            name="newPost"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{maxWidth: '600px', marginBottom: '36px'}}
        >
            <Form.Item
                name="post"
                style={{marginBottom: '0'}}
            >
                <TextArea showCount maxLength={300}/>
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!form.getFieldsValue(true).post}
                        >
                            Post
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{marginLeft: '12px'}}
                                disabled={!form.getFieldsValue(true).post}
                        >
                            Reset
                        </Button>
                    </>

                )}
            </Form.Item>
        </Form>
    )
}

export default PostForm