import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface PostsState {
    status: IRequest["status"],
    error: IRequest["error"],
    postsCount: number,
}

const additionalInitialState: PostsState = {
    status: 'idle',
    error: null,
    postsCount: 0,
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

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const promise = new Promise((res, rej) => {
        setTimeout(() => res(postsData), 3000)
    })

    const posts = await promise;

    return posts
})

const postsSlice = createSlice({
    name: "posts",
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

            postsAdapter.addOne(state, newPost)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                // @ts-ignore
                postsAdapter.addMany(state, action.payload)

            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || null
            })
    }
})

export default postsSlice.reducer
export const {addPost} = postsSlice.actions

// export const {
//     selectAll: selectPosts,
//     selectById: selectPostById,
//     selectIds: selectPostIds
// } = postsAdapter.getSelectors<RootState>(state => state.posts)