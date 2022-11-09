import {Pagination} from "antd";
import React, {memo} from "react";

type PaginationAppProps = {
    total: number,
    pageSize: number,
    current: number,
    pageSizeOptions?: number[],
    handler: (page: number, pageSize: number) => void
}

const PaginationApp = memo<PaginationAppProps>(({
                                                    total,
                                                    pageSize,
                                                    current,
                                                    pageSizeOptions = [pageSize],
                                                    handler
                                                }: PaginationAppProps) => {
        const handlePageChange = (page: number) => {
            handler(page, pageSize);
        }

        console.log('render pagination');

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

    },
    (prevProps, nextProps) => prevProps.current === nextProps.current
)

export default PaginationApp