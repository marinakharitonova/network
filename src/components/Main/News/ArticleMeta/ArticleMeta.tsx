import React from 'react';
import {List} from "antd";
import {formatDistanceToNow} from "date-fns";

type ArticleMetaProps = {
    url: string
    title: string
    author: string
    publishedAt: string,
    sourceName: string
}

function ArticleMeta({url, title, author, publishedAt, sourceName}: ArticleMetaProps) {
    const timeAgo = formatDistanceToNow(new Date(publishedAt))
    const description = `${author || sourceName}: ${timeAgo} ago`

    return (
        <List.Item.Meta
            title={<a href={url} target='_blank'>{title}</a>}
            description={description}
        />
    );
}

export default ArticleMeta;