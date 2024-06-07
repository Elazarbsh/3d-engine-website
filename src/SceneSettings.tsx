import { Light, RGBA } from "ts-3d-engine";
import LightSettings from "./LightSettings";
import { useState } from "react";
import './SceneSettings.css';

interface SceneSettingsProps {
    lightSource: Light, // Assuming LightSource is the class you want to pass
    sceneBackgroundColor: RGBA
};

function hexToRgba(hexColor: string) {
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);
    return new RGBA(red, green, blue);
}

const SceneSettings: React.FC<SceneSettingsProps> = ({ lightSource, sceneBackgroundColor }) => {

    const [backgroundColor, setBackgroundColor] = useState(sceneBackgroundColor.toHex());

    return (
        <div className="scene-settings">
            <div className='scene-setting'>
                <label htmlFor="wireframeColorPicker">Background Color:</label>
                <input
                    type="color"
                    id="wireframeColorPicker"
                    value={backgroundColor}
                    onChange={(e) => {
                        const color = e.target.value;
                        setBackgroundColor(color);
                        const rgba = hexToRgba(color);
                        sceneBackgroundColor.red = rgba.red;
                        sceneBackgroundColor.green = rgba.green;
                        sceneBackgroundColor.blue = rgba.blue;
                    }}
                />
            </div>
            <label className="scene-setting">Light:</label>
            <LightSettings lightSource={lightSource}></LightSettings>
        </div>
    );
}

export default SceneSettings;