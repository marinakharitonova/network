import {useCallback, useState} from "react";
import {useAppDispatch} from "../redux/hooks";
import {showError} from "../redux/features/errorSlice";
import {ActionCreator} from "@reduxjs/toolkit";


export function useDispatchThunk(): [string, (action: ActionCreator<any>) => void] {
    const [status, setStatus] = useState<IRequest['status']>('idle')
    const dispatch = useAppDispatch()

    const tryCatchWrapper = useCallback(
        (action: ActionCreator<any>) => {
            setStatus('loading')
            dispatch(action)
                .unwrap()
                .catch((err: Error) => {
                    dispatch(showError({isError: true, message: err.message}))
                })
                .finally(() => {
                    setStatus('idle')
                    dispatch(showError({isError: false}))
                })
        },
        [dispatch]
    );

    return [status, tryCatchWrapper]
}