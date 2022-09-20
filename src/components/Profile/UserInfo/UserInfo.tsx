import {Descriptions, Avatar, Row, Col} from 'antd';
import {UserOutlined} from '@ant-design/icons';


const UserInfo = (): JSX.Element => {
    return (
        <Row gutter={16} style={{marginBottom: '36px'}}>
            <Col span={4}>
                <Avatar shape="square" size={128} icon={<UserOutlined/>}/>
            </Col>
            <Col span={18}>
                <Descriptions style={{marginBottom: '36px'}}>
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    )
}

export default UserInfo