import {Button, Tabs} from "antd";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {SelectFriends, SelectUsers, fetchUsers} from "../../../redux/features/usersSlice";
import UsersList from "./UsersList/UsersList";
import {useEffect} from "react";

const Users = (): JSX.Element => {
    const users = useAppSelector(SelectUsers);
    const friends = useAppSelector(SelectFriends);
    const usersStatus = useAppSelector(state => state.users.status);
    const error = useAppSelector(state => state.users.error)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch])

    let content

    if (usersStatus === 'loading') {
        content = <div>Loading</div>
    } else if (usersStatus === 'succeeded') {
        content = <Tabs
            defaultActiveKey="1"
            items={[
                {
                    label: `My friends`,
                    key: '1',
                    children: (
                        <>
                            <UsersList users={friends}/>
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: 12,
                                    height: 32,
                                    lineHeight: '32px',
                                }}
                            >
                                <Button>loading more</Button>
                            </div>
                        </>

                    ),
                },
                {
                    label: `All users`,
                    key: '2',
                    children: (
                        <>
                            <UsersList users={users}/>
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: 12,
                                    height: 32,
                                    lineHeight: '32px',
                                }}
                            >
                                <Button>loading more</Button>
                            </div>
                        </>
                    ),
                }
            ]}
        />
    } else if (usersStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <>
            {content}
        </>
    )
}

export default Users