import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export const parseFetchError = (error: FetchBaseQueryError | SerializedError | undefined) => {
    let errMsg = ''
    if (error && 'status' in error) {
        errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
    }
    return errMsg
}