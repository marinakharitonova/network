import {setupServer} from "msw/node";
import {screen} from "@testing-library/react";
import {setup} from "../../../../utils/test-utils";
import UsersList from "./UsersList";
import {handlers} from "../../../../utils/mock-handlers";

const server = setupServer(handlers.users)

const usersList : IUser[] = [
    {
        id: 1,
        name: 'My test user1',
        uniqueUrlName: null,
        photos: {
            small: 'test-photo1.jpeg',
            large: null
        },
        status: 'test status1',
        followed: false,
    },
    {
        id: 2,
        name: 'My test user2',
        uniqueUrlName: null,
        photos: {
            small: 'test-photo2.jpeg',
            large: null
        },
        status: 'test status2',
        followed: false,
    },
    {
        id: 3,
        name: 'My test user3',
        uniqueUrlName: null,
        photos: {
            small: 'test-photo2.jpeg',
            large: null
        },
        status: 'test status3',
        followed: true,
    },
    {
        id: 4,
        name: 'My test user4',
        uniqueUrlName: null,
        photos: {
            small: 'test-photo4.jpeg',
            large: null
        },
        status: 'test status4',
        followed: true,
    }
]

describe('Users list', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should renders', async function () {
        setup(<UsersList users={usersList} isFetching={false} pageSize={4} page={1}/>)

        for (let user of usersList){
            expect(screen.getByRole('heading', {name: user.name})).toBeInTheDocument()
            expect(screen.getByRole('link', {name: user.name})).toHaveAttribute('href', `/profile/${user.id}`)
        }
        expect(screen.getAllByRole('button', {name: 'Follow'})).toHaveLength(2)
        expect(screen.getAllByRole('button', {name: 'Unfollow'})).toHaveLength(2)

        expect(screen.queryByRole('heading', {name: 'Mao Cat'})).not.toBeInTheDocument()
    });

    it('should renders with opacity while fetching', async function () {
        setup(<UsersList users={usersList} isFetching={true} pageSize={4} page={1}/>)

        expect(screen.getByTestId('users-list')).toHaveStyle({opacity: 0.5})
    });
})