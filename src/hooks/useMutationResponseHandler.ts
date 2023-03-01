import {useContext} from "react";
import {MessageApiContext} from "../context/messageApi-context";
import {MutationActionCreatorResult} from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import {MutationDefinition} from "@reduxjs/toolkit/query";

const useMutationResponseHandler = (onSuccess?: { message?: string, callback?: () => void }) => {
    const messageApi = useContext(MessageApiContext)

    return (rawResult: MutationActionCreatorResult<MutationDefinition<any, any, any, any>>) => {
        rawResult
            .unwrap()
            .then((result) => {
                if (result.resultCode === 1) {
                    messageApi.open({type: 'error', content: result.messages[0]})
                } else if (result.resultCode === 0) {
                    if (onSuccess?.message) {
                        messageApi.open({type: 'success', content: onSuccess.message})
                    }
                    onSuccess?.callback?.()
                }
            })
            .catch((error) => {
                let errMsg = ''
                if (error && 'status' in error) {
                    errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
                }
                messageApi.open({type: 'error', content: errMsg})
            })
    }
}

export default useMutationResponseHandler