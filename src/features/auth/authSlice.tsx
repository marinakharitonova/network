import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {apiSlice} from "../api/apiSlice";

type AuthState = {
    user: {
        id: number,
        email: string,
        login: string,
    } | null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null} as AuthState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                apiSlice.endpoints.auth.matchFulfilled,
                (state, action) => {
                    if (action.payload.resultCode === 0) {
                        state.user = action.payload.data
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.logout.matchFulfilled,
                (state, action) => {
                    if (action.payload.resultCode === 0) {
                        state.user = null
                    }
                }
            )
    }
})

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
