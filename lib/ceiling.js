(function() {
  if (typeof NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var Ceiling = NinjaPop.Ceiling = function () {
    this.x = 0;
    this.y = 0;
    this.width = NinjaPop.Game.DIM_X;
    this.height = Ceiling.HEIGHT;
    this.image = new Image();
    this.image.src = "assets/images/sprites/spike-sprite-16.gif";
    this.image.style.width = 16;
    this.image.style.height = 16;
  }

  Ceiling.HEIGHT = 22;

  Ceiling.prototype.draw = function (ctx) {
    var pattern = ctx.createPattern(this.image, "repeat");
    ctx.rect(0, -9, NinjaPop.Game.DIM_X, Ceiling.HEIGHT);
    ctx.fillStyle = pattern;
    ctx.fill();
  };

  Ceiling.prototype.move = function () {

  };

})();
