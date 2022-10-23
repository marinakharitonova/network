import {Button} from "antd";
import TextArea from "antd/es/input/TextArea";
import {addPost} from "../../../../redux/features/profileSlice";
import {useAppDispatch} from "../../../../redux/hooks";
import {useTextarea} from "../../../../hooks/useTextarea";

const PostForm = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const textarea = useTextarea('')

    const handleClick = (): void => {
        dispatch(addPost(textarea.getValue()));
        textarea.clearValue();
    }

    return (
        <div style={{maxWidth: '600px', marginBottom: '36px'}}>
            <TextArea {...textarea.field}
                      showCount maxLength={300} allowClear={true}
                      autoSize={{maxRows: 4, minRows: 4}} style={{marginBottom: '16px'}}
            />

            <Button type='primary' onClick={handleClick}>
                Post
            </Button>
        </div>
    )
}

export default PostForm