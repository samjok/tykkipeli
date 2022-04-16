export default class Cannon {
  constructor(game) {
    this.game = game;
    this.width = 150.0;
    this.height = 50.0;
    this.pipeLength = 100;
    this.pipeAngle = Math.PI * 1.7;

    this.position = {
      x: 200,
      y: this.game.gameHeight - this.height,
    };

    this.speed = {
      x: 0,
      y: 0,
    };

    this.maxSpeed = 8;
  }

  reset() {
    this.position = {
      x: 200,
      y: this.game.gameHeight - this.height,
    };

    this.speed = {
      x: 0,
      y: 0,
    };
  }

  moveLeft() {
    if (!this.game.gameOver && !this.game.paused) this.speed.x = -this.maxSpeed;
  }

  moveRight() {
    if (!this.game.gameOver && !this.game.paused) this.speed.x = this.maxSpeed;
  }

  turnPipeLeft() {
    if (!this.game.gameOver && !this.game.paused)
      if (this.pipeAngle > Math.PI + 0.3) this.pipeAngle -= 0.2;
  }

  turnPipeRight() {
    if (!this.game.gameOver && !this.game.paused)
      if (this.pipeAngle < 2 * Math.PI - 0.3) this.pipeAngle += 0.2;
  }

  stopX() {
    this.speed.x = 0;
  }

  stopY() {
    this.speed.y = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.arc(
      this.position.x + this.width / 2,
      this.position.y,
      50,
      Math.PI,
      Math.PI * 2
    );
    ctx.lineWidth = "15";
    ctx.moveTo(this.position.x + this.width / 2, this.position.y);

    // cannon pipe
    ctx.lineTo(
      this.position.x +
        this.width / 2 +
        this.pipeLength * Math.cos(this.pipeAngle),
      this.position.y + this.pipeLength * Math.sin(this.pipeAngle)
    );
    ctx.stroke();
    ctx.fill();
  }

  update(dt) {
    if (!dt) return;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x < 200) {
      this.position.x = 200;
      this.speed.x = 0;
    }
    if (this.position.x > this.game.gameWidth - this.width - 200) {
      this.position.x = this.game.gameWidth - this.width - 200;
      this.speed.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    if (this.position.y > this.game.gameHeight - this.height) {
      this.position.y = this.game.gameHeight - this.height;
    }
  }
}
