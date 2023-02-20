import UsersList from "./UsersList/UsersList";
import {useState} from "react";
import PaginationApp from "../../PaginationApp/PaginationApp";
import {useGetUsersQuery} from "../../../redux/features/api/apiSlice";
import ContentLoader from "../../ContentLoader/ContentLoader";

const Users = (): JSX.Element => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery({page: currentPage, pageSize})

    const handlePageChange = (current: number) => {
        setCurrentPage(current);
    }

    return (
        <ContentLoader isError={isError} isLoading={isLoading} isSuccess={isSuccess} error={error}>
            {data && <>
                <UsersList users={data.users} page={currentPage} pageSize={pageSize}/>
                <PaginationApp total={data.totalCount} pageSize={pageSize}
                               current={currentPage}
                               handler={handlePageChange}/>
            </>}
        </ContentLoader>
    )
}

export default Users