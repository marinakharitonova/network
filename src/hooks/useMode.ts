import {useState} from "react";

type Mode = 'edit' | 'show'

export const useMode = (initialMode?: Mode) => {
    const [mode, setMode] = useState<Mode>(initialMode ?? 'show')

    const switchMode = () => {
        mode === 'show' ? setMode('edit') : setMode('show')
    }

    return [mode, switchMode] as const
}