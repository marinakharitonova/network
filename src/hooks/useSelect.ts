import {useState} from "react";

export type ArrayOrValue<T> = T extends T[] ? T[] : T

export const useSelect = <T>(initialValue: ArrayOrValue<T>): [ArrayOrValue<T>, (v: string | string[]) => void] => {
    const [value, setValue] = useState<ArrayOrValue<T>>(initialValue)

    const onChange = (selectedValue: string | string[]) => {
        if (selectedValue === value) return

        setValue(selectedValue as ArrayOrValue<T>)
    }

    return [value, onChange]
}