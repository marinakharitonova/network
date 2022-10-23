import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";

interface ProfileState {
    posts: IPost[];
    newPostMessage: string;
}

const postsData: IPost[] = [
    {
        id: 1,
        avatarSrc: 'https://avatars.mds.yandex.net/i?id=efb47ec07435b74e8dcf00ba0dba0874-5236416-images-thumbs&n=13&exp=1',
        title: 'Ant Design Title 1',
        description: 'desc1',
        likesCount: 100
    },
    {
        id: 2,
        avatarSrc: null,
        title: 'Ant Design Title 2',
        description: 'desc2',
        likesCount: 3
    },
    {
        id: 3,
        avatarSrc: null,
        title: 'Title 3',
        description: 'Hello, Marina',
        likesCount: 7000
    }
];

const initialState: ProfileState = {
    posts: postsData,
    newPostMessage: '',
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addPost: (state, {payload}: PayloadAction<string>) => {
            const newPost: IPost = {
                id: 5,
                avatarSrc: null,
                title: 'Title new',
                description: payload,
                likesCount: 0
            }

            state.posts.push(newPost);
        },

        updateNewPostMessage: (state, {payload}: PayloadAction<string>) => {
            state.newPostMessage = payload
        },
    },
})

export const {addPost} = profileSlice.actions
export const SelectProfilePosts = (state: RootState) => state.profile.posts
export default profileSlice.reducer