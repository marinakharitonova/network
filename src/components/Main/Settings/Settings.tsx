import {useState} from 'react';
import {SketchPicker} from 'react-color';
import {ConfigProvider} from 'antd';

const Settings = (): JSX.Element => {
    const [color, setColor] = useState({
        primaryColor: '#25b864',
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