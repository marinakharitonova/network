import {rest} from "msw";
import {setupServer} from "msw/node";
import {setup} from "../../../utils/test-utils";
import {screen, waitForElementToBeRemoved} from '@testing-library/react'
import Users from "./Users";
import {errors} from "../../../utils/mock-errors";
import {handlers} from "../../../utils/mock-handlers";

const server = setupServer(
    handlers.users,
    rest.get(`https://social-network.samuraijs.com/api/1.0/users`, (req, res, ctx) => {
        const count = req.url.searchParams.get('count')
        const page = req.url.searchParams.get('page')
        return res(ctx.json({
            count, page,
            "items": [
                {
                    "name": "plcnsk",
                    "id": 27927,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "alina_401_",
                    "id": 27926,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "alina_2004",
                    "id": 27925,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": "jjjhggggggg",
                    "followed": false
                },
                {
                    "name": "mvlex",
                    "id": 27924,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "polatbek93",
                    "id": 27923,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "TheForgem4ster",
                    "id": 27922,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "yarik890890",
                    "id": 27921,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "malkin",
                    "id": 27920,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "2laa",
                    "id": 27919,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "2la",
                    "id": 27918,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                }
            ],
            "totalCount": 22975,
            "error": null
        }), ctx.delay(150))
    }))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Users', () => {

    it('should fetch users on pagination button click', async function () {
        const {user} = setup(<Users/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

        expect(screen.getByRole('heading', {name: 'vladbelozertsev'})).toBeInTheDocument()
        expect(screen.queryByRole('heading', {name: 'alina_2004'})).not.toBeInTheDocument()
        expect(screen.getByRole('listitem', {name: '1'})).toHaveClass('ant-pagination-item-active')

        const link = screen.getByRole('listitem', {name: '5'})
        await user.click(link);

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

        expect(screen.queryByRole('listitem', {name: '1'})).not.toHaveClass('ant-pagination-item-active')
        expect(screen.getByRole('listitem', {name: '5'})).toHaveClass('ant-pagination-item-active')

        // expect(screen.queryByRole('heading', {name: 'vladbelozertsev'})).not.toBeInTheDocument()
        // expect(screen.getByRole('heading', {name: 'alina_2004'})).toBeInTheDocument()
    });

    it('should show an error while request failed', async () => {
        server.use(handlers.usersError)

        setup(<Users/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

        expect(screen.getByText(errors[500])).toBeInTheDocument()
    })
})