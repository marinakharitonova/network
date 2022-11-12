import { configureStore } from '@reduxjs/toolkit'
import profileSlice from "./features/profileSlice";
import dialogsSlice from "./features/dialogsSlice";
import usersSlice from "./features/usersSlice";

export const store = configureStore({
    reducer: {
        profile: profileSlice,
        dialogs: dialogsSlice,
        users: usersSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch