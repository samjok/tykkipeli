import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Game from "./Game";
import "./styles.css";

const CannonballGame = () => {
  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight;

  let game = new Game(gameWidth, gameHeight);

  const draw = (ctx, deltaTime) => game.draw(ctx, deltaTime);

  return (
    <div className="containerRow">
      <button className="btn" onClick={() => game.reset()}>
        START NEW GAME
      </button>
      <Canvas
        draw={draw}
        width={gameWidth}
        height={gameHeight}
        className="gameArea"
      />
    </div>
  );
};

export default CannonballGame;
