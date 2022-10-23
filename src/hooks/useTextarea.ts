import React, {useRef, useState} from "react";
import {TextAreaRef} from "antd/es/input/TextArea";


export function useTextarea(initialValue: string) {
    const [value, setValue] = useState(initialValue)
    const ref = useRef<TextAreaRef>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const clearValue = () => {
        setValue('')
    }

    const getValue = () => {
        return ref.current?.resizableTextArea?.props.value as string;
    }

    return {
        field: {
            value,
            onChange,
            ref
        },
        clearValue,
        getValue
    }
}
