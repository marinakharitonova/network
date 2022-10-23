import {useContext, useState} from 'react';
import {SketchPicker} from 'react-color';
import {ConfigProvider} from 'antd';
import {AppColorContext} from "../../../index";

const Settings = (): JSX.Element => {
    const appColor = useContext(AppColorContext);

    const [color, setColor] = useState({
        primaryColor: appColor,
    });
    const onColorChange = (nextColor: Partial<typeof color>) => {
        const mergedNextColor = {
            ...color,
            ...nextColor,
        };
        setColor(mergedNextColor);
        ConfigProvider.config({
            theme: mergedNextColor,
        });
    };
    return (
        <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={color.primaryColor}
            onChange={({hex}) => {
                onColorChange({
                    primaryColor: hex,
                });
            }}
        />
    )

}

export default Settings