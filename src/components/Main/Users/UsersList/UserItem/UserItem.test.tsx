import {rest} from "msw";
import {setupServer} from "msw/node";
import {screen, waitFor} from '@testing-library/react'
import {setup} from "../../../../../utils/test-utils";
import UserItem from "./UserItem";
import {setupStore} from "../../../../../features/store";
import {handlers} from "../../../../../utils/mock-handlers";
import {apiSlice} from "../../../../../features/api/apiSlice";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

const server = setupServer(handlers.auth)

const testUser: IUser = {
    id: 27944,
    name: 'My test user',
    uniqueUrlName: null,
    photos: {
        small: 'test-photo.jpeg',
        large: null
    },
    status: 'test status',
    followed: false,
}

const followUser = {
    "name": "ntjkjubz",
    "id": 28043,
    "uniqueUrlName": null,
    "photos": {
        "small": null,
        "large": null
    },
    "status": null,
    "followed": false
}

describe('User item element', () => {
    beforeAll(() => server.listen())
    afterEach(() => {
        server.resetHandlers()
    })
    afterAll(() => server.close())

    it('should renders', async () => {
        setup(<UserItem user={testUser} page={1} pageSize={10}/>)

        expect(screen.getByRole('heading', {name: 'My test user'})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Follow'})).toBeInTheDocument()
        expect(screen.getByRole('link', {name: 'My test user'})).toHaveAttribute('href', '/profile/27944')
        expect(screen.getByRole('img')).toHaveAttribute('src', 'test-photo.jpeg')
    });

    it('should navigate to /login when try following without authorized user', async () => {
        const {user} = setup(<UserItem user={testUser} page={1} pageSize={10}/>)

        const followBtn = screen.getByRole('button', {name: 'Follow'})
        expect(followBtn).toBeInTheDocument()
        await user.click(followBtn);
        expect(await mockedUsedNavigate).toHaveBeenCalledWith('/login')
    });

    it('should follow and unfollow user', async () => {
        server.use(handlers.follow, handlers.unfollow, handlers.users)

        const initialStore = setupStore()
        await initialStore.dispatch(apiSlice.endpoints.auth.initiate())
        await initialStore.dispatch(apiSlice.endpoints.getUsers.initiate({page: 1, pageSize: 20}))

        const {user} = setup(<UserItem user={followUser} page={1} pageSize={20}/>, {store: initialStore})

        const followBtn = screen.getByRole('button', {name: 'Follow'})
        await user.click(followBtn)

        await waitFor(() => {
            expect(screen.getByRole('button', {name: 'Unfollow'})).toBeInTheDocument()
        })
        await waitFor(() => {
            expect(screen.queryByRole('button', {name: 'Follow'})).not.toBeInTheDocument()
        })
    });

    it('should not follow user while server error',
        async () => {
            server.use(
                rest.post('https://social-network.samuraijs.com/api/1.0/follow/28043', (req, res, ctx) => {
                    return res(ctx.status(500))
                }), handlers.auth
            )

            const initialStore = setupStore()
            await initialStore.dispatch(apiSlice.endpoints.auth.initiate())
            const {user} = setup(<UserItem user={followUser} page={1} pageSize={20}/>, {store: initialStore})

            const followBtn = screen.getByRole('button', {name: 'Follow'})
            await user.click(followBtn)

            await waitFor(() => {
                expect(followBtn).toBeInTheDocument()
            })

            await waitFor(() => {
                expect(screen.queryByRole('button', {name: 'Unfollow'})).not.toBeInTheDocument()
            })
        })

})