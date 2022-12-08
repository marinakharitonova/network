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

export const login = createAsyncThunk('auth/login',
    async (data: ILogin, {dispatch}) => {
        const result = await authAPI.login(data);
        if (result.resultCode === 0) {
            return await authAPI.login(data)
        } else throw new Error(result.messages.join(','))

    })

export const logout = createAsyncThunk('auth/logout',
    async (n) => {
        return await authAPI.logout()
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
            .addCase(login.fulfilled, (state, action) => {
                const {resultCode, data: {userId}} = action.payload
                if (resultCode === 0) {
                    state.isUserAuthorized = true
                    state.id = userId
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                const {resultCode} = action.payload
                if (resultCode === 0) {
                    state.isUserAuthorized = false
                    state.id = null
                    state.email = null
                    state.login = null
                    state.authorizedUser = null
                }
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.error.message);
            })
    }
})

export default authSlice.reducer