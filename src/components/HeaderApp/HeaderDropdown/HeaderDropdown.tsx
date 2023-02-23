import React from 'react';
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd';
import {useLogoutMutation} from "../../../features/api/apiSlice";

type HeaderDropdownProps = {
    login: string,
}

const HeaderDropdown = ({login}: HeaderDropdownProps): JSX.Element => {
    const [logout] = useLogoutMutation()

    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === '1') {
            logout()
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
            <a onClick={e => e.preventDefault()} style={{color: 'white'}}>
                {login}
            </a>
        </Dropdown>
    )
}

export default HeaderDropdown