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
    this.name = footerParams.name;
    this.score = footerParams.score;
    this.time = footerParams.time
    this.image = new Image();
    this.image.src = "assets/images/sprites/ninja/ninja-black-icon.png";
  };

  Footer.WIDTH = 700;
  Footer.HEIGHT = 55;

  Footer.prototype.draw = function (ctx) {
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

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
    ctx.font = "18px Courier New";
    ctx.textAlign = "right";
    ctx.fillText(this.name, NinjaPop.Game.DIM_X/2+40, this.y + 50)

    //score
    // ctx.textAlign = "right";
    var score = this.score.toString();
    ctx.fillText(score, NinjaPop.Game.DIM_X - score.length, this.y + 50);
  };

  Footer.prototype.move = function (delta) {
    this.time -= delta;
    //update score
  };


})();
