import React from 'react';
import { Camera, Material, Model, Scene, TransformControls, Vec3 } from 'ts-3d-engine';
import PreviewItem from './PreviewItem';
import './ExampleModels.css'


const IMAGE_BASE_PATH = `${import.meta.env.BASE_URL}/preview-images`;
const MODEL_BASE_PATH = `${import.meta.env.BASE_URL}/preview-models`;

interface PreviewModelsProps {
  scene: Scene;
  controls: TransformControls | null;
  mesh: Model;
  material: Material;
  camera: Camera;
}

const ExampleModels: React.FC<PreviewModelsProps> = ({ scene, controls, material, camera }) => {

  const previewItems = [
    { name: 'Create', imgPath: `${IMAGE_BASE_PATH}/crate.png`, modelPath: `${MODEL_BASE_PATH}/crate/crate.obj`, defaultCameraPosition: new Vec3(0, 0, -10), texturePath: `${MODEL_BASE_PATH}/crate/crate_tex.png` },
    { name: 'Tennis Ball', imgPath: `${IMAGE_BASE_PATH}/tennis_ball.png`, modelPath: `${MODEL_BASE_PATH}/tennis_ball/tennis_ball.obj`, defaultCameraPosition: new Vec3(0, 0, -8), texturePath: `${MODEL_BASE_PATH}/tennis_ball/tennis_ball_tex.png` },
    { name: 'Coffee Pot', imgPath: `${IMAGE_BASE_PATH}/coffee_pot.png`, modelPath: `${MODEL_BASE_PATH}/coffee_pot/coffee_pot.obj`, defaultCameraPosition: new Vec3(0, 0, -5), texturePath: `${MODEL_BASE_PATH}/coffee_pot/coffee_pot_tex.png` },
    { name: 'Barrel', imgPath: `${IMAGE_BASE_PATH}/barrel.png`, modelPath: `${MODEL_BASE_PATH}/barrel/barrel.obj`, defaultCameraPosition: new Vec3(0, 0, -3), texturePath: `${MODEL_BASE_PATH}/barrel/barrel_tex.png` },
    { name: 'Helicopter', imgPath: `${IMAGE_BASE_PATH}/helicopter.png`, modelPath: `${MODEL_BASE_PATH}/helicopter/helicopter.obj`, defaultCameraPosition: new Vec3(0, 0, -8), texturePath: `${MODEL_BASE_PATH}/helicopter/helicopter_tex.png` },
    { name: 'Car', imgPath: `${IMAGE_BASE_PATH}/car.png`, modelPath: `${MODEL_BASE_PATH}/car/car.obj`, defaultCameraPosition: new Vec3(0, 0, -5), texturePath: `${MODEL_BASE_PATH}/car/car_tex.jpg` },
    { name: 'Thompson', imgPath: `${IMAGE_BASE_PATH}/thompson.png`, modelPath: `${MODEL_BASE_PATH}/thompson/thompson.obj`, defaultCameraPosition: new Vec3(0, 0, -70), texturePath: `${MODEL_BASE_PATH}/thompson/thompson_tex.png` },
    { name: 'Merlin', imgPath: `${IMAGE_BASE_PATH}/merlin.png`, modelPath: `${MODEL_BASE_PATH}/merlin/merlin.obj`, defaultCameraPosition: new Vec3(0, 0, -5), texturePath: `${MODEL_BASE_PATH}/merlin/merlin_tex.png` },
    { name: 'Gamegear', imgPath: `${IMAGE_BASE_PATH}/gamegear.png`, modelPath: `${MODEL_BASE_PATH}/gamegear/gamegear.obj`, defaultCameraPosition: new Vec3(0, 0, -3), texturePath: `${MODEL_BASE_PATH}/gamegear/gamegear_tex.png` },
    { name: 'Dinosaur', imgPath: `${IMAGE_BASE_PATH}/dinosaur.png`, modelPath: `${MODEL_BASE_PATH}/dinosaur/dinosaur.obj`, defaultCameraPosition: new Vec3(0, 0, -9), texturePath: `${MODEL_BASE_PATH}/dinosaur/dinosaur_tex.png` },
    { name: 'Crash', imgPath: `${IMAGE_BASE_PATH}/crash.png`, modelPath: `${MODEL_BASE_PATH}/crash/crash.obj`, defaultCameraPosition: new Vec3(0, 0, -2), texturePath: `${MODEL_BASE_PATH}/crash/crash_tex.png` },
    { name: 'Lara', imgPath: `${IMAGE_BASE_PATH}/lara.png`, modelPath: `${MODEL_BASE_PATH}/lara/lara.obj`, defaultCameraPosition: new Vec3(0, 0, -2), texturePath: `${MODEL_BASE_PATH}/lara/lara_tex.png` },
    { name: 'Iron Man', imgPath: `${IMAGE_BASE_PATH}/ironman.png`, modelPath: `${MODEL_BASE_PATH}/ironman/ironman.obj`, defaultCameraPosition: new Vec3(0, 0, -2), texturePath: `${MODEL_BASE_PATH}/ironman/ironman_tex.png` },
    { name: 'Dragon', imgPath: `${IMAGE_BASE_PATH}/dragon.png`, modelPath: `${MODEL_BASE_PATH}/dragon/dragon.obj`, defaultCameraPosition: new Vec3(0, 0, -8), texturePath: `${MODEL_BASE_PATH}/dragon/dragon_tex.png` },
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