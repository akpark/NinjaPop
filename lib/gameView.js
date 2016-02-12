(function () {
  if (typeof NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var GameView = NinjaPop.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.requestId;
  };

  GameView.KEY_MAP = {
    37: "left",
    39: "right",
    35: "space"
  };

  GameView.prototype.onKeyDown = function (e) {
    switch (e.keyCode) {
      case 37:
        this.game.ninja.left = true;
        break;
      case 39:
        this.game.ninja.right = true;
        break;
      case 32:
        this.game.ninja.attack();
        break;
    }
  }

  GameView.prototype.onKeyUp = function (e) {
    switch (e.keyCode) {
      case 37:
        this.game.ninja.left = false;
        break;
      case 39:
        this.game.ninja.right = false;
        break;
    }
  };

  GameView.prototype.bindKeyHandlers = function () {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  GameView.prototype.start = function () {
    $("#message").hide();
    this.bindKeyHandlers();
    this.lastTime = 0;
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function (time) {
    this.requestId = requestAnimationFrame(this.animate.bind(this));

    if (this.lastTime === 0) {
      timeDelta = 0;
      this.lastTime = time;
    } else {
      timeDelta = time - this.lastTime;
    }
    if (!this.game.paused) {
      this.game.step(timeDelta, this.requestId);
      this.game.draw(this.ctx);
    }
    this.lastTime = time;

  };

  GameView.prototype.cancelAnimation = function () {
    window.cancelAnimationFrame(this.requestId);
  }

})();
