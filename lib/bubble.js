(function () {
  if (typeof NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var Bubble = NinjaPop.Bubble = function (bubbleParams) {
    this.x = bubbleParams.x;
    this.y = bubbleParams.y;
    this.size = bubbleParams.size;
    this.radius = Bubble.RADIUS[this.size];
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.vx = bubbleParams.vx;
    this.vy = bubbleParams.vy;
    this.image = new Image();
    this.image.src = Bubble.COLORS[this.size];
    this.game = bubbleParams.game;
    this.popSound = new Audio("assets/sounds/bubble-pop.wav");
  };

  Bubble.COLORS = [ "",
    "assets/images/bubbles/bubble-yellow.png", "assets/images/bubbles/bubble-red.png",
    "assets/images/bubbles/bubble-orange.png", "assets/images/bubbles/bubble-green.png",
    "assets/images/bubbles/bubble-blue.png"
  ];

  Bubble.RADIUS = [0, 4, 8, 16, 32, 64];
  Bubble.ELASTICITY = 1.2;
  Bubble.VELOCITY = 1;

  Bubble.prototype.draw = function (ctx) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  Bubble.prototype.move = function (timeDelta) {
    var velocityScale = timeDelta / NinjaPop.Game.FPS;

    this.x += this.vx * velocityScale;
    this.y += this.vy * velocityScale;
    this.vy += NinjaPop.Game.GRAVITY;

    // hits the wall
    if (this.game && this.game.isOutOfBounds(this)) {
      this.vx *= -1;
    }

    if (this.y > NinjaPop.Game.DIM_Y - (this.radius * 2) - NinjaPop.Footer.HEIGHT) {
      switch (this.size) {
        case 5:
          this.vy = Bubble.ELASTICITY * -7.8;
          break;
        case 4:
          this.vy = Bubble.ELASTICITY * -6.8;
          break;
        case 3:
          this.vy = Bubble.ELASTICITY * -5.8;
          break;
        case 2:
          this.vy = Bubble.ELASTICITY * -4.8;
          break;
        case 1:
          this.vy = Bubble.ELASTICITY * -3.6;
          break;
      }
    }
  };

  Bubble.prototype.isCollidedWith = function (object) {
    return (this.x + 5 < object.x + object.width &&
      this.x + this.width - 5 > object.x &&
      this.y + 5 < object.y + object.height &&
      this.y + this.height - 5 > object.y);
    };

    Bubble.prototype.collideWith = function (object) {
      if (object instanceof NinjaPop.Ninja) {
        this.game.transition("dead");
      } else if (object instanceof NinjaPop.Attack) {
        this.game.incrementScore();
        this.game.remove(object);
        this.pop();
      } else if (object instanceof NinjaPop.Ceiling) {
        this.pop();
      } //else if it hits the ceiling
    };

  Bubble.prototype.pop = function () {
    this.popSound.play();
    this.game.remove(this);

    this.game.add(new NinjaPop.Pop({
      x: this.x, y: this.y,
      width: this.radius, height: this.radius,
      game: this.game
    }));

    if (this.size > 1) {
      this.game.add(new NinjaPop.Bubble({
        x: this.x, y: this.y,
        vx: 1, vy: -4,
        size: this.size - 1,
        game: this.game
      }));

      this.game.add(new NinjaPop.Bubble({
        x: this.x, y: this.y,
        vx: -1, vy: -4,
        size: this.size - 1,
        game: this.game
      }));

      // this.game.pops = [];
    }

    if (this.game.bubbles.length === 0) {
      this.game.transition("next-level");
    }
  };


})();
