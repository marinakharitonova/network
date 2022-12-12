import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/authAPI";
import {fetchProfile, setAuthorizedUserAvatar} from "./profileSlice";
import {showError} from "./errorSlice";

interface AuthState {
    id: number | null,
    email: string | null,
    login: string | null,
    isUserAuthorized: boolean,
    status: IRequest["status"]
}

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isUserAuthorized: false,
    status: 'idle'
}

export const fetchAuthorization = createAsyncThunk('auth/fetchAuthorization',
    async (_, {dispatch}) => {

        const result = await authAPI.fetchAuthorization()

        const {resultCode, data: {id}} = result

        if (resultCode === 0) {
            dispatch(fetchProfile({id: id, isAuthorizedUserProfile: true}))
            dispatch(setAuthorizedUserData({...result.data, isUserAuthorized: true}))
        }

    })

export const login = createAsyncThunk('auth/login',
    async (data: ILogin, {dispatch}) => {
        const result = await authAPI.login(data);
        if (result.resultCode === 0) {
            dispatch(fetchAuthorization())

        } else {
            const message = result.messages.length ? result.messages : ['Some error']
            dispatch(showError(message))
        }

    })

export const logout = createAsyncThunk('auth/logout',
    async (_, {dispatch}) => {
        const result = await authAPI.logout()
        if (result.resultCode === 0){
            dispatch(setAuthorizedUserData({isUserAuthorized: false}))
            dispatch(setAuthorizedUserAvatar({status: 'idle', src: null}))
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