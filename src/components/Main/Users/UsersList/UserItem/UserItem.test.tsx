import {rest} from "msw";
import {setupServer} from "msw/node";
import {screen, waitFor} from '@testing-library/react'
import {renderWithProviders} from "../../../../../utils/test-utils";
import UserItem from "./UserItem";
import {setupStore} from "../../../../../redux/store";
import {fetchUsers} from "../../../../../redux/features/usersSlice";
import userEvent from "@testing-library/user-event";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));


const authHandler = rest.get('https://social-network.samuraijs.com/api/1.0/auth/me', (req, res, ctx) => {
    return res(
        ctx.json({
            "data": {"id": 18046, "login": "mnishek", "email": "m_mnishek@inbox.ru"},
            "messages": [],
            "fieldsErrors": [],
            "resultCode": 0
        }),
    )
})
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

const server = setupServer(rest.get(`https://social-network.samuraijs.com/api/1.0/users?count=2&page=1`, (req, res, ctx) => {
    return res(ctx.json({
        "items": [
            {
                "name": "Kira_Yoshikage",
                "id": 27943,
                "uniqueUrlName": null,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": null,
                "followed": false
            },
            {
                "name": "Romko04",
                "id": 27942,
                "uniqueUrlName": null,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": null,
                "followed": true
            }
        ],
        "totalCount": 2,
        "error": null
    }))
}))

async function setup() {
    const initialStore = setupStore()
    await initialStore.dispatch(fetchUsers({page: 1, count: 2}))
    const {store, ...utils} = renderWithProviders(<UserItem id={27943}/>, {store: initialStore})

    return {
        store,
        utils,
        user: userEvent.setup(),
    }
}

describe('User item element', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should renders', async () => {
        await setup()
        expect(screen.getByRole('heading', {name: 'Kira_Yoshikage'})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Follow'})).toBeInTheDocument()
    });

    it('should navigate to /login when try following without authorized user', async () => {
        const {user} = await setup()

        expect(screen.getByRole('button', {name: 'Follow'})).toBeInTheDocument()
        await user.click(screen.getByRole('button', {name: 'Follow'}));
        expect(await mockedUsedNavigate).toHaveBeenCalledWith('/login')
    });

    it('should follow and unfollow user', async () => {
        const {user} = await setup()
        server.use(authHandler, followHandler, unfollowHandler)

        expect(screen.getByRole('button', {name: 'Follow'})).toBeInTheDocument()
        await user.click(screen.getByRole('button', {name: 'Follow'}))
        expect(await screen.findByRole('button', {name: 'Unfollow'})).toBeInTheDocument()
        expect(screen.queryByRole('button', {name: 'Follow'})).not.toBeInTheDocument()

        expect(screen.getByRole('button', {name: 'Unfollow'})).toBeInTheDocument()
        await user.click(screen.getByRole('button', {name: 'Unfollow'}))
        expect(await screen.findByRole('button', {name: 'Follow'})).toBeInTheDocument()
        expect(screen.queryByRole('button', {name: 'Unfollow'})).not.toBeInTheDocument()
    });

    it('should not follow user while server error',
        async () => {
            server.use(
                rest.post('https://social-network.samuraijs.com/api/1.0/follow/27943', (req, res, ctx) => {
                    return res(ctx.status(500))
                }), authHandler
            )

            const {user} = await setup()

            await user.click(screen.getByRole('button', {name: 'Follow'}));

            await waitFor(() => { expect(screen.getByRole('button', {name: 'Follow'})).toBeInTheDocument() })
            await waitFor(() => { expect(screen.queryByRole('button', {name: 'Unfollow'})).not.toBeInTheDocument() })
        })

})