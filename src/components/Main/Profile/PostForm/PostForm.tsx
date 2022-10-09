import {Button} from "antd";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import React, {useRef} from "react";

type PostsFormProps = {
    newPostMessage: string,
    addPost: (action: any) => void,
    updateNewPostMessage: (action: any) => void,
}

const PostForm = ({addPost, newPostMessage, updateNewPostMessage}: PostsFormProps): JSX.Element => {

    const ref = useRef<TextAreaRef>(null);

    const handleClick = (): void => {
        addPost({type: 'ADD-POST'});
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const value = e.target.value;
        const action = {type: 'UPDATE-NEW-POST-MESSAGE', message: value};
        updateNewPostMessage(action)
    }

    return (
        <div style={{maxWidth: '600px', marginBottom: '36px'}}>
            <TextArea showCount maxLength={300} allowClear={true}
                      autoSize={{maxRows: 4, minRows: 4}} ref={ref} style={{marginBottom: '16px'}}
                      value={newPostMessage}
                      onChange={handleChange}
            />

            <Button type='primary' onClick={handleClick}>
                Post
            </Button>
        </div>
    )
}

export default PostForm