import {Image} from 'antd';
import MyPost from './MyPosts/MyPost';
import banner from '../../assets/images/profile/profile-banner.jpg'

function Profile() {
    return (
        <>
            <div style={{marginBottom: '48px'}}>
                <Image
                    width={'100%'}
                    height={300}
                    src={banner}
                    alt={'Banner'}
                    style={{objectFit: 'cover', marginBottom: '48px'}}
                />
            </div>
            <MyPost/>
        </>

    )
}

export default Profile