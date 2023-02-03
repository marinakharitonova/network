import React, {useContext} from 'react';
import {Layout, Button, Image, Typography, Space} from 'antd';
import logo from '../../assets/images/logo.png'
import HeaderDropdown from "./HeaderDropdown/HeaderDropdown";
import {useAppSelector} from "../../redux/hooks";
import {Link} from "react-router-dom";
import {selectAuthorizationStatus} from "../../redux/features/authSlice";
import {ColorContext} from "../../context/theme-context";

const {Header} = Layout;
const {Text} = Typography;

const HeaderApp = (): JSX.Element => {
    const context = useContext(ColorContext)!;
    const avatar = useAppSelector(state => state.auth.avatar)
    const isUserAuthorized = useAppSelector(state => state.auth.isUserAuthorized)
    const login = useAppSelector(state => state.auth.login)!
    const status = useAppSelector(selectAuthorizationStatus)

    let content
    if (status === 'succeeded') {
        if (isUserAuthorized) {
            content = <HeaderDropdown login={login} avatar={avatar}/>
        } else {
            content = (
                <Link to="login">
                    <Button type="text" style={{color: 'white'}}>Log in</Button>
                </Link>
            )
        }
    }

    return (
        <Header style={{background: context.color}}>
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
                        {content}
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default HeaderApp