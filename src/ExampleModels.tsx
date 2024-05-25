import React, { useState } from 'react';
import './ExampleModels.css'; // Import your CSS file for styling
import { Camera, Geometry, Material, Model, ModelLoader, Scene, TransformControls, Vec3 } from 'ts-3d-engine';
import { faChevronDown, faChevronUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface PreviewModelsProps {
  scene: Scene,
  controls: TransformControls | null,
  mesh: Model,
  material: Material,
  camera: Camera,
}

interface previewItem {
  name: string;
  imgPath: string;
  modelPath: string;
  defaultCameraPosition: Vec3;
  texturePath: string | null;
}

const ExampleModels: React.FC<PreviewModelsProps> = ({ scene, controls, mesh, material, camera }) => {

  const previewItems: previewItem[] = [
    { name: 'cube', imgPath: '/src/assets/preview-images/cube.png', modelPath: '/src/assets/preview-models/cube.obj', defaultCameraPosition: new Vec3(0,0,-5), texturePath: null },
    { name: 'sphere', imgPath: '/src/assets/preview-images/sphere.png', modelPath: '/src/assets/preview-models/sphere.obj', defaultCameraPosition: new Vec3(0,0,-10), texturePath: null },
    { name: 'lara', imgPath: '/src/assets/preview-images/lara.png', modelPath: '/src/assets/preview-models/lara.obj', defaultCameraPosition: new Vec3(0,0,-3), texturePath: null },
    { name: 'Black Dragon Kalameet', imgPath: '/src/assets/preview-images/kalameet.png', modelPath: '/src/assets/preview-models/kalameet.obj', defaultCameraPosition: new Vec3(0,0,-20), texturePath: null },
  ];

  const [isPreviewModelsOpen, setPreviewModelsOpen] = useState(true);


  const handleClick = async (index: number, name: string, modelPath: string, cameraPosition : Vec3) => {

    try {
      let newMesh = await ModelLoader.loadFromObjectFilePathAsync(modelPath);
      newMesh.material = material;
      try {
        controls!.model = newMesh;
      }
      catch (error) {
        console.error("Error reassigning transform controls model", error);
      }
      scene.clearModels();
      scene.addModel(newMesh);
      camera.position = cameraPosition;
    } catch (error) {
      console.error("Error parsing the file:", error);
    }
  };

  const toggleModelPreview = () => {
    setPreviewModelsOpen(!isPreviewModelsOpen);
  };


  const handleMouseEnter = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.currentTarget.classList.add('hovered');
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.currentTarget.classList.remove('hovered');
  };


  return (
    <div className='samples-section'>
      <div className='section-title' onClick={toggleModelPreview}>
        <h4>Sample Models</h4>
        <FontAwesomeIcon icon={isPreviewModelsOpen ? faChevronUp : faChevronDown} />
      </div>

      <div className={`preview-content ${isPreviewModelsOpen ? '' : 'closed'}`}>
        <div className="scrollable-window image-gallery">
          {previewItems.map((item, index) => (
            <div key={index} className="image-wrapper">
              <img
                src={item.imgPath}
                alt={item.name}
                onClick={() => handleClick(index, item.name, item.modelPath, item.defaultCameraPosition)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="gallery-image"
              />
              <div className="image-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExampleModels;