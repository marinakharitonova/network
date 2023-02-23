import {Skeleton, Tooltip} from 'antd';
import React, {useContext, useEffect, useState} from "react";
import {useAppSelector} from "../../../../../features/hooks";
import {useGetStatusQuery, useUpdateStatusMutation} from "../../../../../features/api/apiSlice";
import {selectCurrentUser} from "../../../../../features/auth/authSlice";
import {MessageApiContext} from "../../../../../context/messageApi-context";
import TextArea from "antd/es/input/TextArea";

type EditMode = 'edit' | 'show';

type UserStatusProps = {
    userId: number
}

const UserStatus = ({userId}: UserStatusProps): JSX.Element => {
    const {
        data: status,
        isLoading,
        isSuccess,
    } = useGetStatusQuery(Number(userId))

    const messageApi = useContext(MessageApiContext)
    const [mode, setMode] = useState<EditMode>('show')
    const [localStatus, setLocalStatus] = useState('')
    const currentUser = useAppSelector(selectCurrentUser)

    const canUpdateStatus = currentUser && currentUser.id === userId

    useEffect(() => {
        if (status && status !== localStatus) {
            setLocalStatus(status)
        }
    }, [status])

    const [updateStatus] = useUpdateStatusMutation()

    const handleInputBlur = () => {
        setMode('show')
        if (localStatus === status) return

        updateStatus({status: localStatus, userId})
            .unwrap()
            .catch((error) => {
                let errMsg = ''
                if (error && 'status' in error) {
                    errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
                }
                messageApi.open({type: 'error', content: errMsg})
            })

    }

    const statusStyle = {
        cursor: canUpdateStatus ? 'pointer' : 'default',
        borderRadius: '10px',
        display: 'inline-block',
        boxShadow: '0 8px 20px rgb(0 0 0 / 15%)',
        padding: '4px'
    }

    const editModeContent = <TextArea autoFocus onBlur={handleInputBlur}
                                      onChange={(e) => setLocalStatus(e.target.value)}
                                      value={localStatus}
                                      showCount
                                      rows={3}
                                      maxLength={300}
                                      style={{resize: 'none'}}/>

    let showModeContent = null
    if (canUpdateStatus) {
        showModeContent = <Tooltip placement="topLeft" title={'Double click to edit'}>
            <div onDoubleClick={() => setMode('edit')} style={statusStyle}>
                {status || '< Set your status here <3 >'}
            </div>
        </Tooltip>
    } else if (!canUpdateStatus) {
        showModeContent = <div style={statusStyle}>{status || '< Status not specified yet >'}</div>
    }
    return (
        <div style={{marginBottom: '12px'}}>
            {isLoading && <Skeleton.Input active size={'small'}/>}
            {isSuccess && (mode === 'edit' ? editModeContent : showModeContent)}
        </div>
    )
}

export default UserStatus