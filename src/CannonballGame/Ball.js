export default class Ball {
  constructor(game) {
    this.game = game;

    this.radius = this.game.gameHeight / 16;

    this.position = {
      x: this.game.gameHeight / 9 + 30,
      y: this.game.gameHeight / 9 + 30,
    };

    this.speed = {
      x: 0,
      y: 0,
    };
  }

  reset() {
    this.position = {
      x: this.game.gameHeight / 9 + 30,
      y: this.game.gameHeight / 9 + 30,
    };

    this.speed = {
      x: 7,
      y: 7,
    };
  }

  draw(ctx) {
    if (this.game.cannon.gameOver) {
      return;
    }
    ctx.beginPath();
    if (
      Math.abs(
        this.game.cannon.position.x +
          this.game.cannon.width / 2 -
          this.position.x
      ) <
        50 + this.radius &&
      Math.abs(this.game.cannon.position.y - this.position.y) < 50 + this.radius
    ) {
      ctx.fillStyle = "red";
    } else ctx.fillStyle = "black";

    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(dt) {
    if (!dt || this.game.cannon.gameOver) return;
    if (
      Math.abs(
        this.game.cannon.position.x +
          this.game.cannon.width / 2 -
          this.position.x
      ) <
        this.radius + this.game.cannon.height / 2 &&
      Math.abs(this.game.cannon.position.y - this.position.y) <
        this.radius + this.game.cannon.height / 2
    ) {
      this.game.gameOver = true;
    }
    const collision = (cannonball) => {
      if (
        Math.abs(this.position.x - cannonball.position.x) <
          this.radius + cannonball.radius &&
        Math.abs(this.position.y - cannonball.position.y) <
          this.radius + cannonball.radius
      ) {
        return true;
      } else return false;
    };
    if (
      collision(this.game.cannonballLauncher.cannonball) ||
      collision(this.game.cannonballLauncher.cannonball2) ||
      collision(this.game.cannonballLauncher.cannonball3) ||
      collision(this.game.cannonballLauncher.cannonball4) ||
      collision(this.game.cannonballLauncher.cannonball5)
    ) {
      if (Math.random() < 0.8) {
        {
          this.position = {
            x:
              this.game.gameWidth / 9 +
              Math.random() * this.game.gameWidth * 0.8,
            y: this.game.gameWidth / 9,
          };
          this.game.points += 1;
          if (Math.random() < 0.5) {
            this.speed = {
              x: 7,
              y: 7,
            };
          } else {
            this.speed = {
              x: -7,
              y: 7,
            };
          }
        }
      } else {
        if (Math.random() < 0.5) {
          this.game.points += 1;
          this.position = {
            x: this.game.gameWidth - 80,
            y: this.game.gameHeight - 100,
          };
          this.speed = {
            x: -3.5,
            y: 0,
          };
        } else {
          this.game.points += 1;
          this.position = {
            x: 80,
            y: this.game.gameHeight - 120,
          };
          this.speed = {
            x: 3.5,
            y: 0,
          };
        }
      }
    }

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x < this.radius) {
      this.speed.x = -this.speed.x;
    }
    if (this.position.x > this.game.gameWidth - this.radius) {
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < this.radius) {
      this.speed.y = -this.speed.y;
    }
    if (this.position.y > this.game.gameHeight - this.radius) {
      this.speed.y = -this.speed.y;
      this.speed.x = this.speed.x;
    }
  }
}
