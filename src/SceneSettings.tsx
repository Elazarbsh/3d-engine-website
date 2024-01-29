import { Light, RGBA, Renderer } from "ts-3d-engine";
import LightSettings from "./LightSettings";
import { useState } from "react";
import './SceneSettings.css';

interface SceneSettingsProps {
    lightSource: Light, // Assuming LightSource is the class you want to pass
    sceneBackgroundColor: RGBA
};

const SceneSettings: React.FC<SceneSettingsProps> = ({ lightSource, sceneBackgroundColor }) => {

    const [backgroundColor, setBackgroundColor] = useState(sceneBackgroundColor.toHex());

    return <div className="scene-settings">
        <div className='setting'>
            <label htmlFor="wireframeColorPicker">Background Color:</label>
            <input
                type="color"
                id="wireframeColorPicker"
                value={backgroundColor}
                onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    let color = e.target.value;
                    const red = parseInt(color.slice(1, 3), 16);
                    const green = parseInt(color.slice(3, 5), 16);
                    const blue = parseInt(color.slice(5, 7), 16);
                    sceneBackgroundColor.red = red;
                    sceneBackgroundColor.green = green;
                    sceneBackgroundColor.blue = blue;
                    // TODO: set the scene background color
                }}
            />
        </div>
        <p>Light:</p>
        <div className="light-settings-content">
            <LightSettings lightSource={lightSource}></LightSettings>
        </div>
    </div>
}

export default SceneSettings;