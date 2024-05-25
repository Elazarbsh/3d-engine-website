self.onmessage = function (e) {
    var _a = e.data, offscreenCanvas = _a.offscreenCanvas, scene = _a.scene, cam = _a.cam, rendererConfig = _a.rendererConfig, showFPS = _a.showFPS, renderer = _a.renderer, controls = _a.controls, animationFrameRef = _a.animationFrameRef;
    renderer.canvas = offscreenCanvas;
    renderer.backgroundColor = rendererConfig.backgroundColor;
    var prevTime = 0;
    var fps = 0;
    var lastUpdate = performance.now();
    function animate(currentTime) {
        controls === null || controls === void 0 ? void 0 : controls.update();
        renderer.render(scene, cam);
        animationFrameRef.current = requestAnimationFrame(animate);
        renderer.enableRasterizationViaCanvasApi = true;
        var deltaTime = currentTime - prevTime; // Calculate time difference
        prevTime = currentTime; // Update previous timestamp
        var lastUpdateTime = currentTime - lastUpdate;
        if (lastUpdateTime >= 1000) {
            fps = Math.round(1000 / deltaTime);
            lastUpdate = currentTime;
        }
        // Calculate FPS
        // Update FPS in console
        var ctx = offscreenCanvas.getContext('2d');
        if (ctx && showFPS.current) {
            console.log(showFPS.current);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial'; // Use a bold font with larger size
            ctx.fillText("".concat(fps), 10, 20); // Display current FPS
        }
    }
    requestAnimationFrame(animate);
};
