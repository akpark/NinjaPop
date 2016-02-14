(function () {
  if (typeof NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var Footer = NinjaPop.Footer = function (footerParams) {
    this.x = 0;
    this.y = 350;
    this.width = Footer.WIDTH;
    this.height = Footer.HEIGHT;
    this.lives = footerParams.lives;
    this.level = footerParams.level;
    this.name = footerParams.name;
    this.score = footerParams.score;
    this.time = footerParams.time
    this.image = new Image();
    var selectedNinja = parseInt($(".selected").attr("value"));
    this.image.src = Footer.LIFE_IMAGES[selectedNinja] || Footer.LIFE_IMAGES[0];
  };

  Footer.BG_COLOR = "#e0e0d1";
  Footer.WIDTH = 700;
  Footer.HEIGHT = 55;
  Footer.LIFE_IMAGES = [
    "assets/images/sprites/ninja/ninja-black-icon.png",
    "assets/images/sprites/ninja/ninja-red-icon.png",
    "assets/images/sprites/ninja/ninja-grey-icon.png",
  ]

  Footer.prototype.draw = function (ctx) {
    //time bar
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle="white";
    ctx.rect(this.x, this.y+15, this.width*(this.time/60000), 15);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y+15, this.width*(this.time/60000), 15);

    //lives
    var spacing = 5;
    for (var i=0; i<this.lives; i++) {
      ctx.drawImage(
        this.image,
        this.x + spacing, this.y + 35,
        20,20
      )
      spacing += 20;
    }

    //name
    ctx.fillStyle = "white";
    ctx.font = "18px Arial Black";
    ctx.font
    ctx.textAlign = "right";
    ctx.fillText("Level " + this.level, NinjaPop.Game.DIM_X/2+40, this.y + 50)

    //score
    // ctx.textAlign = "right";
    var score = this.score.toString();
    ctx.fillText(score, NinjaPop.Game.DIM_X - score.length - 10, this.y + 50);
  };

  Footer.prototype.move = function (delta) {
    this.time -= delta;
    //update score
  };


})();
