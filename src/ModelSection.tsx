import { Material, Light, Model, Scene, TransformControls, Camera } from 'ts-3d-engine';
import './ModelSection.css'
import ExampleModels from './ExampleModels';

interface PreviewSectionProps {
    scene: Scene,
    controls: TransformControls | null,
    mesh: Model,
    material: Material,
    camera : Camera,
  }
  

const ModelSection: React.FC<PreviewSectionProps> = ({scene, controls, mesh, material, camera}) => {
    return <>
        <div className='models-section'>
            { <ExampleModels scene={scene} controls={controls} mesh={mesh} material={material} camera={camera}></ExampleModels> }
        </div>
    </>
};

export default ModelSection