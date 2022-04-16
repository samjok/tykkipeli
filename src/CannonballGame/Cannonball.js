export default class CannonballLauncher {
  constructor(game) {
    this.game = game;
    this.cannonball = new GravityBall(this.game);
    this.cannonball2 = new GravityBall(this.game);
    this.cannonball3 = new GravityBall(this.game);
    this.cannonball4 = new GravityBall(this.game);
    this.cannonball5 = new GravityBall(this.game);
    this.counter = 0;
    this.amount = 150;
    this.launcher = [
      this.cannonball,
      this.cannonball2,
      this.cannonball3,
      this.cannonball4,
      this.cannonball5,
    ];
  }

  launch() {
    if (
      this.counter < this.amount &&
      !this.launcher[this.counter % 5].launched
    ) {
      this.launcher[this.counter % 5].launch();
      this.counter++;
    }
  }
  draw(ctx) {
    this.cannonball.draw(ctx);
    this.cannonball2.draw(ctx);
    this.cannonball3.draw(ctx);
    this.cannonball4.draw(ctx);
    this.cannonball5.draw(ctx);
  }
  update(dt) {
    this.cannonball.update(dt);
    this.cannonball2.update(dt);
    this.cannonball3.update(dt);
    this.cannonball4.update(dt);
    this.cannonball5.update(dt);
  }
  reset() {
    this.counter = 0;
    this.cannonball.reset();
    this.cannonball2.reset();
    this.cannonball3.reset();
    this.cannonball4.reset();
    this.cannonball5.reset();
  }
}

export class GravityBall {
  constructor(game) {
    this.game = game;
    this.radius = 5.0;
    this.launched = false;
    this.position = {
      x: this.game.cannon.position.x + this.game.cannon.width / 2,
      y: this.game.cannon.position.y,
    };

    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.3;
  }
  launch() {
    if (!this.launched) {
      this.velocityX = 36 * Math.cos(this.game.cannon.pipeAngle);
      this.velocityY = 36 * Math.sin(this.game.cannon.pipeAngle);
      this.launched = true;
    }
  }

  reset() {
    this.position = {
      x: this.game.cannon.position.x + this.game.cannon.width / 2,
      y: this.game.cannon.position.y,
    };
    this.velocityX = this.game.cannon.speed.x;
    this.velocityY = this.game.cannon.speed.y;
    this.launched = false;
  }

  draw(ctx) {
    ctx.beginPath();
    Math.abs(this.game.cannon.position.x - this.position.x < 50) &&
    Math.abs(this.game.cannon.position.y - this.position.y < 50)
      ? (ctx.fillStyle = "green")
      : (ctx.fillStyle = "green");

    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(dt) {
    if (!dt) return;
    if (
      this.position.y > this.game.gameHeight ||
      this.position.y < -100 ||
      this.position.x > this.game.gameWidth + 500 ||
      this.position.x < -500
    ) {
      this.position = {
        x: this.game.cannon.position.x + this.game.cannon.width / 2,
        y: this.game.cannon.position.y,
      };
      this.velocityX = this.game.cannon.speed.x;
      this.velocityY = this.game.cannon.speed.y;
      this.launched = false;
    }
    if (!this.launched) {
      this.velocityX = this.game.cannon.speed.x;
      this.velocityY = this.game.cannon.speed.y;
    }
    this.position.x += this.velocityX;
    this.position.y += this.velocityY;
    this.velocityY += this.gravity;
  }
}
