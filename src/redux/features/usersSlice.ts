import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from "@reduxjs/toolkit"
import {RootState} from "../store";
import {usersAPI} from "../../api/usersAPI";

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

        const usersData = await usersAPI.fetchUsers(payload.count, payload.page)

        return {users: usersData.items, usersCount: usersData.totalCount}
    })

export const toggleFollow = createAsyncThunk('users/toggleFollow',
    async (payload: { userId: number, isFollow: boolean }, ee) => {

        let data
        if (payload.isFollow) {
           data = await usersAPI.unFollow(payload.userId)
        } else {
            data = await usersAPI.follow(payload.userId)
        }

        return {resultCode: data.resultCode, userId: payload.userId}
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

