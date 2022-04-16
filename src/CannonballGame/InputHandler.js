// Input handler for keyboard events
export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          game.cannon.moveLeft();
          break;
        case "ArrowRight":
          game.cannon.moveRight();
          break;
        case "ArrowUp":
          !game.paused && game.cannon.turnPipeLeft();
          break;
        case "ArrowDown":
          !game.paused && game.cannon.turnPipeRight();
          break;
        case "z":
        case "Z":
          game.cannonballLauncher.launch();
          break;
        case "N":
        case "n":
          if (game.points === 0 || game.gameOver) {
            game.reset();
          }
          break;
        case "Escape":
          game.pause();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          if (game.cannon.speed.x < 0) game.cannon.stopX();
          break;
        case "ArrowRight":
          if (game.cannon.speed.x > 0) game.cannon.stopX();
          break;
      }
    });
  }
}
