import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";

interface DialogsState {
    messages: IMessage[],
    dialogs: IDialog[],
}

const dialogsData: IDialog[] = [
    {
        id: 1,
        name: 'Dima',
        avatarSrc: null,
    },
    {
        id: 2,
        name: 'Valera',
        avatarSrc: null,
    },
    {
        id: 3,
        name: 'Sveta',
        avatarSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/1614856361_2-p-foto-devushek-na-fone-6.jpg',
    },
]
const messagesData: IMessage[] = [
    {
        id: 1,
        author: {
            avatarSrc: null,
        },
        text: 'blabla'
    },
    {
        id: 2,
        author: {
            avatarSrc: null,
        },
        text: 'Hello'
    },
]

const initialState: DialogsState = {
    messages: messagesData,
    dialogs: dialogsData,
}

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        sendMessage: (state, {payload}: PayloadAction<string>) => {
            const newMessage: IMessage = {
                id: 3,
                author: {
                    avatarSrc: null,
                },
                text: payload,
            };
            state.messages.push(newMessage);
        },
    }
})

export const {sendMessage} = dialogsSlice.actions

export default dialogsSlice.reducer

export const SelectDialogs = (state: RootState) => state.dialogs.dialogs
export const SelectMessages = (state: RootState) => state.dialogs.messages