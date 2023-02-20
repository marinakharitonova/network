import {Input, Tooltip, Typography} from 'antd';
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../../../redux/hooks";
import {useDispatchThunk} from "../../../../../hooks/useDispatchThunk";

const {Text} = Typography;
type EditMode = 'edit' | 'show';


const UserStatus = (): JSX.Element => {
    //

    return <p>Status</p>
}

export default UserStatus