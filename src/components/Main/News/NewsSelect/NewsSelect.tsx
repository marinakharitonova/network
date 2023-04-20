import React from 'react';
import {Select, Typography} from "antd";

const {Text} = Typography;

type NewsSelectProps = {
    heading?: string
    isMultiple?: boolean
    value: string | string[]
    onChange: (value: string | string[]) => void

    options: Array<{ value: string, label: string }>
}

function NewsSelect({heading, onChange, isMultiple, options, value}: NewsSelectProps) {
    return (
        <>
            {heading && <Text style={{display: 'block', marginBottom: '4px'}}>{heading}: </Text>}
            <Select
                mode={isMultiple ? 'multiple' : undefined}
                value={value}
                onChange={onChange}
                style={{width: '200px', marginBottom: '16px'}}
                options={options}
            />
        </>
    );
}

export default NewsSelect;