import {createSlice} from "@reduxjs/toolkit";

interface ErrorState {
    isError: boolean,
    message?: string
}

const initialState: ErrorState = {
    isError: false,
    message: ''
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        showError: (state, {payload}) => {
            state.isError = payload.isError
            state.message = payload.message
        }
    }
})

export default errorSlice.reducer
export const {showError} = errorSlice.actions