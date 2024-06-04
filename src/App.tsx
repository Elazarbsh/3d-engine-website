import { useEffect, useState, useRef } from 'react'
import './App.css'
import { Vec3, Camera, Light, Renderer, Scene, RGBA, Material, Geometry, TransformControls, ModelLoader, Model } from "ts-3d-engine";
import SettingsSection from './SettingsSection';
import ModelSection from './ModelSection';
import TopSection from './TopSection';
import MyWorker from './AnimationWorker?worker';

import UploadIcon from "./assets/icons/upload.svg";
import CameraIcon from "./assets/icons/camera.svg";
import FpsIcon from "./assets/icons/fps.svg";

const App: React.FC = () => {
  // const [circleColor, setCircleColor] = useState('#3498db');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showFPSRef = useRef(true);
  //const [isFpsActive, setFpsActive] = useState(true);

  let sceneBackgroundColor: RGBA = new RGBA(60, 60, 60);

  const camRef = useRef<Camera>(new Camera());
  camRef.current.position = new Vec3(0, 0, -5);

  const lightRef = useRef<Light>(new Light());
  lightRef.current.direction = new Vec3(0, 0, 1);

  const materialRef = useRef<Material>(new Material());
  materialRef.current.color = new RGBA(255, 255, 255);
  materialRef.current.wireframe = false;

  let meshRef = useRef<Model>(Geometry.CUBE);
  meshRef.current.material = materialRef.current;
  meshRef.current.translation = new Vec3(0, 0, 0);

  const placeHolderCanvas = document.createElement('canvas');
  let controls = new TransformControls(meshRef.current, camRef.current, placeHolderCanvas);

  const sceneRef = useRef<Scene>(new Scene(lightRef.current));
  sceneRef.current.addModel(meshRef.current);

  useEffect(() => {

    //const offscreenCanvas = canvasRef.current.transferControlToOffscreen();
    //const worker = new MyWorker();
    //worker.postMessage({message:"hi"}, []);

    let prevTime = 0; // Variable to store the previous timestamp
    let fps = 0; // Variable to store FPS
    let lastUpdate = performance.now(); // Store timestamp of the last update

    let renderer: Renderer = new Renderer(canvasRef.current!);
    renderer.backgroundColor = sceneBackgroundColor;
    controls.canvas = canvasRef.current!
    controls.enableControls();

    function animate(currentTime: number) {
      controls?.update();
      renderer.render(sceneRef.current, camRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.enableRasterizationViaCanvasApi = true;

      const deltaTime = currentTime - prevTime; // Calculate time difference
      prevTime = currentTime; // Update previous timestamp

      const lastUpdateTime = currentTime - lastUpdate;
      if (lastUpdateTime >= 1000) {
        fps = Math.round(1000 / deltaTime);
        lastUpdate = currentTime;
      }

      // Calculate FPS
      const ctx = canvasRef.current!.getContext('2d');
      if (ctx && showFPSRef.current) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`${fps}`, 10, 20);
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    const resizeHandler = () => {
      const canvas = canvasRef.current;
      const parentDiv = canvas?.parentElement;
      if (canvas && parentDiv) {
        canvas.width = parentDiv.clientWidth;
        canvas.height = parentDiv.clientHeight;
        renderer.canvas = canvas;
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);


    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
    };

  }, []);


  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const filename = 'canvas_image.png';

    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    }
  };

  // Function to toggle display of FPS
  const toggleFPS = () => {
    showFPSRef.current = !showFPSRef.current;
    //setFpsActive(!isFpsActive);
  };

  const handleUploadFile = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      const file = event.target.files[0];
      if (file) {
        try {
          meshRef.current = await ModelLoader.loadFromObjectFileAsync(file);
          meshRef.current.material = materialRef.current;
          controls!.model = meshRef.current;
          sceneRef.current.clearModels();
          sceneRef.current.addModel(meshRef.current);
        } catch (error) {
          console.error("Error parsing the file:", error);
        }
      }
      event.target.value = '';
    }
  };

  return (
    <>
      <TopSection></TopSection>
      <div className='main-app'>
        <ModelSection scene={sceneRef.current} controls={controls} mesh={meshRef.current} material={materialRef.current} camera={camRef.current}></ModelSection>
        <div className="canvas-container">
          <div className="canvas-menu">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".obj"
              onChange={handleFileChange}
            />
            <button className='canvas-menu-button' onClick={handleUploadFile} title='Upload Model'>
              <img src={UploadIcon} className='canvas-menu-button-icon' />
            </button>
            <button className='canvas-menu-button' onClick={handleDownloadImage} title='Snapshot'>
              <img src={CameraIcon} className='canvas-menu-button-icon' />
            </button>
            <button className={`canvas-menu-button ${showFPSRef.current ? '' : 'fps-inactive'}`} onClick={toggleFPS} title='Toggle FPS'>
              <img src={FpsIcon} className='canvas-menu-button-icon' />
            </button>
          </div>
          <div className='canvas-div'>
            <canvas ref={canvasRef} width={200} height={200} />
          </div>
        </div>
        <SettingsSection material={materialRef.current} light={lightRef.current} sceneBackgroundColor={sceneBackgroundColor}></SettingsSection>
      </div>
    </>);
};

export default App
