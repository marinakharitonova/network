import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";

import {default as axios} from 'axios';

interface UsersState {
    users: IUser[],
    status: IRequest["status"],
    error: IRequest["error"],
    usersCount: number,
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null,
    usersCount: 0,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (payload: { page: number, count: number }, ee) => {

    const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${payload.count}&page=${payload.page}`, {
        headers: {
            'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
        }
    })

    const users: IUser[] = response.data.items;
    const usersCount = response.data.totalCount;

    return {users, usersCount}
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        toggleFollow: (state, {payload}: PayloadAction<number>) => {
            let currentUser = state.users.find(user => user.id === payload)!;
            currentUser.followed = !currentUser.followed;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload.users

                if (state.usersCount === 0) {
                    state.usersCount = action.payload.usersCount
                }

            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || null
            })
    }
})

export default usersSlice.reducer
export const {toggleFollow} = usersSlice.actions
export const SelectUsers = (state: RootState) => state.users.users
export const SelectFriends = (state: RootState) => state.users.users.filter(user => user.followed)
