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

  const [isMaterialOpen, setMaterialSettingsOpen] = useState(false);
  const [isLightOpen, setSceneSettingsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);


  const toggleMaterialSettingsOpen = () => {
    setSceneSettingsOpen(false);
    setMaterialSettingsOpen(!isMaterialOpen);
  };

  const toggleSceneSettingsOpen = () => {
    setMaterialSettingsOpen(false);
    setSceneSettingsOpen(!isLightOpen);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`settings-section ${isOpen ? 'open' : 'closed'}`}>
      {/* <button className="drawer-toggle-button" onClick={toggleDrawer}>
        <FontAwesomeIcon icon={isOpen ? faChevronRight : faChevronLeft} className="arrow-icon" />
      </button> */}
      <div className='settings-title' onClick={toggleMaterialSettingsOpen}>
        <h4>Material</h4>
        <FontAwesomeIcon icon={isMaterialOpen ? faChevronUp : faChevronDown} />
      </div>
      <div className={`settings-content ${isMaterialOpen ? '' : 'closed'}`}>
        <MaterialSettings material={material}></MaterialSettings>
      </div>

      <div className='settings-title' onClick={toggleSceneSettingsOpen}>
        <h4>Scene</h4>
        <FontAwesomeIcon icon={isLightOpen ? faChevronUp : faChevronDown} />
      </div>
      <div className={`settings-content ${isLightOpen ? '' : 'closed'}`}>
        <SceneSettings lightSource={light} sceneBackgroundColor={sceneBackgroundColor}></SceneSettings>
      </div>
    </div>
  );
};

export default SettingsSection