import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {CSSProperties} from "react";

type AvatarAppProps = {
    src: String | null,
    size?: number,
    style?: CSSProperties,
    shape?: 'circle' | 'square'
}

const AvatarApp = ({src, size = 30, style, shape}: AvatarAppProps): JSX.Element => {
    if (src) {
        return <Avatar src={src} size={size} style={style} shape={shape}/>
    } else return <Avatar icon={<UserOutlined/>} size={size} style={style} shape={shape}/>
}

export default AvatarApp