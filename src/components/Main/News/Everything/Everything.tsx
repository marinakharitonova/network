import React, {useDeferredValue, useState} from 'react';
import {SearchIn, SearchInMultiple, SortingOrder} from "../../../../features/news/news";
import {useSelect} from "../../../../hooks/useSelect";
import EverythingList from "./EverythingList/EverythingList";
import Filter from "./Filter/Filter";

function Everything() {
    const searchInDefault: SearchIn[] = ['title', 'description', 'content']

    const [query, setQuery] = useState('')
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)
    const deferredQuery = useDeferredValue(query);
    const [sortBy, onSortByChange] = useSelect<SortingOrder>('relevancy')
    const [searchIn, onSearchInChange] = useSelect<SearchIn[]>(searchInDefault)
    const [source, onSourceChange] = useSelect<string[]>([])
    const [dateStrings, setDateStrings] = useState<string[]>([])

    const filterProps = {
        query,
        onQueryChange,
        sortBy,
        onSortByChange,
        searchIn,
        onSearchInChange,
        searchInDefault,
        source,
        onSourceChange,
        setDateStrings
    }

    return (
        <>
            <Filter {...filterProps}/>
            <EverythingList query={deferredQuery}
                            sortBy={sortBy}
                            searchIn={searchIn.toString() as SearchInMultiple}
                            sources={source.toString()}
                            from={dateStrings[0]}
                            to={dateStrings[1]}
            />
        </>
    );
}

export default Everything;