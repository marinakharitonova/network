import React, {useState} from 'react';
import {List} from "antd";
import PaginationApp from "../../../../PaginationApp/PaginationApp";
import AvatarApp from "../../../../AvatarApp/AvatarApp";
import ArticleMeta from "../../ArticleMeta/ArticleMeta";
import ErrorMessage from "../../../../ErrorMessage/ErrorMessage";
import {parseFetchError} from "../../../../../utils/parseFetchError";
import {SearchInMultiple, SortingOrder, useGetEverythingQuery} from "../../../../../features/news/news";

type EverythingListProps = {
    query: string
    sortBy: SortingOrder
    searchIn: SearchInMultiple
    sources: string
    from: string
    to: string
}

function EverythingList({query, sortBy, searchIn, sources, from, to}: EverythingListProps) {
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const {data, isSuccess, isError, error} = useGetEverythingQuery({
        q: query,
        pageSize,
        page,
        language: 'en',
        sortBy,
        searchIn: searchIn,
        sources: sources,
        from,
        to
    }, {skip: query.length < 3})

    return (
        <>
            {
                isSuccess &&
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={data.articles}
                    footer={<PaginationApp total={data.totalResults} current={page} pageSize={10}
                                           handler={handlePageChange}/>}
                    renderItem={(article) => (
                        <List.Item
                            key={article.title}
                            extra={<AvatarApp src={article.urlToImage} size={272} shape='square'/>}
                            style={{padding: '8px 0'}}
                        >
                            <ArticleMeta title={article.title} url={article.url} author={article.author}
                                         publishedAt={article.publishedAt} sourceName={article.source.name}/>
                            {article.content}
                        </List.Item>
                    )}
                />
            }

            {
                isError && <ErrorMessage text={parseFetchError(error)}/>
            }
        </>
    );
}

export default EverythingList;