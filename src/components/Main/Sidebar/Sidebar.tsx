import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

const {Sider} = Layout;

const Sidebar = (): JSX.Element => {

    const items = [
        {label: (<Link to='profile'>Profile</Link>), key: '1'},
        {label: (<Link to='dialogs'>Dialogs</Link>), key: '2'},
        {label: (<Link to='friends'>Friends</Link>), key: '3'},
        {label: (<Link to='news'>News</Link>), key: '4'},
        {label: (<Link to='music'>Music</Link>), key: '5'},
        {label: (<Link to='settings'>Settings</Link>), key: '6'},
    ];


    return (
        <Sider breakpoint={"md"}>
            <Menu items={items} style={{background: "#f0f2f5"}} mode="inline"/>
        </Sider>
    )
}

export default Sidebar