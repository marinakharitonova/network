// import {setupServer} from "msw/node";
// import {screen} from "@testing-library/react";
// import {setupStore} from "../../../../redux/store";
// import {setup} from "../../../../utils/test-utils";
// import UsersList from "./UsersList";
// import {handlers} from "../../../../utils/mock-handlers";
//
// const server = setupServer(handlers.users)
//
// async function makeInitialStore() {
//     const initialStore = setupStore()
//     await initialStore.dispatch(fetchUsers({page: 1, count: 10}))
//
//     return initialStore
// }
//
// describe('Users list', () => {
//     beforeAll(() => server.listen())
//     afterEach(() => server.resetHandlers())
//     afterAll(() => server.close())
//
//     it('should renders', async function () {
//
//         const initialStore = await makeInitialStore()
//         setup(<UsersList/>, {store: initialStore})
//
//         expect(screen.getByRole('heading', {name: 'antoha_ale6'})).toBeInTheDocument()
//         expect(screen.getByRole('heading', {name: 'vladbelozertsev'})).toBeInTheDocument()
//         expect(screen.getByRole('heading', {name: 'ruslan90t'})).toBeInTheDocument()
//         expect(screen.queryByRole('heading', {name: 'Mao Cat'})).not.toBeInTheDocument()
//         expect(screen.getAllByRole('button', {name: 'Follow'})).toHaveLength(8)
//         expect(screen.getAllByRole('button', {name: 'Unfollow'})).toHaveLength(2)
//         expect(screen.getByRole('link', {name: 'SergeyDef'})).toHaveAttribute('href', '/profile/6977')
//         expect(screen.getByRole('link', {name: 'Sayyora'})).toHaveAttribute('href', '/profile/6976')
//     });
// })