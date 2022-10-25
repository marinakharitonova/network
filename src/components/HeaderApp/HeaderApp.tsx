import React, {useContext} from 'react';
import {Layout, Button, Image, Typography, Space} from 'antd';
import logo from '../../assets/images/logo.png'
import HeaderDropdown from "./HeaderDropdown/HeaderDropdown";
import {ColorContext} from "../../App";

const {Header} = Layout;
const {Text} = Typography;

const HeaderApp = (): JSX.Element => {
    const context = useContext(ColorContext);
    return (
        <Header style={{background: context?.color}}>
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Space align={'center'}>
                        <Image
                            width={36}
                            src={logo}
                            preview={false}
                        />
                        <Text strong={true} style={{color: 'white', fontSize: '24px'}}>NETWORK</Text>
                    </Space>
                    <div>
                        <Button type="text" style={{color: 'white'}}>
                            Log in
                        </Button>
                        <HeaderDropdown/>
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default HeaderApp