import {combineReducers, configureStore, PreloadedState} from '@reduxjs/toolkit'
import profileReducer from "./features/profileSlice";
import dialogsReducer from "./features/dialogsSlice";
import usersReducer from "./features/usersSlice";
import authReducer from "./features/authSlice";
import errorReducer from "./features/errorSlice";

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    auth: authReducer,
    error: errorReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']