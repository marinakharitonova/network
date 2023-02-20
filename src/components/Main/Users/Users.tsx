import UsersList from "./UsersList/UsersList";
import {useEffect, useState} from "react";
import PaginationApp from "../../PaginationApp/PaginationApp";
import {useGetUsersQuery} from "../../../redux/features/api/apiSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router-dom";

const Users = (): JSX.Element => {
    let [searchParams, setSearchParams] = useSearchParams();
    const queryPage = Number(searchParams.get('page'))
    const queryCount = Number(searchParams.get('count'))

    const [currentPage, setCurrentPage] = useState(queryPage ?? 1);
    const [pageSize] = useState(queryCount ?? 10);

    useEffect(() => {
        if (currentPage !== queryPage) {
            setCurrentPage(queryPage);
        }

    }, [queryPage, queryCount])

    const {
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery({page: currentPage, pageSize})

    const handlePageChange = (current: number) => {
        setCurrentPage(current);

        setSearchParams({page: current.toString(), count: pageSize.toString()})
    }

    return (
        <ContentLoader isError={isError} isLoading={isLoading} isSuccess={isSuccess} error={error}>
            {data && <>
                <UsersList users={data.users} page={currentPage} pageSize={pageSize} isFetching={isFetching}/>
                <PaginationApp total={data.totalCount} pageSize={pageSize}
                               current={currentPage}
                               handler={handlePageChange}/>
            </>}
        </ContentLoader>
    )
}

export default Users