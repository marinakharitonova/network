import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import React from "react";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {parseFetchError} from "../../utils/parseFetchError";

type ContentLoaderProps = {
    children: JSX.Element | JSX.Element[] | undefined;
} & {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    error: FetchBaseQueryError | SerializedError | undefined
}

const ContentLoader = ({isLoading, isSuccess, isError, error, children}: ContentLoaderProps): JSX.Element => {

    return (
        <>
            {isLoading && <Loader/>}
            {isError && <ErrorMessage text={parseFetchError(error)}/>}
            {isSuccess && children}
        </>
    )
}


export default ContentLoader