export default class Cannonball {
  constructor(game) {
    this.game = game;
    this.radius = 5.0;
    this.launched = false;
    this.position = {
      x: this.game.cannon.position.x + (this.game.cannon.width / 2),
      y: this.game.cannon.position.y
    }

    this.speed = {
      x: this.game.cannon.speed.x,
      y: this.game.cannon.speed.y,
    }
  }

  reset() {
    this.position = {
      x: this.game.cannon.position.x + (this.game.cannon.width / 2),
      y: this.game.cannon.position.y
    }
    this.speed = {
      x: this.game.cannon.speed.x,
      y: this.game.cannon.speed.y,
    }
    this.launched = false;
  }

  launch() {
    if(!this.game.gameover && !this.game.paused)
    this.speed = {
      x: 60 * Math.cos(this.game.cannon.pipeAngle),
      y: 60 * Math.sin(this.game.cannon.pipeAngle)
    }
    this.launched = true;
  }

  draw(ctx) {
    ctx.beginPath();
    Math.abs(this.game.cannon.position.x - this.position.x < 50)
      && Math.abs(this.game.cannon.position.y - this.position.y < 50) ? ctx.fillStyle = 'green'
      : ctx.fillStyle = 'red'
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(dt) {
    if (!dt) return;
    if (this.position.x > this.game.gameWidth || this.position.x < 0
      || this.position.y < 0 || this.position.y > this.game.gameHeight) {
      this.position = {
        x: this.game.cannon.position.x + (this.game.cannon.width / 2),
        y: this.game.cannon.position.y
      }
      this.speed = this.game.cannon.speed;
    }
   if (!this.launched) {
      this.speed = this.game.cannon.speed;
    }
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}