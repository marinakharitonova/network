import {Avatar, Space, Typography} from 'antd';

const {Text} = Typography;

function Post() {
    return (
        <Space align={"start"} size={20}>
            <Avatar/>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorum et eum labore,
                laudantium magnam necessitatibus omnis perspiciatis reiciendis repellat sed similique? Alias
                consequuntur doloribus rem velit veritatis! Eveniet, quisquam!
            </Text>
        </Space>
    )
}

export default Post