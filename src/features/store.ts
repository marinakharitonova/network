import {combineReducers, configureStore, PreloadedState} from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice";
import {apiSlice} from "./api/apiSlice";
import {newsApiSlice} from "./news/news";

const rootReducer = combineReducers({
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [newsApiSlice.reducerPath]: newsApiSlice.reducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(apiSlice.middleware).concat(newsApiSlice.middleware),
        preloadedState,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']