import { Material, Model, Scene, TransformControls, Camera } from 'ts-3d-engine';
import './ModelSection.css'
import ExampleModels from './ExampleModels';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface PreviewSectionProps {
    scene: Scene,
    controls: TransformControls | null,
    mesh: Model,
    material: Material,
    camera: Camera,
}


const ModelSection: React.FC<PreviewSectionProps> = ({ scene, controls, mesh, material, camera }) => {
    const [isPreviewModelsOpen, setExampleModelsPreviewModelsOpen] = useState(true);

    const toggleExamplesModelPreview = () => {
        setExampleModelsPreviewModelsOpen(!isPreviewModelsOpen);
    };

    return <>
        <div className='models-section'>
            <div className='preview-title' onClick={toggleExamplesModelPreview}>
                <h4>Sample Models</h4>
                <FontAwesomeIcon icon={isPreviewModelsOpen ? faChevronUp : faChevronDown} />
            </div>
            <div className={`preview-content ${isPreviewModelsOpen ? '' : 'closed'}`}>
                {<ExampleModels scene={scene} controls={controls} mesh={mesh} material={material} camera={camera}></ExampleModels>}
            </div>
        </div>
    </>
};

export default ModelSection