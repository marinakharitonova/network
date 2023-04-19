import React, {useContext} from 'react';
import {ColorResult, SketchPicker} from 'react-color';
import {Button, Typography} from "antd";
import {withAuth} from "../../../hoc/withAuth";
import {useAppSelector} from "../../../features/hooks";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import {useAppColor} from "../../../hooks/useAppColor";
import {ColorsContext, defaultColor} from "../../../context/ColorsContext";

const {Title} = Typography;

const Settings = (): JSX.Element => {
    const {setColors} = useContext(ColorsContext)!;
    const appColor = useAppColor()
    const currentUser = useAppSelector(selectCurrentUser)

    const handleColorChange = (result: ColorResult | string) => {
        const selectedColor = typeof result === 'string' ? result : result.hex
        setColors((prevColors) => {
            const newColor = {
                userId: currentUser!.id,
                color: selectedColor
            }

            const existingColor = prevColors.find(color => color.userId === currentUser!.id)

            if (existingColor) {
                return prevColors.map(color => {
                    if (color.userId === currentUser!.id) {
                        return ({
                            ...color,
                            color: selectedColor
                        })
                    } else return color
                })
            } else {
                return [...prevColors, newColor]
            }
        })
    }

    return (
        <>
            <Title level={2}>Set the application color</Title>
            <SketchPicker
                presetColors={['#1890ff', '#25b864', '#ff6f00']}
                color={appColor}
                onChange={(result) => handleColorChange(result)}
            />
            <Button type='default' style={{marginTop: '16px'}} onClick={() => handleColorChange(defaultColor)}>
                Set default color
            </Button>
        </>
    )

}

export default withAuth(Settings)