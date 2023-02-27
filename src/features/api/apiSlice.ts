import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";

interface RawResponse {
    data: unknown,
    messages: Array<string>,
    fieldsError?: Array<string>,
    resultCode: number
}

interface AuthResponse extends RawResponse {
    data: {
        email: string,
        login: string,
        id: number,
    }
}

interface LoginResponse extends RawResponse {
    data: {
        userId: number,
    },
}

interface UpdateAvatarResponse extends RawResponse {
    data: {
        photos: {
            small: string,
            large: string
        }
    }
}

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

type LoginQuery = {
    email: string,
    password: string,
    rememberMe: boolean
}

type UpdateStatusQuery = {
    status: string,
    userId: number
}

type UpdateAvatarQuery = {
    userId: number,
    data: FormData
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
    tagTypes: ['Profile', 'Auth', 'Users'],
    endpoints: builder => ({
        getUsers: builder.query<UsersResponse, UsersQuery>({
            query: (args) => `users?count=${args.pageSize}&page=${args.page}`,
            transformResponse: (result: { items: IUser[], totalCount: number, error: null }, meta, arg) => {
                return {
                    users: result.items,
                    totalCount: result.totalCount
                }
            },
            providesTags: [{type: 'Users', id: 'PARTIAL_LIST'}]
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
        auth: builder.query<AuthResponse, void>({
            query: () => `auth/me`,
            providesTags: ['Auth']
        }),
        login: builder.mutation<LoginResponse, LoginQuery>({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result) => result && result.resultCode === 0 ? ['Auth'] : []
        }),
        logout: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: `/auth/login`,
                method: 'DELETE',
            })
        }),
        getStatus: builder.query<string, number>({
            query: (userId) => `profile/status/${userId}`
        }),
        updateStatus: builder.mutation<RawResponse, UpdateStatusQuery>({
            query: (arg) => ({
                url: `profile/status`,
                method: 'PUT',
                body: {status: arg.status}
            }),
            async onQueryStarted({userId, status}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getStatus', userId, draft => status)
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: [{type: 'Users', id: 'PARTIAL_LIST'}]
        }),
        updateAvatar: builder.mutation<UpdateAvatarResponse, UpdateAvatarQuery>({
            query: (arg) => ({
                url: `profile/photo`,
                method: 'PUT',
                body: arg.data
            }),
            async onQueryStarted({userId}, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    if (data.resultCode === 0) {
                        dispatch(
                            apiSlice.util.updateQueryData('getProfile', userId, (draft) => {
                                draft.photos = data.data.photos
                            })
                        )
                    }
                } catch {
                }
            },
            invalidatesTags: [{type: 'Users', id: 'PARTIAL_LIST'}]
        }),
    })
})

export const {
    useGetUsersQuery,
    useToggleFollowMutation,
    useGetProfileQuery,
    useAuthQuery,
    useLogoutMutation,
    useLoginMutation,
    useGetStatusQuery,
    useUpdateStatusMutation,
    useUpdateAvatarMutation
} = apiSlice