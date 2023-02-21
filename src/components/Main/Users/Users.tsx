import UsersList from "./UsersList/UsersList";
import {useEffect, useState} from "react";
import PaginationApp from "../../PaginationApp/PaginationApp";
import {useGetUsersQuery} from "../../../redux/features/api/apiSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";
import {useSearchParams} from "react-router-dom";
import {BackTop} from "antd";

const Users = (): JSX.Element => {
    let [searchParams, setSearchParams] = useSearchParams();
    const queryPage = Number(searchParams.get('page')) || 1

    const [currentPage, setCurrentPage] = useState(queryPage);
    const [pageSize] = useState(20);

    useEffect(() => {
        if (currentPage !== queryPage) {
            setCurrentPage(queryPage)
        }
    }, [queryPage])

    const {
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery({page: currentPage, pageSize})


    const handlePageChange = (current: number) => {
        setCurrentPage(current);

        setSearchParams({page: current.toString(), count: pageSize.toString()})
    }

    return (
        <ContentLoader isError={isError} isLoading={isLoading} isSuccess={isSuccess} error={error}>
            {data && <>
                <BackTop />
                <UsersList users={data.users} page={currentPage} pageSize={pageSize} isFetching={isFetching}/>
                <PaginationApp total={data.totalCount} pageSize={pageSize}
                               current={currentPage}
                               handler={handlePageChange}/>
            </>}
        </ContentLoader>
    )
}

export default Users