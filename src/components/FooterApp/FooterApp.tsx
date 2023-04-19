import {Button, Layout, Space, Typography} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import {useAppColor} from "../../hooks/useAppColor";

const {Footer} = Layout;
const {Text} = Typography;

const FooterApp = (): JSX.Element => {
    const appColor = useAppColor()
    return (
        <Footer style={{background: appColor}}>
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