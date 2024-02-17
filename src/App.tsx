import { useEffect, useState, useRef } from 'react'
import './App.css'
import { Vec3, Camera, Light, Renderer, Scene, RGBA, Material, Geometry } from "ts-3d-engine";
import SettingsSection from './SettingsSection';
import ModelSection from './ModelSection';
import TopSection from './TopSection';
import { render } from 'react-dom';

const App: React.FC = () => {
  // const [circleColor, setCircleColor] = useState('#3498db');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  let sceneBackgroundColor : RGBA = new RGBA(170,90,120);

  const cam: Camera = new Camera();
  cam.position = new Vec3(0, 1, -5);

  const light: Light = new Light();
  light.direction = new Vec3(0, 0, 1);

  const scene: Scene = new Scene(light);

  //const texture = await TextureLoader.loadTextureFromImage("truck.png");

  const mesh = Geometry.cube();

  const material = new Material();
  material.color = new RGBA(255, 255, 255);
  material.wireframe = true;
  material.wireframeWidth = 2;
  //material.texture = texture;

  //const mesh: Model = await ModelLoader.loadFromObjectFile('truck.obj');
  mesh.material = material;
  mesh.translation = new Vec3(0, 0, 0);

  scene.addModel(mesh);

  useEffect(() => {
    // animationFrameRef.current = requestAnimationFrame(updatePosition);
    const initRender = async () => {

      const renderer: Renderer = new Renderer(canvasRef.current!);
      renderer.backgroundColor = sceneBackgroundColor;

      function rotate(timeElapsed: number) {
        const yRotation = timeElapsed * 0.5;
        mesh.rotation = new Vec3(0, yRotation, 0);
        renderer.render(scene, cam);
      }

      function animate(timeElapsed: number) {
        rotate(timeElapsed / 1000);
        animationFrameRef.current = requestAnimationFrame(animate);
      }

      animationFrameRef.current = requestAnimationFrame(animate);

      material.color = new RGBA(100, 250, 0);
    }

    initRender();

    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
    };

  }, []);

  return (
    <>
    {/* <TopSection></TopSection> */}
    <div className='main-app'>
      {/* <ModelSection></ModelSection> */}
      <canvas ref={canvasRef} width={800} height={500} className='display'/>
      <SettingsSection material={material} light={light} sceneBackgroundColor={sceneBackgroundColor}></SettingsSection>
    </div>
    </>);
};

export default App
