import React, {useContext, useEffect} from 'react';
import {Layout, Button, Image, Typography, Space} from 'antd';
import logo from '../../assets/images/logo.png'
import HeaderDropdown from "./HeaderDropdown/HeaderDropdown";
import {ColorContext} from "../../App";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchAuthorization} from "../../redux/features/authSlice";

const {Header} = Layout;
const {Text} = Typography;

const HeaderApp = (): JSX.Element => {
    const context = useContext(ColorContext);

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.auth.status)
    const isUserAuthorized = useAppSelector(state => state.auth.isUserAuthorized)
    const login = useAppSelector(state => state.auth.login)!
    const authorizedUser = useAppSelector(state => state.auth.authorizedUser)!

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAuthorization())
        }
    }, [status, dispatch])

    let content
    if (status === 'succeeded') {
        content = isUserAuthorized ? (
            <HeaderDropdown login={login} avatar={authorizedUser.photos.small}/>
        ) : (
            <Button type="text" style={{color: 'white'}}>Log in</Button>
        )
    } else if (status === 'failed') {
        content = '';
    }

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
                        {content}
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default HeaderApp