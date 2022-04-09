import React, { useRef, useEffect } from "react";

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let lastTime = 0;
    let animationFrameId;

    const render = (timestamp) => {
      let deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      draw(context, deltaTime);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
