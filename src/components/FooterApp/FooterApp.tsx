import {Button, Layout, Space, Typography} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import {Container, HeaderTemplate} from '../../styles/components'

const {Footer} = Layout;
const {Text} = Typography;

function FooterApp() {
    return (
        <HeaderTemplate as={Footer}>
            <Container>
                <div style={{textAlign: 'right', width: '100%', color: 'white'}}>
                    <Space size={10}>
                        <Text style={{color: 'inherit'}}>Marina Kharitonova</Text>
                        <Text style={{color: 'inherit'}}>/</Text>
                        <Button
                            type='link'
                            icon={<GithubOutlined style={{color: 'white'}}/>}
                            href='https://github.com/marinakharitonova'
                            target='_blank'
                            style={{color: 'inherit', padding: '0'}}
                        >
                            github.com
                        </Button>
                    </Space>
                </div>
            </Container>
        </HeaderTemplate>
    )
}

export default FooterApp