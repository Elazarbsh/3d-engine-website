import { useEffect, useState, useRef } from 'react'
import './App.css'
import { Vec3, Camera, Light, Renderer, Scene, RGBA, Material, Geometry, TransformControls, ModelLoader } from "ts-3d-engine";
import SettingsSection from './SettingsSection';
import ModelSection from './ModelSection';
import TopSection from './TopSection';
import { render } from 'react-dom';

const App: React.FC = () => {
  // const [circleColor, setCircleColor] = useState('#3498db');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showFPSRef = useRef(true);
  //const [isFpsActive, setFpsActive] = useState(true);


  let sceneBackgroundColor: RGBA = new RGBA(60, 60, 60);

  const cam: Camera = new Camera();
  cam.position = new Vec3(0, 0, -5);

  const light: Light = new Light();
  light.direction = new Vec3(0, 0, 1);

  const scene: Scene = new Scene(light);

  //const texture = await TextureLoader.loadTextureFromImage("truck.png");

  let mesh = Geometry.CUBE;

  const material = new Material();
  material.color = new RGBA(255, 255, 255);
  material.wireframe = false;
  //material.texture = texture;

  //const mesh: Model = await ModelLoader.loadFromObjectFile('truck.obj');
  mesh.material = material;
  mesh.translation = new Vec3(0, 0, 0);

  const newCanvas = document.createElement('canvas');
  let controls = new TransformControls(mesh, cam, newCanvas);


  scene.addModel(mesh);

  useEffect(() => {
    let prevTime = 0; // Variable to store the previous timestamp
    let fps = 0; // Variable to store FPS
    let lastUpdate = performance.now(); // Store timestamp of the last update

    // animationFrameRef.current = requestAnimationFrame(updatePosition);
    const initRender = async () => {

      const renderer: Renderer = new Renderer(canvasRef.current!);
      renderer.backgroundColor = sceneBackgroundColor;

      controls.canvas = canvasRef.current!
      controls.enableControls();

      function animate(currentTime: number) {
        controls?.update();
        renderer.render(scene, cam);
        animationFrameRef.current = requestAnimationFrame(animate);

        const deltaTime = currentTime - prevTime; // Calculate time difference
        prevTime = currentTime; // Update previous timestamp

        const lastUpdateTime = currentTime - lastUpdate;
        if (lastUpdateTime >= 1000) {
          fps = Math.round(1000 / deltaTime);
          lastUpdate = currentTime;
        }

        // Calculate FPS
        // Update FPS in console
        const ctx = canvasRef.current!.getContext('2d');
        if (ctx && showFPSRef.current) {
          console.log(showFPSRef.current)
          ctx.fillStyle = 'white';
          ctx.font = 'bold 16px Arial'; // Use a bold font with larger size
          ctx.fillText(`${fps}`, 10, 20); // Display current FPS
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);

      // TODO move out of useeffect
      const canvas = canvasRef.current!;
      const parentDiv = canvas.parentElement!;
      const ctx = canvasRef.current!.getContext('2d');

      canvas.width = parentDiv.clientWidth;
      canvas.height = parentDiv.clientHeight;
  
      console.log("width " + canvasRef.current!.width);
      console.log("height " + canvasRef.current!.height);

      const resizeHandler = () => {
        console.log("resize")
        const canvas = canvasRef.current;
        const parentDiv = canvas?.parentElement;
        if (canvas && parentDiv) {
          console.log("yes")
          canvas.width = parentDiv.clientWidth;
          canvas.height = parentDiv.clientHeight;
          console.log(`resizing to ${canvas.width} ${canvas.height}`)
          renderer.screenHeight = canvas.height;
          renderer.screenWidth = canvas.width;
        }
      };
      window.addEventListener('resize', resizeHandler);

    }

    initRender();

    // canvasRef.current!.style.width = "100%";
    // canvasRef.current!.style.height = "100%";
    // canvasRef.current!.width = canvasRef.current!.offsetWidth;
    // canvasRef.current!.height = canvasRef.current!.offsetHeight;


  

    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
    };




  }, []);




  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const filename = 'canvas_image.png';

    // Ensure the canvas element is available
    if (canvas) {
      // Convert the canvas content to a data URL
      const dataURL = canvas.toDataURL('image/png');

      // Create a link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
    }
  };

  // Function to toggle display of FPS
  const toggleFPS = () => {
    showFPSRef.current = !showFPSRef.current;
    //setFpsActive(!isFpsActive);
  };

  const handleUploadFile = () => {
    // Trigger the click event on the file input element
    console.log("upload clicked")
    fileInputRef.current!.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change fired")
    if (event.target instanceof HTMLInputElement && event.target.files) {
      console.log("condition true")
      const file = event.target.files[0];
      if (file) {
        try {
          mesh = await ModelLoader.loadFromObjectFileAsync(file);
          mesh.material = material;
          controls!.model = mesh;
          scene.clearModels();
          scene.addModel(mesh);
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
        <ModelSection scene={scene} controls={controls} mesh={mesh} material={material} camera={cam}></ModelSection>
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
              <img src="src/assets/icons/upload.svg" height={20} width={20} />
            </button>
            <button className='canvas-menu-button' onClick={handleDownloadImage} title='Snapshot'>
              <img src="src/assets/icons/camera.svg" height={20} width={20} />
            </button>
            <button className={`canvas-menu-button ${showFPSRef.current ? '' : 'fps-inactive'}`} onClick={toggleFPS} title='Toggle FPS'>
              <img src="src/assets/icons/fps.svg" height={20} width={20} />
            </button>

          </div>
          <div className='canvas-div'>
            <canvas ref={canvasRef} width={window.innerWidth} height={200} className='canvas' />
          </div>
        </div>
        <SettingsSection material={material} light={light} sceneBackgroundColor={sceneBackgroundColor}></SettingsSection>
      </div>
    </>);
};

export default App
