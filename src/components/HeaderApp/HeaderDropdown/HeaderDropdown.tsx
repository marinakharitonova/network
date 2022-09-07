import React, {useState} from 'react';
import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Menu, Space, Avatar} from 'antd';
import type {MenuProps} from 'antd';
import {UserOutlined} from '@ant-design/icons';


const HeaderDropdown: React.FC = () => {
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
        />
    );


    return (
        <Dropdown overlay={menu} onOpenChange={handleOpenChange} open={open}>
            <a onClick={e => e.preventDefault()}>
                <Space style={{color: 'white'}}>
                    <Avatar size={24} icon={<UserOutlined/>} alt={'user'}/>
                    username
                    <DownOutlined style={{color: 'white', fontSize: '12px'}}/>
                </Space>
            </a>
        </Dropdown>
    )
}

export default HeaderDropdown