(function () {
  if (typeof NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var Ninja = NinjaPop.Ninja = function (ninjaParams) {
    this.x = ninjaParams.x;
    this.y = ninjaParams.y;
    this.width = Ninja.WIDTH;
    this.height = Ninja.HEIGHT;
    this.game = ninjaParams.game;
    this.sx = 32;
    this.sy = 0;
    this.stand();

    this.image = new Image();
    var selectedNinja = $(".character-link selected").value;
    this.image.src = Ninja.CHARACTERS[selectedNinja];
    // this.image.src = "assets/images/sprites/ninja/ninja-sprite-black.png";
    this.image.src = "assets/images/sprites/ninja/ninja-sprite-black.png";
  };

  Ninja.WIDTH = 32;
  Ninja.HEIGHT = 32;
  Ninja.VELOCITY = 1.5;
  Ninja.CHARACTERS = [
    "assets/images/sprites/ninja/ninja-sprite-black.png",
    "assets/images/sprites/ninja/ninja-sprite-red.png",
    "assets/images/sprites/ninja/ninja-sprite-grey.png",
  ];

  Ninja.prototype.draw = function (ctx) {
    ctx.drawImage(
      this.image,
      this.sx, this.sy,
      32, 32,
      this.x, this.y,
      this.width, this.height
    );
  };

  Ninja.prototype.stand = function () {
    this.left = false;
    this.right = false;
  };

  Ninja.prototype.move = function (delta) {
    var velocityScale = delta / NinjaPop.Game.FPS;

    if (this.left) {
      this.updateSprite("left");
      this.x -= Ninja.VELOCITY * velocityScale;
    } else if (this.right) {
      this.updateSprite("right");
      this.x += Ninja.VELOCITY * velocityScale;
    }

    if (this.game.isOutOfBounds(this)) {
      if (this.left) {
        this.x += Ninja.VELOCITY * velocityScale;
      } else {
        this.x -= Ninja.VELOCITY * velocityScale;
      }
    }
  };

  Ninja.prototype.updateSprite = function (direction) {
    this.direction = direction;
    if ((direction === "forward") || (direction === "space")) {
      this.sy = 0;
      this.sx = 32;
    } else if (direction === "left") {
      this.sy = 32;
      if (this.sx < 64) {
        this.sx += 32;
      } else {
        this.sx = 0;
      }
    } else if (direction === "right") {
      this.sy = 64;
      if (this.sx < 64) {
        this.sx += 32;
      } else {
        this.sx = 0;
      }
    }
  };

  Ninja.prototype.attack = function () {
    var attack = new NinjaPop.Attack({
      x: this.x + 9, y: this.y - 10,
      game: this
    })
    this.game.add(attack);
  };

  Ninja.prototype.remove = function () {
    this.game.remove(this);
  };

})();
