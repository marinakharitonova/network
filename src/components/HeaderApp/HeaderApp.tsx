import React from 'react';
import {Layout, Button, Image, Typography, Space} from 'antd';
import {Container, HeaderTemplate} from '../../styles/components'
import logo from '../../assets/images/logo.png'
import HeaderDropdown from "./HeaderDropdown/HeaderDropdown";

const {Header} = Layout;
const {Text} = Typography;


const HeaderApp: React.FC = () => {
    return (
        <HeaderTemplate as={Header}>
            <Container>
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
            </Container>
        </HeaderTemplate>
    )
}

export default HeaderApp