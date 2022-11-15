import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/authAPI";
import {profileAPI} from "../../api/profileAPI";

interface AuthState {
    id: number | null,
    email: string | null,
    login: string | null,
    authorizedUser: IProfile | null,
    isUserAuthorized: boolean,
    status: IRequest["status"]
}

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    authorizedUser: null,
    isUserAuthorized: false,
    status: 'idle'
}

export const fetchAuthorization = createAsyncThunk('auth/fetchAuthorization',
    async () => {

        const authData = await authAPI.fetchAuthorization();

        const {id, email, login} = authData.data
        const authResultCode = authData.resultCode

        if (authResultCode === 0) {
            const authorizedUserProfile = await profileAPI.fetchProfile(id)
            return {id, email, login, authResultCode, profile: authorizedUserProfile}
        }

        return {id, email, login, resultCode: authResultCode}
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAuthorization.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAuthorization.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (action.payload.resultCode === 1) {
                    state.isUserAuthorized = false
                } else {
                    state.isUserAuthorized = true
                    state.id = action.payload.id
                    state.login = action.payload.login
                    state.email = action.payload.email
                    state.authorizedUser = action.payload.profile
                }
            })
            .addCase(fetchAuthorization.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export default authSlice.reducer