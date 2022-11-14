import {createAsyncThunk, createEntityAdapter, createSlice, EntityId, PayloadAction} from "@reduxjs/toolkit"
import {default as axios} from "axios";
import {RootState} from "../store";

interface ProfileState {
    status: IRequest["status"],
    error: IRequest["error"],
    profileInfo: IProfile,
    postsCount: number,
}

const additionalInitialState: ProfileState = {
    status: 'idle',
    error: null,
    profileInfo: {} as IProfile,
    postsCount: 0
}

const postsAdapter = createEntityAdapter<IPost>();

const initialState = postsAdapter.getInitialState(additionalInitialState);

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

export const fetchProfile = createAsyncThunk('profile/fetchProfileInfo',
    async (id: number, ee) => {

        const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`, {
            headers: {
                'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
            }
        })

        const profileInfo: IProfile = response.data;

        return {profileInfo, posts: postsData}
    })

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.status = action.payload
        },
        addPost: (state, {payload}: PayloadAction<string>) => {
            const newPost: IPost = {
                id: 5,
                avatarSrc: null,
                title: 'Title new',
                description: payload,
                likesCount: 0
            }

            postsAdapter.setOne(state, newPost)
        },
        likePost: (state, action: PayloadAction<EntityId>) => {
            const existingPost = state.entities[action.payload]
            if (existingPost) {
                existingPost.likesCount++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.profileInfo = action.payload.profileInfo
                postsAdapter.setAll(state, action.payload.posts)
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || null
            })
    }
})

export const {changeStatus, addPost, likePost} = profileSlice.actions
export default profileSlice.reducer
export const {
    selectAll: selectPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors<RootState>(state => state.profile)