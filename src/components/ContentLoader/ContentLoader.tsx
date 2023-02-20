import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import React from "react";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

type ContentLoaderProps = {
    children: JSX.Element | JSX.Element[] | undefined;
} & {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    error: FetchBaseQueryError | SerializedError | undefined
}

const ContentLoader = ({isLoading, isSuccess, isError, error, children}: ContentLoaderProps): JSX.Element => {

    let errMsg = ''
    if (error && 'status' in error) {
        errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
    }

    return (
        <>
            {isLoading && <Loader/>}
            {isError && <ErrorMessage text={errMsg}/>}
            {isSuccess && children}
        </>
    )
}


export default ContentLoader