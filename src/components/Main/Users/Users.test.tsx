import {rest} from "msw";
import {setupServer} from "msw/node";
import {renderWithProviders} from "../../../utils/test-utils";
import { fireEvent, screen } from '@testing-library/react'
import Users from "./Users";

export const handlers = [
    rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.json('John Smith'), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches & receives users after clicking the fetch users button', async () => {
    renderWithProviders(<Users />)

    // should show no user initially, and not be fetching a user
    expect(screen.getByText(/no users/i)).toBeInTheDocument()
    expect(screen.queryByText(/Fetching users\.\.\./i)).not.toBeInTheDocument()

    // after clicking the 'Fetch users' button, it should now show that it is fetching the users
    fireEvent.click(screen.getByRole('button', { name: /Fetch users/i }))
    expect(screen.getByText(/no users/i)).toBeInTheDocument()

    // after some time, the users should be received
    expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
    expect(screen.queryByText(/no users/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Fetching users\.\.\./i)).not.toBeInTheDocument()
})