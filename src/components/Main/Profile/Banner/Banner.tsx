import {Image} from "antd";
import banner from "../../../../assets/images/profile/profile-banner.jpg";

const PostForm = (): JSX.Element => {
    return (
        <div style={{marginBottom: '48px'}}>
            <Image
                width={'100%'}
                height={300}
                src={banner}
                alt={'Banner'}
                style={{objectFit: 'cover', marginBottom: '48px'}}
            />
        </div>
    )
}

export default PostForm