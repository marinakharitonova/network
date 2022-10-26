import React, {useContext} from 'react';
import {ColorResult, SketchPicker} from 'react-color';
import {ColorContext, defaultColor} from "../../../App";
import {Button, Typography} from "antd";

const {Title} = Typography;

const Settings = (): JSX.Element => {
    const context = useContext(ColorContext);

    const handleColorChange = (result: ColorResult) => {
        const {hex} = result;
        context?.changeColor(hex);
    }
    return (
        <>
            <Title level={2}>Set the application color</Title>
            <SketchPicker
                presetColors={['#1890ff', '#25b864', '#ff6f00']}
                color={context?.color}
                onChange={handleColorChange}
            />
            <Button type='default' style={{marginTop: '16px'}} onClick={() =>context?.changeColor(defaultColor)}>
                Set default color
            </Button>
        </>
    )

}

export default Settings