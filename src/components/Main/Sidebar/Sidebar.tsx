import {Layout, Menu} from 'antd';
import {NavLink} from "react-router-dom";
import {useAppColor} from "../../../hooks/useAppColor";

const {Sider} = Layout;

const Sidebar = (): JSX.Element => {

    const appColor = useAppColor()

    let activeStyle = {
        textDecoration: 'underline',
        textDecorationColor: appColor
    }

    const getStyle = ({isActive}: { isActive: boolean }) => {
        return isActive ? activeStyle : undefined
    }

    const items = [
        {label: (<NavLink to='profile' style={getStyle}>Profile</NavLink>), key: '1'},
        {label: (<NavLink to='chat' style={getStyle}>Chat</NavLink>), key: '2'},
        {label: (<NavLink to='users' style={getStyle}>Users</NavLink>), key: '3'},
        {label: (<NavLink to='settings' style={getStyle}>Settings</NavLink>), key: '4'},
    ]

    if (process.env.NODE_ENV !== 'production') {
        items.push({label: (<NavLink to='news' style={getStyle}>News</NavLink>), key: '5'})
    }

    return (
        <Sider breakpoint={"md"}>
            <Menu items={items} style={{background: "#f0f2f5"}} mode="inline"/>
        </Sider>
    )
}

export default Sidebar