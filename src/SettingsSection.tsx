import { Material, Light, Renderer, RGBA } from 'ts-3d-engine';
import LightSettings from './LightSettings';
import MaterialSettings from './MaterialSettings';
import './SettingsSection.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SceneSettings from './SceneSettings';

interface SettingsProps {
  material: Material,
  light: Light,
  sceneBackgroundColor: RGBA
}

const SettingsSection: React.FC<SettingsProps> = ({ material, light, sceneBackgroundColor }) => {

  const [isMaterialOpen, setMaterialOpen] = useState(false);
  const [isLightOpen, setLightOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);


  const toggleMaterial = () => {
    setLightOpen(false);
    setMaterialOpen(!isMaterialOpen);
  };

  const toggleLight = () => {
    setMaterialOpen(false);
    setLightOpen(!isLightOpen);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <div className={`settings-section ${isOpen ? 'open' : 'closed'}`}>
      {/* <button className="drawer-toggle-button" onClick={toggleDrawer}>
        <FontAwesomeIcon icon={isOpen ? faChevronRight : faChevronLeft} className="arrow-icon" />
      </button> */}
      <div className='settings-title' onClick={toggleMaterial}>
        <h4>Material Settings</h4>
        <FontAwesomeIcon icon={isMaterialOpen ? faChevronUp : faChevronDown} />
      </div>
      <div className={`settings-content ${isMaterialOpen ? 'open' : 'closed'}`}>
        <MaterialSettings material={material}></MaterialSettings>
      </div>

      <div className='settings-title' onClick={toggleLight}>
        <h4>Scene Settings</h4>
        <FontAwesomeIcon icon={isLightOpen ? faChevronUp : faChevronDown} />
      </div>
      <div className={`settings-content ${isLightOpen ? 'open' : 'closed'}`}>
        <SceneSettings lightSource={light} sceneBackgroundColor={sceneBackgroundColor}></SceneSettings>
      </div>
    </div>
  );
};

export default SettingsSection