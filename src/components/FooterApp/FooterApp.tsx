import {Button, Layout, Space, Typography} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import {useContext} from "react";
import {ColorContext} from "../../context/theme-context";

const {Footer} = Layout;
const {Text} = Typography;

const FooterApp = (): JSX.Element => {
    const context = useContext(ColorContext)!;
    return (
        <Footer style={{background: context.color}}>
            <div className="container">
                <div style={{textAlign: 'right', width: '100%', color: 'white'}}>
                    <Space size={10}>
                        <Text style={{color: 'inherit'}}>Marina Kharitonova</Text>
                        <Text style={{color: 'inherit'}}>/</Text>
                        <Button
                            type='link'
                            icon={<GithubOutlined style={{color: 'white'}}/>}
                            href='https://github.com/marinakharitonova'
                            target='_blank'
                            style={{color: 'inherit', padding: '0', height: 'auto'}}
                        >
                            github.com
                        </Button>
                    </Space>
                </div>
            </div>
        </Footer>
    )
}

export default FooterApp