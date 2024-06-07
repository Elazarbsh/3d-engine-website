import { Material, Light, Renderer, RGBA } from 'ts-3d-engine';
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
  renderer: Renderer
}

const SettingsSection: React.FC<SettingsProps> = ({ material, light, sceneBackgroundColor, renderer }) => {

  const [isMaterialOpen, setMaterialSettingsOpen] = useState(true);
  const [isLightOpen, setSceneSettingsOpen] = useState(false);


  const toggleMaterialSettingsOpen = () => {
    setSceneSettingsOpen(false);
    setMaterialSettingsOpen(!isMaterialOpen);
  };

  const toggleSceneSettingsOpen = () => {
    setMaterialSettingsOpen(false);
    setSceneSettingsOpen(!isLightOpen);
  };


  return (
    <div className={`settings-section`}>
      <div className='settings-title' onClick={toggleMaterialSettingsOpen}>
        <h4>Material</h4>
        <FontAwesomeIcon icon={isMaterialOpen ? faChevronUp : faChevronDown} />
      </div>
      <div className={`settings-content ${isMaterialOpen ? '' : 'closed'}`}>
        <MaterialSettings material={material} renderer={renderer}></MaterialSettings>
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