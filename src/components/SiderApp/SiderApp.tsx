import {FC} from 'react';
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

const {Sider} = Layout;

const SiderApp: FC = () => {

    const items = [
        {label: (<Link to={`profile`}>Profile</Link>), key: '1'},
        {label: (<Link to={`dialogs`}>Dialogs</Link>), key: '2'},
        {label: (<Link to={`news`}>News</Link>), key: '3'},
        {label: (<Link to={`music`}>Music</Link>), key: '4'},
        {label: (<Link to={`settings`}>Settings</Link>), key: '5'},
    ];


    return (
        <Sider breakpoint={"md"}>
            <Menu items={items} style={{background: "#f0f2f5"}} mode="inline"/>
        </Sider>
    )
}

export default SiderApp