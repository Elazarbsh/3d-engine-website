import React from 'react';
import { Camera, Material, ModelLoader, Scene, TextureLoader, TransformControls, Vec3 } from 'ts-3d-engine';
import './PreviewItem.css'

interface PreviewItemProps {
  name: string;
  imgPath: string;
  modelPath: string;
  cameraPosition: Vec3;
  texturePath: string | null;
  material: Material;
  scene: Scene;
  controls: TransformControls | null;
  camera: Camera;
}

const PreviewItem: React.FC<PreviewItemProps> = ({ name, imgPath, modelPath, cameraPosition, texturePath, material, scene, controls, camera }) => {

  const handleClick = async () => {
    try {
      let newMesh = await ModelLoader.loadFromObjectFilePathAsync(modelPath);
      newMesh.material = material;
      if (texturePath != null) {
        let tex = await TextureLoader.loadTextureFromImagePath(texturePath);
        material.texture = tex;
      } else {
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

  const handleMouseEnter = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.currentTarget.classList.add('hovered');
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.currentTarget.classList.remove('hovered');
  };

  return (
    <div className="image-wrapper">
      <img
        src={imgPath}
        alt={name}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="gallery-image"
      />
      <div className="image-name">{name}</div>
    </div>
  );
};

export default PreviewItem;