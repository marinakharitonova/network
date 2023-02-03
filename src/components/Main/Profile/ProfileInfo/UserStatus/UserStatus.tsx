import {Input, Tooltip, Typography} from 'antd';
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../../../redux/hooks";
import {updateUserStatus} from "../../../../../redux/features/profileSlice";
import {useDispatchThunk} from "../../../../../hooks/useDispatchThunk";

const {Text} = Typography;
type EditMode = 'edit' | 'show';


const UserStatus = (): JSX.Element => {
    const userStatus = useAppSelector(state => state.profile.userStatus);
    const [editMode, setEditMode] = useState<EditMode>('show')
    const [localStatus, setLocalStatus] = useState(userStatus)

    const [status, tryCatchWrapper] = useDispatchThunk()

    useEffect(() => {
        if (localStatus !== userStatus){
            setLocalStatus(userStatus)
        }

    }, [userStatus])

    const toggleEditMode = async (mode: EditMode) => {
        if (mode === 'show') {
            tryCatchWrapper(updateUserStatus(localStatus))
        }

        setEditMode(mode)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.target.value)
    }

    const isInputDisabled = status === 'loading'

    return (
        <div style={{marginBottom: '12px'}}>
            {editMode === 'edit' ?
                <Input autoFocus onBlur={() => toggleEditMode('show')}
                       onChange={handleInputChange} value={localStatus} disabled={isInputDisabled}/>
                :
                <Tooltip placement="topLeft" title={'Double click to edit'}>
                    {/*@ts-ignore*/}
                    <Text onDoubleClick={() => toggleEditMode('edit')}
                          keyboard
                          style={{cursor: 'default'}}
                    >{localStatus || '<Set your status here!>'}</Text>
                </Tooltip>
            }
        </div>
    )
}

export default UserStatus