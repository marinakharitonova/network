import React from 'react';
import {Button, Image, Layout, Space, Typography} from 'antd';
import logo from '../../assets/images/logo.png'
import HeaderDropdown from "./HeaderDropdown/HeaderDropdown";
import {Link} from "react-router-dom";
import {selectCurrentUser} from "../../features/auth/authSlice";
import {useAppSelector} from "../../features/hooks";
import {useAppColor} from "../../hooks/useAppColor";

const {Header} = Layout;
const {Text} = Typography;

type HeaderAppProps = {
    isSuccess: boolean,
    isLoading: boolean
}

const HeaderApp = ({isSuccess, isLoading}: HeaderAppProps): JSX.Element => {

    const user = useAppSelector(selectCurrentUser)
    const appColor = useAppColor()


    const loginLink = (
        <Link to="login">
            <Button type="text" style={{color: 'white'}}>Log in</Button>
        </Link>
    )

    let content
    if (isLoading) {
        content = ''
    } else if (!isSuccess) {
        content = loginLink
    } else if (isSuccess) {
        content = user ? <HeaderDropdown login={user.login}/> : loginLink
    }

    return (
        <Header style={{background: appColor}}>
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