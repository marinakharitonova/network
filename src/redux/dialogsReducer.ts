import {IMessage} from "../../models/message.module";

const UPDATE_MESSAGE = 'UPDATE-MESSAGE';
const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsReducer = (state: any, action: any) => {
    switch (action.type) {
        case UPDATE_MESSAGE:
            state.messageText = action.message;
            return state
        case SEND_MESSAGE:
            const newMessage : IMessage = {
                id: 3,
                author: {
                    avatarSrc: null,
                },
                text: state.messageText,
            };
            state.messages.push(newMessage);
            state.messageText = '';
            return state
        default:
            return state
    }
}

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE});
export const updateMessageActionCreator = (value: string) =>
    ({type: UPDATE_MESSAGE, message: value});

export default dialogsReducer