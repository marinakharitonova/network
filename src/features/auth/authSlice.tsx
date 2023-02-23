import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {apiSlice} from "../api/apiSlice";

type AuthState = {
    user: {
        id: number,
        email: string,
        login: string,
    } | null
    apiKey: string | null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, apiKey: null} as AuthState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                apiSlice.endpoints.auth.matchFulfilled,
                (state, action) => {
                    if (action.payload.resultCode === 0) {
                        state.user = action.payload.data
                        state.apiKey = '41b53631-d409-42fd-9c23-c463cd4b426b'
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.logout.matchFulfilled,
                (state, action) => {
                    if (action.payload.resultCode === 0) {
                        state.user = null
                        state.apiKey = null
                    }
                }
            )
    }
})

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
