import { Camera, Geometry, Light, Material, RGBA, Renderer, Scene, Vec3 } from "ts-3d-engine";


self.onmessage = function (e) {
  const { message } = e.data;

  // let animationFrame: number = 0;

  // let sceneBackgroundColor: RGBA = new RGBA(60, 60, 60);

  // const cam: Camera = new Camera();
  // cam.position = new Vec3(0, 0, -5);

  // const light : Light = new Light();
  // light.direction = new Vec3(0, 0, 1);

  // const material = new Material();
  // material.color = new RGBA(255, 255, 255);
  // material.wireframe = false;

  // let mesh = Geometry.CUBE;
  // mesh.material = material;
  // mesh.translation = new Vec3(0, 0, 0);

  // const scene : Scene = new Scene(light);
  // scene.addModel(mesh);
  
  // let prevTime = 0;
  // let fps = 0;
  // let lastUpdate = performance.now();
  // let renderer: Renderer = new Renderer(offscreenCanvas);


  // function animate(currentTime: number) {
  //   //controls?.update();
  //   renderer.backgroundColor = sceneBackgroundColor;
  //   renderer.render(scene, cam);
  //   animationFrame = requestAnimationFrame(animate);
  //   renderer.enableRasterizationViaCanvasApi = true;

  //   const deltaTime = currentTime - prevTime; // Calculate time difference
  //   prevTime = currentTime; // Update previous timestamp

  //   const lastUpdateTime = currentTime - lastUpdate;
  //   if (lastUpdateTime >= 1000) {
  //     fps = Math.round(1000 / deltaTime);
  //     lastUpdate = currentTime;
  //   }

  //   // Calculate FPS
  //   // Update FPS in console
  //   const ctx = offscreenCanvas.getContext('2d');
  //   if (ctx) {
  //     ctx.fillStyle = 'white';
  //     ctx.font = 'bold 16px Arial'; // Use a bold font with larger size
  //     ctx.fillText(`${fps}`, 10, 20); // Display current FPS
  //   }
  // }

  // const resizeHandler = () => {
  //   const canvas = offscreenCanvas;
  //   const parentDiv = canvas?.parentElement;
  //   if (canvas && parentDiv) {
  //     canvas.width = parentDiv.clientWidth;
  //     canvas.height = parentDiv.clientHeight;
  //     const backgroundColor = renderer.backgroundColor;
  //     const enableApiDrawing = renderer.enableRasterizationViaCanvasApi;
  //     renderer.canvas = canvas;
  //     renderer.backgroundColor = backgroundColor;
  //     renderer.enableRasterizationViaCanvasApi = enableApiDrawing;
  //   }
  // };

  // resizeHandler();

  // requestAnimationFrame(animate);
};