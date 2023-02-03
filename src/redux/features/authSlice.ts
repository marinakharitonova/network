import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/authAPI";
import {showError} from "./errorSlice";
import {RootState} from "../store";
import {profileAPI} from "../../api/profileAPI";

interface AuthState {
    id: number | null,
    email: string | null,
    login: string | null,
    isUserAuthorized: boolean,
    avatar: string | null
    status: IRequest["status"]
}

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isUserAuthorized: false,
    avatar: null,
    status: 'idle'
}

export const fetchAuthorization = createAsyncThunk('auth/fetchAuthorization',
    async (_, {dispatch}) => {

        const result = await authAPI.fetchAuthorization()

        const {resultCode, data: {id}} = result

        if (resultCode === 0) {
            dispatch(fetchAuthorizedUserAvatar(id))
            dispatch(setAuthorizedUserData({...result.data, isUserAuthorized: true}))
        }
        return result.data
    })

export const fetchAuthorizedUserAvatar = createAsyncThunk('profile/fetchAuthorizedUserAvatar',
    async (id: number, {dispatch}) => {

        const {resultCode, data: {photos: {small}}} = await profileAPI.fetchProfile(id)

        if (resultCode === 0) {
            dispatch(setAuthorizedUserData({avatar: small}))
        }

    })

export const login = createAsyncThunk('auth/login',
    async (data: ILogin, {dispatch}) => {
        const result = await authAPI.login(data);
        if (result.resultCode === 0) {
            dispatch(fetchAuthorization())

        } else {
            dispatch(showError({isError: true, message: result.messages[0]}))
        }

    })

export const logout = createAsyncThunk('auth/logout',
    async (_, {dispatch}) => {
        const result = await authAPI.logout()
        if (result.resultCode === 0) {
            dispatch(setAuthorizedUserData({isUserAuthorized: false}))
        }
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthorizedUserData: (state, {payload}) => {
            state.id = payload.id || null
            state.email = payload.email || null
            state.login = payload.login || null
            state.avatar = payload.avatar || null
            state.isUserAuthorized = payload.isUserAuthorized
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuthorization.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchAuthorization.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export default authSlice.reducer
export const {setAuthorizedUserData} = authSlice.actions
export const selectAuthorizationStatus = (state: RootState) => state.auth.status