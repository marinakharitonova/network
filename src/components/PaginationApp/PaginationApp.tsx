import {Pagination} from "antd";

type PaginationAppProps = {
    total: number,
    pageSize: number,
    current: number,
    handler: (page: number, pageSize: number) => void
}


const PaginationApp = ({total, pageSize, current, handler}: PaginationAppProps): JSX.Element => {

    const handlePageChange = (page: number) => {
        handler(page, pageSize);
    }

    return (
        <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',}}>
            <Pagination total={total}
                        pageSize={pageSize}
                        current={current}
                        hideOnSinglePage={true}
                        onChange={handlePageChange}
                        showSizeChanger={false}
            />
        </div>
    )
}

export default PaginationApp