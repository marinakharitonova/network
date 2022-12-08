import React, {useState} from 'react';
import {Dropdown, Menu, Space} from 'antd';
import type {MenuProps} from 'antd';
import AvatarApp from "../../AvatarApp/AvatarApp";
import {useAppDispatch} from "../../../redux/hooks";
import {logout} from "../../../redux/features/authSlice";

type HeaderDropdownProps = {
    login: string,
    avatar: string | null
}

const HeaderDropdown = ({login, avatar} : HeaderDropdownProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()

    const handleMenuClick: MenuProps['onClick'] = e => {
        if (e.key === '2') {
            setOpen(false);
        }

        if (e.key === '1') {
            dispatch(logout())
        }
    };

    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Log out',
                    key: '1',
                },
            ]}
            style={{marginTop: '10px'}}
        />
    );


    return (
        <Dropdown overlay={menu} onOpenChange={handleOpenChange} open={open}>
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