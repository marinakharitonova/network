import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {sendMessage} from "../../../../redux/features/dialogsSlice";
import {useAppDispatch} from "../../../../redux/hooks";
import {useTextarea} from "../../../../hooks/useTextarea";

const NewMessageForm = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const textarea = useTextarea('');

    const handleClick = () => {
        dispatch(sendMessage(textarea.getValue()))
        textarea.clearValue();
    }

    return (
        <div style={{marginTop: 'auto'}}>
            <TextArea {...textarea.field}
                      showCount maxLength={1000} allowClear={true}
                      autoSize={{maxRows: 4, minRows: 4}}
                      style={{marginBottom: '16px'}}
            />
            <Button type='primary' onClick={handleClick}>
                Send
            </Button>
        </div>
    )
}

export default NewMessageForm