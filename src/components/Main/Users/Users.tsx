import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {fetchUsers} from "../../../redux/features/usersSlice";
import UsersList from "./UsersList/UsersList";
import {useEffect, useState} from "react";
import PaginationApp from "../../PaginationApp/PaginationApp";
import Loader from "../../Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const Users = (): JSX.Element => {
    const status = useAppSelector(state => state.users.status);
    const error = useAppSelector(state => state.users.error)
    const usersCount = useAppSelector(state => state.users.usersCount);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers({page: currentPage, count: pageSize}))
        }
    }, [status, dispatch])

    const handlePageChange = (current: number) => {
        dispatch(fetchUsers({page: current, count: pageSize}))
        setCurrentPage(current);
    }

    return (
        <>
            {status === 'loading' && <Loader/>}
            {status === 'succeeded' &&
                <>
                    <UsersList/>
                    <PaginationApp total={usersCount} pageSize={pageSize}
                                   current={currentPage}
                                   handler={handlePageChange}
                    />
                </>
            }
            {status === 'failed' && <ErrorMessage text={error}/>}
        </>
    )
}

export default Users