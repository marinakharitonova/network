import {Button, Form} from "antd";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import React, {useRef} from "react";

const PostForm = (): JSX.Element => {

    const ref = useRef<TextAreaRef>(null);

    const addPost = (): void => {
        alert(ref.current?.resizableTextArea?.props.value)
    }

    return (
        <div style={{maxWidth: '600px', marginBottom: '36px'}}>
            <TextArea showCount maxLength={300} allowClear={true}
                      autoSize={{maxRows: 4, minRows: 4}} ref={ref} style={{marginBottom: '16px'}}/>
            <Button type='primary' htmlType='submit' onClick={addPost}>
                Post
            </Button>
        </div>
    )
}

export default PostForm