import {Pagination} from "antd";

type PaginationAppProps = {
    total: number,
    pageSize: number,
    current: number,
    pageSizeOptions?: number[],
    handler: (page: number, pageSize: number) => void
}


const PaginationApp = ({total, pageSize, current, pageSizeOptions = [pageSize], handler}: PaginationAppProps): JSX.Element => {
    console.log('render pagination');

    const handlePageChange = (page: number) => {
        handler(page, pageSize);
    }

    return (
        <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',}}>
            <Pagination total={total}
                        pageSize={pageSize}
                        current={current}
                        hideOnSinglePage={true}
                        pageSizeOptions={pageSizeOptions}
                        onChange={handlePageChange}
            />
        </div>
    )
}

export default PaginationApp