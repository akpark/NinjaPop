(function () {
  if (typeof NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var Attack = NinjaPop.Attack = function (attackParams) {
    this.x = attackParams.x;
    this.y = attackParams.y;
    this.width = Attack.WIDTH;
    this.height = Attack.HEIGHT;
    this.vy = Attack.VELOCITY;
    this.game = attackParams.game;
    this.image = new Image();
    this.image.src = "assets/images/sprites/shuriken-sprite.gif";
  }

  Attack.VELOCITY = -3;
  Attack.WIDTH = 14;
  Attack.HEIGHT = 14;

  Attack.prototype.draw = function (ctx) {
    ctx.drawImage(
      this.image,
      0, 0, 32, 32,
      this.x, this.y,
      this.width, this.height
    );
  };

  Attack.prototype.move = function (delta) {
    var velocityScale = delta / NinjaPop.Game.FPS;
    this.y += this.vy * velocityScale;
  };

})();
