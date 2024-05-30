import React, { useState } from 'react';
import './ExampleModels.css'; // Import your CSS file for styling
import { Camera, Geometry, Material, Model, ModelLoader, RGBA, Scene, TextureLoader, TransformControls, Vec3 } from 'ts-3d-engine';
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
    { name: 'Cube', imgPath: '/src/assets/preview-images/cube.png', modelPath: '/src/assets/preview-models/cube.obj', defaultCameraPosition: new Vec3(0,0,-5), texturePath: null },
    { name: 'Sphere', imgPath: '/src/assets/preview-images/sphere.png', modelPath: '/src/assets/preview-models/sphere.obj', defaultCameraPosition: new Vec3(0,0,-10), texturePath: null },
    { name: 'Teapot', imgPath: '/src/assets/preview-images/teapot.png', modelPath: '/src/assets/preview-models/teapot.obj', defaultCameraPosition: new Vec3(0,0,-10), texturePath: null },
    { name: 'Black Dragon Kalameet', imgPath: '/src/assets/preview-images/kalameet.png', modelPath: '/src/assets/preview-models/kalameet.obj', defaultCameraPosition: new Vec3(0,0,-20), texturePath: null },
    { name: 'Car', imgPath: '/src/assets/preview-images/car.png', modelPath: '/src/assets/preview-models/car.obj', defaultCameraPosition: new Vec3(0,0,-5), texturePath: null },
    { name: 'Lara', imgPath: '/src/assets/preview-images-textured/lara.png', modelPath: '/src/assets/preview-models-textured/lara/lara.obj', defaultCameraPosition: new Vec3(0,0,-2), texturePath: '/src/assets/preview-models-textured/lara/lara_tex.png' },
    { name: 'Crash', imgPath: '/src/assets/preview-images-textured/crash.png', modelPath: '/src/assets/preview-models-textured/crash/crash.obj', defaultCameraPosition: new Vec3(0,0,-2), texturePath: '/src/assets/preview-models-textured/crash/crash_tex.png' },
    { name: 'Helicopter', imgPath: '/src/assets/preview-images-textured/helicopter.png', modelPath: '/src/assets/preview-models-textured/helicopter/helicopter.obj', defaultCameraPosition: new Vec3(0,0,-10), texturePath: '/src/assets/preview-models-textured/helicopter/helicopter_tex.png' },
    { name: 'Thompson', imgPath: '/src/assets/preview-images-textured/thompson.png', modelPath: '/src/assets/preview-models-textured/thompson/thompson.obj', defaultCameraPosition: new Vec3(0,0,-70), texturePath: '/src/assets/preview-models-textured/thompson/thompson_tex.png' },
    { name: 'Gamegear', imgPath: '/src/assets/preview-images-textured/gamegear.png', modelPath: '/src/assets/preview-models-textured/gamegear/gamegear.obj', defaultCameraPosition: new Vec3(0,0,-1), texturePath: '/src/assets/preview-models-textured/gamegear/gamegear_tex.png' },
    { name: 'Barrel', imgPath: '/src/assets/preview-images-textured/barrel.png', modelPath: '/src/assets/preview-models-textured/barrel/barrel.obj', defaultCameraPosition: new Vec3(0,0,-3), texturePath: '/src/assets/preview-models-textured/barrel/barrel_tex.png' },
    { name: 'Merlin', imgPath: '/src/assets/preview-images-textured/merlin.png', modelPath: '/src/assets/preview-models-textured/merlin/merlin.obj', defaultCameraPosition: new Vec3(0,0,-8), texturePath: '/src/assets/preview-models-textured/merlin/merlin_tex.png' },
  ];

  const [isPreviewModelsOpen, setPreviewModelsOpen] = useState(true);


  const handleClick = async (index: number, name: string, modelPath: string, cameraPosition : Vec3, texturePath : string) => {

    try {
      let newMesh = await ModelLoader.loadFromObjectFilePathAsync(modelPath);
      newMesh.material = material;
      if(texturePath != null){
        let tex = await TextureLoader.loadTextureFromImagePath(texturePath);
        material.texture = tex;
      }else{
        material.texture = null;
      }
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
                onClick={() => handleClick(index, item.name, item.modelPath, item.defaultCameraPosition, item.texturePath)}
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