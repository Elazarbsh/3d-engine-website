import React from 'react';
import { Camera, Material, Model, Scene, TransformControls, Vec3 } from 'ts-3d-engine';
import PreviewItem from './PreviewItem';
import './ExampleModels.css'


const IMAGE_BASE_PATH = '/src/assets/preview-images';
const MODEL_BASE_PATH = '/src/assets/preview-models';
const TEXTURED_IMAGE_BASE_PATH = '/src/assets/preview-images-textured';
const TEXTURED_MODEL_BASE_PATH = '/src/assets/preview-models-textured';


interface PreviewModelsProps {
  scene: Scene;
  controls: TransformControls | null;
  mesh: Model;
  material: Material;
  camera: Camera;
}



const ExampleModels: React.FC<PreviewModelsProps> = ({ scene, controls, material, camera }) => {

  const previewItems = [
    { name: 'Cube', imgPath: `${IMAGE_BASE_PATH}/cube.png`, modelPath: `${MODEL_BASE_PATH}/cube.obj`, defaultCameraPosition: new Vec3(0, 0, -5), texturePath: null },
    { name: 'Sphere', imgPath: `${IMAGE_BASE_PATH}/sphere.png`, modelPath: `${MODEL_BASE_PATH}/sphere.obj`, defaultCameraPosition: new Vec3(0, 0, -10), texturePath: null },
    { name: 'Teapot', imgPath: `${IMAGE_BASE_PATH}/teapot.png`, modelPath: `${MODEL_BASE_PATH}/teapot.obj`, defaultCameraPosition: new Vec3(0, 0, -10), texturePath: null },
    { name: 'Black Dragon Kalameet', imgPath: `${IMAGE_BASE_PATH}/kalameet.png`, modelPath: `${MODEL_BASE_PATH}/kalameet.obj`, defaultCameraPosition: new Vec3(0, 0, -20), texturePath: null },
    { name: 'Car', imgPath: `${IMAGE_BASE_PATH}/car.png`, modelPath: `${MODEL_BASE_PATH}/car.obj`, defaultCameraPosition: new Vec3(0, 0, -5), texturePath: null },
    { name: 'Lara', imgPath: `${TEXTURED_IMAGE_BASE_PATH}/lara.png`, modelPath: `${TEXTURED_MODEL_BASE_PATH}/lara/lara.obj`, defaultCameraPosition: new Vec3(0, 0, -2), texturePath: `${TEXTURED_MODEL_BASE_PATH}/lara/lara_tex.png` },
    { name: 'Crash', imgPath: `${TEXTURED_IMAGE_BASE_PATH}/crash.png`, modelPath: `${TEXTURED_MODEL_BASE_PATH}/crash/crash.obj`, defaultCameraPosition: new Vec3(0, 0, -2), texturePath: `${TEXTURED_MODEL_BASE_PATH}/crash/crash_tex.png` },
    { name: 'Helicopter', imgPath: `${TEXTURED_IMAGE_BASE_PATH}/helicopter.png`, modelPath: `${TEXTURED_MODEL_BASE_PATH}/helicopter/helicopter.obj`, defaultCameraPosition: new Vec3(0, 0, -10), texturePath: `${TEXTURED_MODEL_BASE_PATH}/helicopter/helicopter_tex.png` },
    { name: 'Thompson', imgPath: `${TEXTURED_IMAGE_BASE_PATH}/thompson.png`, modelPath: `${TEXTURED_MODEL_BASE_PATH}/thompson/thompson.obj`, defaultCameraPosition: new Vec3(0, 0, -70), texturePath: `${TEXTURED_MODEL_BASE_PATH}/thompson/thompson_tex.png` },
    { name: 'Gamegear', imgPath: `${TEXTURED_IMAGE_BASE_PATH}/gamegear.png`, modelPath: `${TEXTURED_MODEL_BASE_PATH}/gamegear/gamegear.obj`, defaultCameraPosition: new Vec3(0, 0, -1), texturePath: `${TEXTURED_MODEL_BASE_PATH}/gamegear/gamegear_tex.png` },
    { name: 'Barrel', imgPath: `${TEXTURED_IMAGE_BASE_PATH}/barrel.png`, modelPath: `${TEXTURED_MODEL_BASE_PATH}/barrel/barrel.obj`, defaultCameraPosition: new Vec3(0, 0, -3), texturePath: `${TEXTURED_MODEL_BASE_PATH}/barrel/barrel_tex.png` },
    { name: 'Merlin', imgPath: `${TEXTURED_IMAGE_BASE_PATH}/merlin.png`, modelPath: `${TEXTURED_MODEL_BASE_PATH}/merlin/merlin.obj`, defaultCameraPosition: new Vec3(0, 0, -8), texturePath: `${TEXTURED_MODEL_BASE_PATH}/merlin/merlin_tex.png` },
  ];

  return (
    <div className="scrollable-image-gallery">
      {previewItems.map((item, index) => (
        <PreviewItem
          key={index}
          name={item.name}
          imgPath={item.imgPath}
          modelPath={item.modelPath}
          cameraPosition={item.defaultCameraPosition}
          texturePath={item.texturePath}
          material={material}
          scene={scene}
          controls={controls}
          camera={camera}
        />
      ))}
    </div>
  );
};

export default ExampleModels;