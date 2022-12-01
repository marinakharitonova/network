import {Input, Tooltip, Typography, message} from 'antd';
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {updateUserStatus} from "../../../../../redux/features/profileSlice";

type UserStatusProps = {
    status: string
}
const {Text} = Typography;
type EditMode = 'edit' | 'show';

const UserStatus = ({status}: UserStatusProps): JSX.Element => {

    const [editMode, setEditMode] = useState<EditMode>('show')
    const [localStatus, setLocalStatus] = useState(status)
    const dispatch = useAppDispatch();

    const [messageApi, contextHolder] = message.useMessage();

    const [userStatusRequestStatus, setUserStatusRequestStatus] = useState<IRequest['status']>('idle')

    useEffect(() => {
        if (localStatus !== status){
            setLocalStatus(status)
        }

    }, [status])

    const toggleEditMode = async (mode: EditMode) => {
        if (mode === 'show') {
            try {
                setUserStatusRequestStatus('loading')
                const result = await dispatch(updateUserStatus(localStatus)).unwrap();
                if (result.resultCode === 1) throw new Error('too long status')
            } catch (err) {

                messageApi.open({
                    type: 'error',
                    // @ts-ignore
                    content: err.message,
                });
            } finally {
                setUserStatusRequestStatus('idle')
            }
        }

        setEditMode(mode)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.target.value)
    }

    const isInputDisabled = userStatusRequestStatus === 'loading'

    return (
        <div style={{marginBottom: '12px'}}>
            {contextHolder}
            {editMode === 'edit' ?
                <Input autoFocus onBlur={() => toggleEditMode('show')}
                       onChange={handleInputChange} value={localStatus} disabled={isInputDisabled}/>
                :
                <Tooltip placement="topLeft" title={'Double click to edit'}>
                    {/*@ts-ignore*/}
                    <Text onDoubleClick={() => toggleEditMode('edit')}
                          keyboard
                          style={{cursor: 'default'}}
                    >{status || '<Set your status here!>'}</Text>
                </Tooltip>
            }
        </div>
    )
}

export default UserStatus