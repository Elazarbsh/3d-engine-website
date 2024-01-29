import { Material, Light, Renderer, RGBA } from 'ts-3d-engine';
import LightSettings from './LightSettings';
import MaterialSettings from './MaterialSettings';
import './SettingsSection.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import SceneSettings from './SceneSettings';

interface SettingsProps {
    material: Material,
    light: Light,
    sceneBackgroundColor: RGBA
}

const SettingsSection: React.FC<SettingsProps> = ({ material, light, sceneBackgroundColor }) => {

    const [isMaterialOpen, setMaterialOpen] = useState(false);
    const [isLightOpen, setLightOpen] = useState(false);

    const toggleMaterial = () => {
        setMaterialOpen(!isMaterialOpen);
    };

    const toggleLight = () => {
        setLightOpen(!isLightOpen);
    };

    return (
        <div className='settings-section'>
          <div className='settings-title' onClick={toggleMaterial}>
            <h4>Material Settings</h4>
            <FontAwesomeIcon icon={isMaterialOpen ? faChevronUp : faChevronDown} />
          </div>
          <div className={`settings-content ${isMaterialOpen ? 'open' : ''}`}>
            {isMaterialOpen && <MaterialSettings material={material}></MaterialSettings>}
          </div>
    
          <div className='settings-title' onClick={toggleLight}>
            <h4>Scene Settings</h4>
            <FontAwesomeIcon icon={isLightOpen ? faChevronUp : faChevronDown} />
          </div>
          <div className={`settings-content ${isLightOpen ? 'open' : ''}`}>
            {isLightOpen && <SceneSettings lightSource={light} sceneBackgroundColor={sceneBackgroundColor}></SceneSettings>}
          </div>
        </div>
      );
};

export default SettingsSection