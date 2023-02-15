import {rest} from "msw";
import {setupServer} from "msw/node";
import {screen, waitFor} from '@testing-library/react'
import {setup} from "../../../../../utils/test-utils";
import UserItem from "./UserItem";
import {setupStore} from "../../../../../redux/store";
import {fetchUsers} from "../../../../../redux/features/usersSlice";
import { handlers } from "../../../../../utils/mock-handlers";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

const followHandler = rest.post('https://social-network.samuraijs.com/api/1.0/follow/27943', (req, res, ctx) => {
    return res(
        ctx.json({
            data: {}, messages: [], fieldsErrors: [], resultCode: 0
        })
    )
})
const unfollowHandler = rest.delete('https://social-network.samuraijs.com/api/1.0/follow/27943', (req, res, ctx) => {
    return res(
        ctx.json({
            data: {}, messages: [], fieldsErrors: [], resultCode: 0
        })
    )
})

const server = setupServer(handlers.users)

async function makeInitialState() {
    const initialStore = setupStore()
    await initialStore.dispatch(fetchUsers({page: 1, count: 10}))
    return initialStore
}

describe('User item element', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should renders', async () => {
        const initialState = await makeInitialState()
        setup(<UserItem id={27943}/>, {store: initialState})

        expect(screen.getByRole('heading', {name: 'Kira_Yoshikage'})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Follow'})).toBeInTheDocument()
        expect(screen.getByRole('link', {name: 'Kira_Yoshikage'})).toHaveAttribute('href', '/profile/27943')
    });

    it('should navigate to /login when try following without authorized user', async () => {
        const initialState = await makeInitialState()
        const {user} = setup(<UserItem id={27943}/>, {store: initialState})

        server.use(followHandler)

        const followBtn = screen.getByRole('button', {name: 'Follow'})
        expect(followBtn).toBeInTheDocument()
        await user.click(followBtn);
        expect(await mockedUsedNavigate).toHaveBeenCalledWith('/login')
    });

    it('should follow and unfollow user', async () => {
        const initialState = await makeInitialState()
        const {user} = setup(<UserItem id={27943}/>, {store: initialState})
        server.use(handlers.auth, followHandler, unfollowHandler)

        const followBtn = screen.getByRole('button', {name: 'Follow'})
        expect(followBtn).toBeInTheDocument()
        await user.click(followBtn)
        expect(await screen.findByRole('button', {name: 'Unfollow'})).toBeInTheDocument()
        expect(screen.queryByRole('button', {name: 'Follow'})).not.toBeInTheDocument()

        const unfollowBtn = screen.getByRole('button', {name: 'Unfollow'})
        expect(unfollowBtn).toBeInTheDocument()
        await user.click(unfollowBtn)
        expect(await screen.findByRole('button', {name: 'Follow'})).toBeInTheDocument()
        expect(screen.queryByRole('button', {name: 'Unfollow'})).not.toBeInTheDocument()
    });

    it('should not follow user while server error',
        async () => {
            server.use(
                rest.post('https://social-network.samuraijs.com/api/1.0/follow/27943', (req, res, ctx) => {
                    return res(ctx.status(500))
                }), handlers.auth
            )

            const initialState = await makeInitialState()
            const {user} = setup(<UserItem id={27943}/>, {store: initialState})

            const followBtn = screen.getByRole('button', {name: 'Follow'})
            await user.click(followBtn)

            await waitFor(() => {
                expect(followBtn).toBeInTheDocument()
            })
            expect(screen.queryByRole('button', {name: 'Unfollow'})).not.toBeInTheDocument()
        })

})