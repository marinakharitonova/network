import React, {useContext} from 'react';
import {ColorResult, SketchPicker} from 'react-color';
import {Button, Typography} from "antd";
import {ColorContext, defaultColor} from "../../../context/theme-context";

const {Title} = Typography;

const Settings = (): JSX.Element => {
    const context = useContext(ColorContext)!;

    const handleColorChange = (result: ColorResult | string) => {
        if (typeof result === 'string') {
            context.setColor(result)
        } else {
            context.setColor(result.hex)
        }
    }

    return (
        <>
            <Title level={2}>Set the application color</Title>
            <SketchPicker
                presetColors={['#1890ff', '#25b864', '#ff6f00']}
                color={context.color}
                onChange={(result) => handleColorChange(result)}
            />
            <Button type='default' style={{marginTop: '16px'}} onClick={() => handleColorChange(defaultColor)}>
                Set default color
            </Button>
        </>
    )

}

export default Settings