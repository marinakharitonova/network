import {Button} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import {addPostActionCreator, updateNewPostMessageActionCreator} from "../../../../redux/profileReducer";

type PostsFormProps = {
    newPostMessage: string,
    addPost: (action: any) => void,
    updateNewPostMessage: (action: any) => void,
}

const PostForm = ({addPost, newPostMessage, updateNewPostMessage}: PostsFormProps): JSX.Element => {

    const handleClick = (): void => {
        addPost(addPostActionCreator());
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = e.target.value;
        updateNewPostMessage(updateNewPostMessageActionCreator(value))
    }

    return (
        <div style={{maxWidth: '600px', marginBottom: '36px'}}>
            <TextArea showCount maxLength={300} allowClear={true}
                      autoSize={{maxRows: 4, minRows: 4}} style={{marginBottom: '16px'}}
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