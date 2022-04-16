import Ball from "./Ball";
import Cannon from "./Cannon";
import CannonballLauncher from "./Cannonball";
import InputHandler from "./InputHandler";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameOver = false;
    this.points = 0;
    this.paused = true;
    this.cannon = new Cannon(this);
    this.cannonballLauncher = new CannonballLauncher(this);
    this.handler = new InputHandler(this);
    this.ball = new Ball(this);
    this.ball2 = new Ball(this);
    this.ball3 = new Ball(this);
    this.ball4 = new Ball(this);
    this.ball5 = new Ball(this);
    this.ball6 = new Ball(this);
    this.ball7 = new Ball(this);
    this.ball8 = new Ball(this);
    this.ball9 = new Ball(this);
    this.ball10 = new Ball(this);
    this.recordSaved = false;
  }

  reset() {
    this.points = 0;
    this.recordSaved = false;
    this.gameOver = false;
    this.paused = false;
    this.cannon.reset();
    this.cannonballLauncher.reset();
    this.ball.reset();
    this.ball2.reset();
    this.ball3.reset();
    this.ball4.reset();
    this.ball5.reset();
    this.ball6.reset();
    this.ball7.reset();
    this.ball8.reset();
    this.ball9.reset();
    this.ball10.reset();
  }

  pause() {
    this.paused = !this.paused;
  }

  update(deltaTime) {
    this.cannon.update(deltaTime);
    this.ball.update(deltaTime);
    this.cannonballLauncher.update(deltaTime);
    this.points > 9 && this.ball2.update(deltaTime);
    this.points > 19 && this.ball3.update(deltaTime);
    this.points > 29 && this.ball4.update(deltaTime);
    this.points > 39 && this.ball5.update(deltaTime);
    this.points > 49 && this.ball6.update(deltaTime);
    this.points > 59 && this.ball7.update(deltaTime);
    this.points > 69 && this.ball8.update(deltaTime);
    this.points > 79 && this.ball9.update(deltaTime);
    this.points > 89 && this.ball10.update(deltaTime);
    if (
      this.cannonballLauncher.amount - this.cannonballLauncher.counter ===
      0
    ) {
      this.gameOver = true;
    }
  }

  draw(ctx, deltaTime) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    if (!this.paused && !this.gameOver) {
      this.update(deltaTime);
    }
    if (this.paused) {
      ctx.lineWidth = "2";
      ctx.font = "30px Arial";
      ctx.strokeText(
        `Controls: Move cannon with arrowkeys and shoot with z`,
        570,
        150
      );
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, this.gameHeight - 20, 200, 20);
    ctx.fillRect(this.gameWidth - 200, this.gameHeight - 20, 200, 20);
    ctx.fillStyle = "green";
    this.cannon.draw(ctx);
    this.ball.draw(ctx);
    this.cannonballLauncher.draw(ctx);
    this.points > 9 && this.ball2.draw(ctx);
    this.points > 19 && this.ball3.draw(ctx);
    this.points > 29 && this.ball4.draw(ctx);
    this.points > 39 && this.ball5.draw(ctx);
    this.points > 49 && this.ball6.draw(ctx);
    this.points > 59 && this.ball7.draw(ctx);
    this.points > 69 && this.ball8.draw(ctx);
    this.points > 79 && this.ball9.draw(ctx);
    this.points > 89 && this.ball10.draw(ctx);
    ctx.lineWidth = "2";
    ctx.font = "30px Arial";
    ctx.strokeText(`Points: ${this.points}`, 10, 50);
    ctx.font = "26px Arial";
    ctx.strokeText(
      `Cannonballs: ${
        this.cannonballLauncher.amount - this.cannonballLauncher.counter
      }`,
      10,
      100
    );
    if (this.gameOver) {
      ctx.font = "60px Arial";
      ctx.strokeText(
        `GAME OVER`,
        this.gameWidth / 2 - this.gameWidth / 11,
        this.gameHeight / 2
      );
    }
  }
}
