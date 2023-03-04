import {createApi, fetchBaseQuery, FetchBaseQueryMeta} from "@reduxjs/toolkit/query/react";
import {PromiseWithKnownReason} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

type RawResponse<T> = {
    data: T,
    messages: Array<string>,
    fieldsError?: Array<string>,
    resultCode: number
}

type MutationResponse = RawResponse<{ resultCode: number }>

type AuthResponse = RawResponse<{ email: string, login: string, id: number }>

type LoginResponse = RawResponse<{ userId: number }>

type UpdateAvatarResponse = RawResponse<{ photos: { small: string, large: string } }>

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
    rememberMe: boolean,
    captcha?: string
}

type UpdateStatusQuery = {
    status: string,
    userId: number
}

type UpdateAvatarQuery = {
    userId: number,
    data: FormData
}

interface ToggleFollowProfileQuery {
    isFollowed: boolean,
    userId: number
}

interface ToggleFollowUsersQuery extends ToggleFollowProfileQuery, UsersQuery {
}

export type ProfileEditQuery = Omit<IProfile, "photos">

const handleResponseErrors = (queryFulfilled: PromiseWithKnownReason<{ data: MutationResponse; meta: FetchBaseQueryMeta | undefined; }, any>, handler: any) => {
    queryFulfilled
        .then(res => {
            if (res.data.resultCode === 1) {
                handler()
            }
        })
        .catch(handler)
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    prepareHeaders: (headers) => {
        headers.set('API-KEY', 'e6ffdf33-5ec5-4b1b-8821-1e3065551482')
        return headers
    },
    credentials: 'include',
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Auth', 'Users', 'FollowStatus'],
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
        getFollowStatus: builder.query<boolean, number>({
            query: (arg) => (`follow/${arg}`),
            providesTags: (result, error, arg) => [{type: 'FollowStatus', id: arg}]
        }),
        toggleFollowProfile: builder.mutation<MutationResponse, ToggleFollowProfileQuery>({
            query: (args: UserFollowQuery) => ({
                url: `follow/${args.userId}`,
                method: args.isFollowed ? 'DELETE' : 'POST'
            }),
            onQueryStarted({userId, isFollowed}, {
                dispatch,
                queryFulfilled,
            }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getFollowStatus', userId, draft => !draft)
                )
                handleResponseErrors(queryFulfilled, patchResult.undo)
            },
            invalidatesTags: [{type: 'Users', id: 'PARTIAL_LIST'}]
        }),
        toggleFollowUsers: builder.mutation<MutationResponse, ToggleFollowUsersQuery>({
            query: (args: UserFollowQuery) => ({
                url: `follow/${args.userId}`,
                method: args.isFollowed ? 'DELETE' : 'POST'
            }),
            onQueryStarted({userId, isFollowed, page, pageSize}, {
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
                handleResponseErrors(queryFulfilled, patchResult.undo)
            },
            invalidatesTags: (result, error, arg) => [{type: 'FollowStatus', id: arg.userId}]
        }),
        getProfile: builder.query<IProfile, number>({
            query: (userId) => `profile/${userId}`,
        }),
        editProfile: builder.mutation<MutationResponse, ProfileEditQuery>({
            query: (arg) => ({
                url: `profile`,
                method: 'PUT',
                body: arg,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    if (data.resultCode === 0) {
                        dispatch(
                            apiSlice.util.updateQueryData('getProfile', arg.userId, (draft) => {
                                Object.assign(draft, arg)
                            })
                        )
                    }
                } catch {
                }
            },
            invalidatesTags: [{type: 'Users', id: 'PARTIAL_LIST'}]
        }),
        auth: builder.query<AuthResponse, void>({
            query: () => `auth/me`,
            providesTags: ['Auth']
        }),
        getCaptcha: builder.query<{ url: string }, void>({
            query: () => `/security/get-captcha-url`
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
        updateStatus: builder.mutation<MutationResponse, UpdateStatusQuery>({
            query: (arg) => ({
                url: `profile/status`,
                method: 'PUT',
                body: {status: arg.status}
            }),
            onQueryStarted({userId, status}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getStatus', userId, () => status)
                )
                handleResponseErrors(queryFulfilled, patchResult.undo)
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
    useToggleFollowUsersMutation,
    useToggleFollowProfileMutation,
    useGetProfileQuery,
    useAuthQuery,
    useLogoutMutation,
    useLoginMutation,
    useGetStatusQuery,
    useUpdateStatusMutation,
    useUpdateAvatarMutation,
    useEditProfileMutation,
    useGetFollowStatusQuery,
    useGetCaptchaQuery
} = apiSlice