(function () {
  if (typeof NinjaPop === "undefined") {
    window.NinjaPop = {};
  }

  var Game = NinjaPop.Game = function (level, ctx) {
    //just in case for highlighting
    this.ctx = ctx;

    this.bubbles = [];
    this.attacks = [];
    this.pops = [];
    this.ceiling = new NinjaPop.Ceiling;
    this.timer = 60000;
    this.ninja = new NinjaPop.Ninja({
      x: Game.DIM_X / 2,
      y: Game.DIM_Y - (36 + NinjaPop.Footer.HEIGHT),
      game: this
    });
    this.score = 0;

    this.level = level;
    this.lives = 5;
    this.footer = new NinjaPop.Footer({
      lives: this.lives,
      name: "Player",
      level: this.level,
      time: this.timer,
      score: this.score
    });
    this.paused = false;

    this.addBubbles(level);
    this.levelWin = new Audio("assets/sounds/level-win.wav");
    this.gameWin = new Audio("assets/sounds/game-win.mp3");
    this.gameLose = new Audio("assets/sounds/game-lose.mp3");
  };

  Game.DIM_X = 700;
  Game.DIM_Y = 410;
  Game.BACKGROUNDS = [
    "assets/images/background-beach.gif"
  ]
  Game.GRAVITY = 0.15;
  Game.FPS = 1000/60;

  Game.prototype.reset = function (level, lives) {
    this.bubbles = [];
    this.attacks = [];
    this.pops = [];
    this.ceiling = new NinjaPop.Ceiling;
    this.timer = 60000;
    this.ninja = new NinjaPop.Ninja({
      x: Game.DIM_X / 2,
      y: Game.DIM_Y - (36 + NinjaPop.Footer.HEIGHT),
      game: this
    });
    this.level = level;
    this.lives = lives;

    this.footer = new NinjaPop.Footer({
      lives: this.lives,
      name: "Player",
      level: this.level,
      time: this.timer,
      score: this.score
    });
    this.paused = false;

    this.addBubbles(level);
  }

  Game.prototype.add = function (object) {
    if (object instanceof NinjaPop.Bubble) {
      this.bubbles.push(object);
    } else if (object instanceof NinjaPop.Attack) {
      this.attacks.push(object);
    } else if (object instanceof NinjaPop.Pop) {
      this.pops.push(object);
    }
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.bubbles, this.attacks, this.pops, [this.ceiling], [this.footer], [this.ninja]);
  };

  Game.prototype.moveObjects = function (delta) {
    this.allObjects().forEach(function (object) {
      object.move(delta);
    });
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.bubbles.forEach(function (bubble) {
      game.allObjects().forEach(function (obj2) {
        if (obj2 instanceof NinjaPop.Bubble) {
          return;
        }
        if (bubble.isCollidedWith(obj2)) {
          bubble.collideWith(obj2);
        }
      })
    });
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.step = function (delta, requestId) {
    this.handleFooterDisplay(delta);
    this.moveObjects(delta);
    this.checkCollisions();
  };

  Game.prototype.handleFooterDisplay = function (delta) {
    this.timer -= delta;
    if (this.footer.time <= 0) {
      this.transition(this.die);
    }
  };

  Game.prototype.incrementScore = function () {
    this.score += 100;
    this.footer.score += 100;
  };

  Game.prototype.isOutOfBounds = function (object) {
    return (object.x < 0) || (object.x+object.width > Game.DIM_X);
  };

  Game.prototype.addBubbles = function (level) {
    switch (level) {
      case 1:
        this.add(new NinjaPop.Bubble({
          x: 25, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 2
        }));
        break;
      case 2:
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 3
        }));
        break;
      case 3:
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 2
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 50, y: 100,
          vx: -1, vy: 1,
          game: this,
          size: 2
        }));
        break;
      case 4:
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 4
        }));
        break;

      case 5:
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: -1, vy: 1,
          game: this,
          size: 1
        }));
        this.add(new NinjaPop.Bubble({
          x: 75, y: 100,
          vx: -1, vy: 1,
          game: this,
          size: 1
        }));
        this.add(new NinjaPop.Bubble({
          x: 200, y: 100,
          vx: -1, vy: 1,
          game: this,
          size: 1
        }));
        this.add(new NinjaPop.Bubble({
          x: 225, y: 100,
          vx: -1, vy: 1,
          game: this,
          size: 1
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 1
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 75, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 1
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 200, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 1
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 225, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 1
        }));
        break;
      case 6:
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X/2 + 50, y: 100,
          vx: 0, vy: 1,
          game: this,
          size: 3
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 50, y: 100,
          vx: -1, vy: 1,
          game: this,
          size: 3
        }));
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 2
        }));
        break;

      case 7:
        this.add(new NinjaPop.Bubble({
          x: 80, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 4
        }));
        this.add(new NinjaPop.Bubble({
          x: 40, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 3
        }));
        this.add(new NinjaPop.Bubble({
          x: 10, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 2
        }));
        break;
      case 8:
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 3
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 3
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X/2, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 4
        }));
        break;
      case 9:
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 5
        }));
        break;
      case 10:
        this.add(new NinjaPop.Bubble({
          x: 50, y: 100,
          vx: 1, vy: 1,
          game: this,
          size: 5
        }));
        this.add(new NinjaPop.Bubble({
          x: Game.DIM_X - 100, y: 100,
          vx: -1, vy: 1,
          game: this,
          size: 5
        }));
        break;
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof NinjaPop.Attack) {
      this.attacks.splice(this.attacks.indexOf(object), 1);
    } else if (object instanceof NinjaPop.Bubble) {
      this.bubbles.splice(this.bubbles.indexOf(object), 1);
    } else if (object instanceof NinjaPop.Pop) {
      this.pops.splice(this.pops.indexOf(object), 1);
    }
  };

  Game.prototype.transition = function (transition) {
    this.paused = true;
    $("#canvas-game").addClass("dim");

    //show where you got hit
    // this.showHitArea();

    setTimeout(function() {this.pause(transition);}.bind(this), 2000);
  };

  // Game.prototype.showHitArea = function () {
  //   this.ctx.globalAlpha = .50;
  //   ctx.fillStyle = "black";
  //   ctx.fillRect(0,0,Game.DIM_X,)
  //   ctx.beginPath();
  //   ctx.arc(centerX, centerY, radius, 0,2* Math.PI, false);
  //
  // };

  Game.prototype.pause = function (transition) {
    switch (transition) {
      case "dead":
        this.lives -= 1;
        if (this.lives <= 0) {
          this.handleTransition("end-game");
        } else {
          this.handleTransition("restart-level");
        }
        break;
      case "next-level":
        //get ready message and then reset
        if (this.level === 10) {
          this.gameWin.play();
          $("#center-message").text("You Win!").show();
          setTimeout(function () {
            $("#center-message").hide();
            this.endGame();
          }.bind(this), 5000);
        } else {
          this.levelWin.play();
          $("#center-message").text("Level " + (this.level+1) + "!").show();
          setTimeout(function() {
            this.startNextLevel();
            $("#center-message").hide();
          }.bind(this),2000);
        }
    }
  };

  Game.prototype.handleTransition = function (transitionTo) {
    var message;

    switch (transitionTo) {
      case "restart-level":
        message = $("#center-message").text("Restart!");
        break;
      case "end-game":
        message = $("#center-message").text("Game Over...");
        this.gameLose.play();
        break;
    }
    message.show();

    if (transitionTo === "end-game") {
      setTimeout(function () {
        $("#canvas-game").removeClass("dim");
        message.hide();
        this.endGame();
      }.bind(this), 4000);
    } else {
      setTimeout(function () {
        $("#canvas-game").removeClass("dim");
        message.hide();
        this.reset(this.level, this.lives);
      }.bind(this), 2000);
    }
  };

  Game.prototype.endGame = function () {
    this.reset(1, 5);
    this.paused = true;
    $("#welcome-screen").show();
  };

  Game.prototype.startNextLevel = function () {
    $("#canvas-game").removeClass("dim");
    this.reset(this.level + 1, this.lives);
    //calculate score
  };

})();
