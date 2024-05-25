
self.onmessage = function (e) {
  const { offscreenCanvas, scene, cam, rendererConfig, showFPS, renderer , controls, animationFrameRef} = e.data;
  renderer.canvas = offscreenCanvas
  renderer.backgroundColor = rendererConfig.backgroundColor;
  
  let prevTime = 0;
  let fps = 0;
  let lastUpdate = performance.now();

  function animate(currentTime: number) {
    controls?.update();
    renderer.render(scene, cam);
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
    // Update FPS in console
    const ctx = offscreenCanvas.getContext('2d');
    if (ctx && showFPS.current) {
      console.log(showFPS.current)
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial'; // Use a bold font with larger size
      ctx.fillText(`${fps}`, 10, 20); // Display current FPS
    }
  }

  requestAnimationFrame(animate);
};