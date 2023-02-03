import React from 'react';
import type {MenuProps} from 'antd';
import {Dropdown, Space} from 'antd';
import AvatarApp from "../../AvatarApp/AvatarApp";
import {useAppDispatch} from "../../../redux/hooks";
import {logout} from "../../../redux/features/authSlice";

type HeaderDropdownProps = {
    login: string,
    avatar: string | null
}

const HeaderDropdown = ({login, avatar}: HeaderDropdownProps): JSX.Element => {
    const dispatch = useAppDispatch()

    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === '1') {
            dispatch(logout())
        }
    }

    const items: MenuProps['items'] = [
        {
            label: 'Log out',
            key: '1',
        },
    ]


    return (
        <Dropdown menu={{items, onClick}} placement="bottomRight" arrow>
            <a onClick={e => e.preventDefault()}>
                <Space style={{color: 'white'}}>
                    <AvatarApp src={avatar} size={24}/>
                    {login}
                </Space>
            </a>
        </Dropdown>
    )
}

export default HeaderDropdown