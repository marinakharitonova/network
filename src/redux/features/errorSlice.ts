import {createSlice} from "@reduxjs/toolkit";

interface ErrorState {
    messages: string[],
    isError: boolean
}

const initialState: ErrorState = {
    messages: [],
    isError: false
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        showError: (state, {payload}) => {
            state.isError = true
            state.messages = payload
        }
    }
})

export default errorSlice.reducer
export const {showError} = errorSlice.actions