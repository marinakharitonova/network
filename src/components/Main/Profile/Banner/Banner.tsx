import {Button, Carousel, Image} from "antd";
import banner0 from "../../../../assets/images/profile/banner-0.jpg";
import banner1 from "../../../../assets/images/profile/banner-1.jpeg";
import banner2 from "../../../../assets/images/profile/banner-2.jpg";
import banner3 from "../../../../assets/images/profile/banner-3.jpg";
import banner4 from "../../../../assets/images/profile/banner-4.jpg";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";
import {useMemo, useRef} from "react";
import {useLocalStorage} from "../../../../hooks/useLocalStorage";
import {useAppSelector} from "../../../../features/hooks";
import {selectCurrentUser} from "../../../../features/auth/authSlice";
import {useMode} from "../../../../hooks/useMode";

const bannersList = [banner0, banner1, banner2, banner3, banner4]

const createBanners = (src: string) => {
    const newBannerList = bannersList.slice(0)
    const index = bannersList.findIndex(elem => elem === src)

    const temp = newBannerList[0]
    newBannerList[0] = src
    newBannerList[index] = temp
    return newBannerList
}

type BannerProps = {
    userId: number
}

const Banner = ({userId}: BannerProps): JSX.Element => {
    const [storageBanners, setStorageBanners] = useLocalStorage<{ userId: number, src: string }[]>("network-banner", [])
    const currentUser = useAppSelector(selectCurrentUser)
    const canUpdate = currentUser && currentUser.id === userId
    const [mode, switchMode] = useMode()

    const initialSlideSrc = useMemo(() => storageBanners.length > 0
            ? storageBanners.filter(banner => banner.userId === userId)[0]?.src ?? banner3
            : banner3,
        [userId, storageBanners])

    const userBannersList = useMemo(() => createBanners(initialSlideSrc), [initialSlideSrc])
    const currentSlideSrc = useRef(initialSlideSrc)
    const sliderRef = useRef(null)

    const onChange = (slide: number) => {
        currentSlideSrc.current = userBannersList[slide]
    }

    const handleSaveClick = () => {
        switchMode()
        if (initialSlideSrc === currentSlideSrc.current) {
            return
        }
        setStorageBanners((prevStorageBanners) => {
            const newBanner = {
                userId: userId,
                src: currentSlideSrc.current
            }

            const existingBanner = prevStorageBanners.find(banner => banner.userId === currentUser!.id)

            if (existingBanner) {
                return prevStorageBanners.map(banner => {
                    if (banner.userId === currentUser!.id) {
                        return ({
                            ...banner,
                            src: currentSlideSrc.current
                        })
                    } else return banner
                })
            } else {
                return [...prevStorageBanners, newBanner]
            }
        })
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
                            src={initialSlideSrc}
                            alt={'Banner'}
                            style={{objectFit: 'cover'}}
                            preview={false}
                        />
                        : <Carousel afterChange={onChange} className='banner-carousel' ref={sliderRef}>
                            {userBannersList.map(banner => (
                                <Image width={'100%'} height={300} src={banner} preview={false} key={banner}/>))}
                        </Carousel>
                }
            </div>
        </div>
    )
}

export default Banner