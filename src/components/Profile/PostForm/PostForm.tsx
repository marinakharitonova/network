import {FC} from "react";
import {Button, Form} from "antd";
import TextArea from "antd/es/input/TextArea";

const PostForm: FC = () => {
    return (
        <Form
            name='basic'
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            autoComplete='off'
        >
            <Form.Item
                name='post'
            >
                <TextArea showCount maxLength={300} allowClear={true} autoSize={{maxRows: 4, minRows: 4}}/>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Post
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PostForm