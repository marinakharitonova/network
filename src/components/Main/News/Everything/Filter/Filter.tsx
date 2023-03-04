import React, {useMemo, useState} from 'react';
import {Col, DatePicker, Input, Row, Skeleton} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import NewsSelect from "../../NewsSelect/NewsSelect";
import dayjs, {Dayjs} from "dayjs";
import {
    SearchIn,
    searchInValues,
    SortingOrder,
    sortingOrders,
    useGetSourcesQuery
} from "../../../../../features/news/news";
import {makeSelectOptions} from "../../../../../utils/makeSelectOptions";

const sortByOptions = makeSelectOptions(sortingOrders)
const searchInOptions = makeSelectOptions(searchInValues)
const {RangePicker} = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;
type FilterProps = {
    query: string
    onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    sortBy: SortingOrder
    onSortByChange: (v: string | string[]) => void
    searchIn: SearchIn[]
    onSearchInChange: (v: string | string[]) => void
    searchInDefault: SearchIn[]
    source: string[]
    onSourceChange: (v: string | string[]) => void
    setDateStrings: (v: string[]) => void
}

function Filter({
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
                }: FilterProps) {
    const [dates, setDates] = useState<RangeValue>(null);
    const onDatesChange = (values: RangeValue, formatString: [string, string]) => {
        setDates(values)
        setDateStrings(formatString)
    }
    const disabledDate = (current: Dayjs) => {
        const monthAgo = dayjs().subtract(1, 'month').startOf('day')
        const endOfCurrent = dayjs().endOf('day')

        return current && (current < monthAgo || current > endOfCurrent)
    }

    const {data, isLoading, isSuccess} = useGetSourcesQuery({
        language: 'en',
        country: 'us'
    })

    const sourceOptions = useMemo(() => {
        if (isSuccess && data) {
            return data.sources.map(source => ({value: source.id, label: source.name}))
        }
    }, [data, isSuccess])

    const handleSourceChange = (v: string | string[]) => {
        if (v.length > 20) return
        onSourceChange(v)
    }

    const handleSearchInChange = (v: string | string[]) => {
        onSearchInChange(v.length ? v : searchInDefault)
    }

    return (
        <>
            <Input value={query}
                   onChange={onQueryChange}
                   size="large"
                   placeholder="Keywords or a phrase to search for"
                   prefix={<SearchOutlined/>}
                   allowClear
                   style={{marginBottom: '16px'}}/>

            <Row gutter={16} style={{marginBottom: '36px'}}>
                <Col span={8}>
                    <NewsSelect heading={'Sort by'} options={sortByOptions} onChange={onSortByChange} value={sortBy}/>
                    <RangePicker onChange={onDatesChange} value={dates}
                                 disabledDate={disabledDate} allowEmpty={[true, true]}/>
                </Col>
                <Col span={8}>
                    <NewsSelect heading={'Search in'} value={searchIn} options={searchInOptions}
                                onChange={handleSearchInChange} isMultiple={true}/>
                </Col>
                <Col span={8}>
                    {isLoading &&
                        <Skeleton.Input active style={{marginTop: '26px'}}/>}
                    {isSuccess &&
                        <NewsSelect heading={'Sources'}
                                    options={sourceOptions!}
                                    value={source}
                                    onChange={handleSourceChange}
                                    isMultiple={true}/>}
                </Col>
            </Row>
        </>
    );
}

export default Filter;