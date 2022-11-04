import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";

interface FriendsState {
    users: IUser[],
    status: IRequest["status"],
    error: IRequest["error"]
}

const initialState: FriendsState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const usersList: IUser[] = [
        {
            id: '1',
            name: 'Bobi',
            avatarSrc: null,
            status: 'hello!',
            location: {
                country: 'Russia',
                city: 'Moscow'
            },
            isFriend: false
        },
        {
            id: '2',
            name: 'Kitty',
            avatarSrc: 'https://avatars.mds.yandex.net/i?id=8e6ab4f8369e986613acb7cc651e55a0-4352086-images-thumbs&n=13&exp=1',
            status: 'mr mr mr',
            location: null,
            isFriend: true
        }
    ]
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(usersList), 1000)
    })

    const response = await promise

    return response
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        toggleFollow: (state, {payload}: PayloadAction<string>) => {
            let currentUser = state.users.find(user => user.id === payload)!;
            currentUser.isFriend = !currentUser.isFriend;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload as IUser[]
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default usersSlice.reducer
export const {toggleFollow} = usersSlice.actions
export const SelectUsers = (state: RootState) => state.users.users
export const SelectFriends = (state: RootState) => state.users.users.filter(user => user.isFriend)
