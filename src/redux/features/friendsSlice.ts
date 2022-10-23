import {createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store";

interface FriendsState {
    friends: IFriend[];
}

const friendsList: IFriend[] = [
    {
        id: 1,
        name: 'Bobi',
        avatarSrc: null,
        status: 'hello!'
    },
    {
        id: 1,
        name: 'Kitty',
        avatarSrc: 'https://avatars.mds.yandex.net/i?id=8e6ab4f8369e986613acb7cc651e55a0-4352086-images-thumbs&n=13&exp=1',
        status: 'mr mr mr'
    }
]

const initialState: FriendsState = {
    friends: friendsList,
}

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {}
})

export default friendsSlice.reducer

export const SelectFriends = (state: RootState) => state.friends