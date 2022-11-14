import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from "@reduxjs/toolkit"
import {RootState} from "../store";

import {default as axios} from 'axios';

interface UsersState {
    status: IRequest["status"],
    error: IRequest["error"],
    usersCount: number
}

const additionalInitialState: UsersState = {
    status: 'idle',
    error: null,
    usersCount: 0
}

const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState(additionalInitialState);

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (payload: { page: number, count: number }, ee) => {

        const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${payload.count}&page=${payload.page}`, {
            headers: {
                'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
            },
            withCredentials: true
        })

        const users = response.data.items;
        const usersCount = response.data.totalCount;

        return {users, usersCount}
    })

export const toggleFollow = createAsyncThunk('users/toggleFollow',
    async (payload: { id: number, isFollow: boolean }, ee) => {

        const url = `https://social-network.samuraijs.com/api/1.0/follow/${payload.id}`

        let response
        if (payload.isFollow) {
            response = await axios.delete(url, {
                headers: {
                    'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
                },
                withCredentials: true
            })
        } else {
            response = await axios.post(url, {}, {
                headers: {
                    'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
                },
                withCredentials: true
            })
        }

        return {resultCode: response.data.resultCode, userId: payload.id}
    })


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'

                usersAdapter.setAll(state, action.payload.users)

                if (state.usersCount === 0) {
                    state.usersCount = action.payload.usersCount
                }

            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || null
            })
            .addCase(toggleFollow.fulfilled, (state, action) => {
                if (action.payload.resultCode === 0){
                    const user = state.entities[action.payload.userId]
                    if (user) {
                        user.followed = !user.followed
                    }
                }
            })
    }
})

export default usersSlice.reducer

export const {
    selectAll: selectUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors<RootState>(state => state.users)

