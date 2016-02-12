(function () {
  if (NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var Pop = NinjaPop.Pop = function (popParams) {
    this.x = popParams.x;
    this.y = popParams.y;
    this.sx = 0;
    this.sy = 0;
    this.width = popParams.width;
    this.height = popParams.height;
    this.image = new Image();
    this.image.src = "assets/images/sprites/explosion-sprite.png";
    this.game = popParams.game;
  };

  Pop.prototype.draw = function (ctx) {
    ctx.drawImage(
      this.image,
      this.sx, this.sy,
      32, 32,
      this.x, this.y,
      this.width, this.height
    );
  };

  Pop.prototype.move = function (delta) {
    this.updateSprite();
  };

  Pop.prototype.updateSprite = function () {
    if (this.sx < 288) {
      this.sx += 32;
    } else {
      this.sy += 32;
      this.sx = 0;
    }

    if (this.sy > 32) {
      this.game.remove(this);
    }
  };

})();
