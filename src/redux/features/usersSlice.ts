import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    createEntityAdapter,
} from "@reduxjs/toolkit"
import {RootState} from "../store";

import {default as axios} from 'axios';

interface UsersState {
    status: IRequest["status"],
    error: IRequest["error"],
    usersCount: number,
}

const additionalState: UsersState = {
    status: 'idle',
    error: null,
    usersCount: 0,
}

const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState(additionalState);

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
            const currentUser = state.entities[payload];
            if (currentUser) {
                currentUser.followed = !currentUser.followed;
            }

        }
    },
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
    }
})

export default usersSlice.reducer
export const {toggleFollow} = usersSlice.actions

export const {
    selectAll: selectUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors<RootState>(state => state.users)

