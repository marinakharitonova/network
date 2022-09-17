import React, {useState} from 'react';
import {Dropdown, Menu, Space, Avatar} from 'antd';
import type {MenuProps} from 'antd';
import {UserOutlined} from '@ant-design/icons';


function HeaderDropdown(){
    const [open, setOpen] = useState(false);

    const handleMenuClick: MenuProps['onClick'] = e => {
        if (e.key === '3') {
            setOpen(false);
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
                    <Avatar size={24} icon={<UserOutlined/>} alt={'user'}/>
                    username
                </Space>
            </a>
        </Dropdown>
    )
}

export default HeaderDropdown