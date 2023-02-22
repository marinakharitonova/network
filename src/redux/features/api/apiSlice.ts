import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../../store";

type UsersResponse = {
    users: IUser[],
    totalCount: number,
}

type UsersQuery = {
    page: number,
    pageSize: number
}

type UserFollowQuery = {
    userId: number,
    isFollowed: boolean,
    page: number,
    pageSize: number
}

type AuthRawResponse = {
    data: {
        email: string,
        login: string,
        id: number,
    },
    fieldsError: Array<string>,
    messages: Array<string>,
    resultCode: number
}

type LoginRawResponse = {
    data: {
        userId: number,
    },
    fieldsError: Array<string>,
    messages: Array<string>,
    resultCode: number
}

type LoginQuery = {
    email: string,
    password: string,
    rememberMe: boolean
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    prepareHeaders: (headers, {getState}) => {
        const apiKey = (getState() as RootState).auth.apiKey
        if (apiKey) {
            headers.set('API-KEY', apiKey)
        }
        return headers
    },
    credentials: 'include',
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Profile', 'Auth'],
    endpoints: builder => ({
        getUsers: builder.query<UsersResponse, UsersQuery>({
            query: (args) => `users?count=${args.pageSize}&page=${args.page}`,
            transformResponse: (result: { items: IUser[], totalCount: number, error: null }, meta, arg) => {
                return {
                    users: result.items,
                    totalCount: result.totalCount
                }
            }
        }),
        toggleFollow: builder.mutation({
            query: (args: UserFollowQuery) => ({
                url: `follow/${args.userId}`,
                method: args.isFollowed ? 'DELETE' : 'POST'
            }),
            async onQueryStarted({userId, isFollowed, page, pageSize}, {
                dispatch,
                queryFulfilled,
            }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getUsers', {page: page, pageSize: pageSize}, draft => {
                        const selectedUser = draft.users.find(user => user.id === userId)
                        if (selectedUser) {
                            selectedUser.followed = !isFollowed
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),
        getProfile: builder.query<IProfile, number>({
            query: (userId) => `profile/${userId}`,
            providesTags: (result, error, arg) => [{type: 'Profile', id: arg}]
        }),
        auth: builder.query<AuthRawResponse, void>({
            query: () => `auth/me`,
            providesTags: ['Auth']
        }),
        login: builder.mutation<LoginRawResponse, LoginQuery>({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result) => result && result.resultCode === 0 ? ['Auth'] : []
        }),
        logout: builder.mutation<AuthRawResponse, void>({
            query: () => ({
                url: `/auth/login`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetUsersQuery,
    useToggleFollowMutation,
    useGetProfileQuery,
    useAuthQuery,
    useLogoutMutation,
    useLoginMutation
} = apiSlice