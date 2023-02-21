import {setupServer} from "msw/node";
import {setup} from "../../../utils/test-utils";
import {screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import Users from "./Users";
import {handlers} from "../../../utils/mock-handlers";

const server = setupServer(handlers.users, handlers.users5)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Users', () => {

    it('should renders', async function () {
        setup(<Users/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

        expect(screen.getByRole('heading', {name: 'ntjkjubz'})).toBeInTheDocument()
        expect(screen.queryByRole('heading', {name: 'pavellog'})).not.toBeInTheDocument()
        expect(screen.getByRole('listitem', {name: '1'})).toHaveClass('ant-pagination-item-active')
    });

    it('should fetch users on pagination button click', async function () {
        const {user} = setup(<Users/>)

        const link = await screen.findByRole('listitem', {name: '5'})
        await user.click(link);

        await waitFor(() => {
            expect(screen.queryByRole('listitem', {name: '1'})).not.toHaveClass('ant-pagination-item-active')
        })
        await waitFor(() => {
            expect(screen.getByRole('listitem', {name: '5'})).toHaveClass('ant-pagination-item-active')
        })

        await waitFor(() => {
            expect(screen.queryByRole('heading', {name: 'ntjkjubz'})).not.toBeInTheDocument()
        })

        await waitFor(() => {
            expect(screen.getByRole('heading', {name: 'pavellog'})).toBeInTheDocument()
        })
    });

    it('should show an error while request failed', async () => {
        server.use(handlers.usersError)

        setup(<Users/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

        expect(screen.getByText('error')).toBeInTheDocument()
    })
})