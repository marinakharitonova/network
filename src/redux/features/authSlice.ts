import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {default as axios} from "axios";

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

        const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            headers: {
                'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
            },
            withCredentials: true
        })

        const {id, email, login} = response.data.data
        const resultCode = response.data.resultCode

        if (resultCode === 0) {
            const profileResponse = await axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`, {
                headers: {
                    'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
                },
                withCredentials: true
            })
            return {id, email, login, resultCode, profile: profileResponse.data}
        }

        return {id, email, login, resultCode}
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
    }
})

export default authSlice.reducer