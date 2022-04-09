import React, { useEffect, useRef } from "react";
import useCanvas from "./useCanvas";
import "./styles.css";

const Canvas = ({ draw, className, ...rest }) => {
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} className={className} />;
};

export default Canvas;
