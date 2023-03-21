import {Button, Carousel, Image} from "antd";
import banner0 from "../../../../assets/images/profile/banner-0.jpg";
import banner1 from "../../../../assets/images/profile/banner-1.jpeg";
import banner2 from "../../../../assets/images/profile/banner-2.jpg";
import banner3 from "../../../../assets/images/profile/banner-3.jpg";
import banner4 from "../../../../assets/images/profile/banner-4.jpg";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";
import {useRef} from "react";
import {useLocalStorage} from "../../../../hooks/useLocalStorage";
import {useAppSelector} from "../../../../features/hooks";
import {selectCurrentUser} from "../../../../features/auth/authSlice";
import {useMode} from "../../../../hooks/useMode";

const bannersList = [banner0, banner1, banner2, banner3, banner4]
const imagesList = bannersList.map(banner => (
    <Image width={'100%'} height={300} src={banner} preview={false} key={banner}/>))

type BannerProps = {
    userId: number
}

const Banner = ({userId}: BannerProps): JSX.Element => {
    const [storageBanner, setStorageBanner] = useLocalStorage<string | null>("appBanner", null)
    const userBanner = storageBanner ? JSON.parse(storageBanner) : null
    const currentUser = useAppSelector(selectCurrentUser)
    const canUpdate = currentUser && currentUser.id === userId

    const [mode, switchMode] = useMode()

    const initialSlide = userBanner && userBanner.userId === userId ? userBanner.slideId : 3

    const currentSlide = useRef(initialSlide)
    const sliderRef = useRef(null)

    const onChange = (slide: number) => {
        currentSlide.current = slide
    }

    const handleSaveClick = () => {
        setStorageBanner(JSON.stringify({userId: currentUser!.id, slideId: currentSlide.current}))
        switchMode()
    }

    const handleEditClick = () => {
        switchMode()
    }

    return (
        <div style={{marginBottom: '48px'}}>
            <div style={{position: 'relative'}}>
                {
                    canUpdate
                    && <Button type="dashed"
                               style={{position: "absolute", top: '5px', right: '5px', zIndex: 2}}
                               icon={mode === 'show' ? <EditOutlined/> : <CheckOutlined/>}
                               onClick={mode === 'show' ? handleEditClick : handleSaveClick}/>
                }

                {
                    mode === 'show'
                        ? <Image
                            width={'100%'}
                            height={300}
                            src={bannersList[initialSlide]}
                            alt={'Banner'}
                            style={{objectFit: 'cover'}}
                            preview={false}
                        />
                        : <Carousel afterChange={onChange} className='banner-carousel' ref={sliderRef}>
                            {imagesList}
                        </Carousel>
                }
            </div>
        </div>
    )
}

export default Banner