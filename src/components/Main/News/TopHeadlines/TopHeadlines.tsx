import React from 'react';
import {List, Skeleton, Typography} from "antd";
import {categories, Category, useGetTopHeadlinesQuery} from "../../../../features/news/news";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import {parseFetchError} from "../../../../utils/parseFetchError";
import ArticleMeta from "../ArticleMeta/ArticleMeta";
import NewsSelect from "../NewsSelect/NewsSelect";
import {useSelect} from "../../../../hooks/useSelect";
import {makeSelectOptions} from "../../../../utils/makeSelectOptions";

const {Title} = Typography;

function TopHeadlines() {
    const [category, onChangeCategory] = useSelect<Category>('general')

    const {data, isLoading, isFetching, isSuccess, isError, error} = useGetTopHeadlinesQuery({
        country: 'us',
        category,
        pageSize: 5,
        page: 1
    })

    return (
        <>
            <Title level={2}>Top headlines</Title>
            <NewsSelect options={makeSelectOptions(categories)} value={category} onChange={onChangeCategory}/>

            <Skeleton active loading={isLoading}>
                {isSuccess &&
                    <List
                        itemLayout="horizontal"
                        dataSource={data.articles}
                        size={'small'}
                        style={isFetching ? {opacity: 0.5} : undefined}
                        renderItem={article => (
                            <List.Item style={{padding: '7px 0'}}>
                                <ArticleMeta title={article.title} url={article.url} author={article.author}
                                             publishedAt={article.publishedAt} sourceName={article.source.name}/>
                            </List.Item>
                        )}
                    />
                }
                {
                    isError && <ErrorMessage text={parseFetchError(error)}/>
                }
            </Skeleton>
        </>
    );
}

export default TopHeadlines;