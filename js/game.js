function Game(canvasId) {
  this.canvasId = canvasId;
  this.initGame();
  this.numGhosts = 0;
  this.animationID = 0;
}

Game.prototype.initGame = function () {
  var g = [];
  this.canvas = document.getElementById(this.canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.map = new Map(this.ctx, this.canvas.width, this.canvas.height);
  this.map.setGrid(config.stepsW, config.stepsH);
  this.map.setBGColor(config.backgroundColor);
  this.map.setCoinColor(config.coinColor);
  this.ncoins = this.map.countCoins();
  this.initSound();

  this.pacman = new Pacman(this.ctx, this.map.stepW * 7 / 8, config.pacmanColor);
  this.pacman.setGrid(this.map.stepW, this.map.stepH);

  this.numGhosts = config.numGhosts;
  for (var ng = 0; ng < this.numGhosts; ng++) {
    g[ng] = new Ghost(this.ctx, this.map.stepW * 9 / 5, config.colorGhosts[ng]);
    g[ng].setGrid(this.map.stepW, this.map.stepH);
  }
  this.ghosts = g;
  this.score = 0;
  this.lives = config.initLives;
  this.levelMax = config.levelMax;
}

Game.prototype.initSound = function () {
  sound = {
    intro: new Audio('sounds/pacman_beginning.wav'),
    chomp: new Audio('sounds/pacman_chomp.wav'),
    death: new Audio('sounds/pacman_death.wav'),
    eatfruit: new Audio('sounds/pacman_eatfruit.wav'),
    eatghost: new Audio('sounds/pacman_eatghost.wav'),
    extrapac: new Audio('sounds/pacman_extrapac.wav'),
    intermission: new Audio('sounds/pacman_intermission.wav'),
  }
  this.sound = sound;
}

Game.prototype.startMenu = function () {
  this.initLevel(config.initLevel);
  this.map.clearMap();
  this.map.drawMap(); //as background

  this.setMenuListeners();
  this.ctx.save();
  this.ctx.fillStyle = config.menuBGColor;
  this.ctx.fillRect(this.canvas.width * 1 / 12,
    this.canvas.height * 4 / 12, this.canvas.width * 10 / 12, this.canvas.height * 4 / 12);
  this.ctx.fillStyle = config.fontColor;
  this.ctx.font = config.fontSize + " " + config.fontFamily;
  this.ctx.fillText("1  spacebar  9", this.canvas.width * 2.5 / 12, this.canvas.height * 6 / 12);
  this.ctx.restore();
}

Game.prototype.initLevel = function (level) {
  this.level = level;
  this.speed = config.speedArr[this.level];
  this.map.setWallColor(config.mapsColors[this.level]);
  this.map.setMap(config.maps[this.level], true);
  this.pacman.initPos = this.map.getInitPosPacman();
  this.pacman.teletransL = this.map.getTeletransL();
  this.pacman.teletransR = this.map.getTeletransR();
  this.pacman.map = this.map.map;

  for (var ng = 0; ng < this.numGhosts; ng++) {
    this.ghosts[ng].initPos = this.map.getInitPosGhosts();
    this.ghosts[ng].map = this.map.map;
  }

}

Game.prototype.setMenuListeners = function () {
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32 || event.keyCode == 13) {
      this.unSetMenuListeners();
      this.sound.intro.play();
      this.startGame();
    }
  }.bind(this))
};

Game.prototype.unSetMenuListeners = function () {
  document.removeEventListener("keydown", null);
}

Game.prototype.startGame = function () {
  let initPosX = this.map.grid2pos(this.initPosPacman[0], this.map.stepW) + this.map.stepW / 2;
  let initPosY = this.map.grid2pos(this.initPosPacman[1], this.map.stepH);

  this.map.clearMap();
  this.map.drawMap();

  this.pacman.setPos(initPosX, initPosY);
  this.pacman.draw();

  this.ghosts.forEach(function (g) {
    g.setPosGrid(g.initPos[0] + Math.floor(Math.random() * 3) - 1, g.initPos[1]);
  }.bind(this));
  this.ghosts.forEach(function (g) {
    g.draw();
  }.bind(this));
  window.setTimeout(this.mainAnimation.bind(this), 3500);
  this.setGameListeners();
}

Game.prototype.setGameListeners = function () {
  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case config.p1KeyBindings.up:
        this.pacman.turn('up', this.map);
        break;
      case config.p1KeyBindings.down:
        this.pacman.turn('down')
        break;
      case config.p1KeyBindings.right:
        this.pacman.turn('right')
        break;
      case config.p1KeyBindings.left:
        this.pacman.turn('left')
        break;
    }
  });
}

Game.prototype.unsetListeners = function () {
  document.removeEventListener("keydown", null);
}

Game.prototype.mainAnimation = function () {
  var firstTurn = 1;
  var prevTime = 0;
  function animate(timeStamp) {

    prevTime = firstTurn * (timeStamp - 17) + !firstTurn * prevTime;
    step = this.speed * (timeStamp - prevTime) / 1000;
    prevTime = timeStamp;
    furstTurn = 0;

    this.map.clearMap();
    this.map.drawMap();

    this.pacman.update(step, this.map.grid2pos);
    this.ghosts.forEach(function (g) {
      g.update(step, this.map);
      g.checkIntersection();
      g.updateEyes(this.pacman);
    })

    if (this.map.collectCoin(this.pacman)) {
      this.ncoins--;
      this.sound.chomp.play();
    }

    this.checkCollision();

    //si es estrella cambia ojos de ghosts y movimiento
    //hullen de pacman 
    //mas velocidad pacman

    //update score

    requestAnimationFrame(animate.bind(this));
  };

  this.animationID = requestAnimationFrame(animate.bind(this));

}

Game.prototype.checkCollision = function () {
  this.ghosts.forEach(function (g) {
    if (g.xg == this.pacman.xg &&
      g.yg == this.pacman.yg) {
      window.cancelAnimationFrame(this.animationID);
      this.unsetListeners();
      this.lives--;
      this.sound.death.play();
    }
    if (this.lives > 0)
      this.startGame();
    else
      console.log("the end!!!");
  });
}

Game.prototype.checkEndLevel = function () {
  if (this.ncoins <= 0) {
    window.cancelAnimationFrame(this.animationID);
    this.unsetListeners();
    this.level++;
    if (this.level == this.levelMax) {
      console.log("final de juego!!");
    } else {
      this.initLevel(++this.level);
      this.startGame();
    }
  }
}
