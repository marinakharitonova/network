import {Avatar, Button, Form, List, Typography} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    }
];

function MyPosts() {
    return (
        <>
            <Title level={2}>My posts</Title>
            <Form
                name='basic'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete='off'
            >
                <Form.Item
                    name='post'
                >
                    <TextArea showCount maxLength={300} allowClear={true} autoSize={{ maxRows: 4, minRows: 4}}/>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Post
                    </Button>
                </Form.Item>
            </Form>

            <List
                itemLayout='horizontal'
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined/>} />}
                            title={item.title}
                            description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

export default MyPosts