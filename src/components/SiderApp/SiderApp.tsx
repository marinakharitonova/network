import React from 'react';
import {Layout, Menu} from 'antd';

const {Sider} = Layout;

const items = [
    { label: 'Profile', key: '1' },
    { label: 'Messages', key: '2' },
    { label: 'News', key: '3' },
    { label: 'Music', key: '4' },
    { label: 'Setings', key: '5' },
];

const SiderApp: React.FC = () => {
    return (
        <Sider breakpoint={"md"}>
            <Menu items={items} style={{background: "#f0f2f5"}} mode="inline"/>
        </Sider>
    )
}

export default SiderApp