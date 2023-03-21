import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

type Status = 'ok' | 'error'
type Article = {
    source: {
        id: number
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}
type Source = {
    id: string
    name: string,
    description: string
    url: string
    category: Category
    language: Language
    country: Country
}
type ArticlesRawResponse = {
    status: Status
    totalResults: number
    articles: Article []
}
type SourcesRawResponse = {
    status: Status
    sources: Source[]
}

export const languages = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh'] as const
export type Language = typeof languages[number]
export const countries = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca',
    'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in',
    'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro',
    'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'] as const
export type Country = typeof countries[number]
export const sortingOrders = ['relevancy', 'popularity', 'publishedAt'] as const
export type SortingOrder = typeof sortingOrders[number]
export const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'] as const
export type Category = typeof categories[number]
export const searchInValues = ['title', 'description', 'content'] as const
export type SearchIn = typeof searchInValues[number]
export type SearchInMultiple =
    SearchIn
    | 'title,description'
    | 'title,description,content'
    | 'title,content'
    | 'description,content'

type EverythingQuery = {
    q: string
    searchIn: SearchInMultiple
    sources: string
    domains: string
    excludeDomains: string
    language: Language
    sortBy: SortingOrder
    pageSize: number
    page: number
    from: string
    to: string
}

type TopHeadlinesQuery = {
    country: Country
    category: Category
    sources: Source['id']
    q: string
    pageSize: number
    page: number
}

type SourcesQuery = {
    category?: Category
    language: Language
    country: Country
}

//pavel fe168ebfbae442b9802a625373428e54
//marina e62fcd81c46c4445a6eaeaaf15b3ccc2

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
    prepareHeaders: (headers) => {
        headers.set('X-Api-Key', 'e62fcd81c46c4445a6eaeaaf15b3ccc2')
        return headers
    }
})

const appendSearchParams = <T extends TopHeadlinesQuery | EverythingQuery | SourcesQuery>(paramsObj: Partial<T>) => {
    let result = []

    for (let key in paramsObj) {
        let value = paramsObj[key as keyof Partial<T>]
        if (value) {
            result.push(`${key}=${encodeURI(value as string)}`)
        }
    }

    return result.join('&')
}

export const newsApiSlice = createApi({
    reducerPath: 'newsApi',
    baseQuery,
    endpoints: builder => ({
        getEverything: builder.query<ArticlesRawResponse, Partial<EverythingQuery>>({
            query: (args) => (`everything?${appendSearchParams(args)}`),
        }),
        getTopHeadlines: builder.query<ArticlesRawResponse, Partial<TopHeadlinesQuery>>({
            query: (args) => (`top-headlines?${appendSearchParams(args)}`),
        }),
        getSources: builder.query<SourcesRawResponse, SourcesQuery>({
            query: (args) => (`top-headlines/sources?${appendSearchParams(args)}`),
        })
    })
})

export const {useGetEverythingQuery, useGetTopHeadlinesQuery, useGetSourcesQuery} = newsApiSlice