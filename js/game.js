function Game(canvasId) {

  this.canvasId = canvasId;
  this.menuBGColor = config.menuBGColor;
  this.fontColor = config.fontColor;
  this.fontFamily = config.fontFamily;
  this.fontSize = config.fontSize;
  this.playMode = config.initPlayMode;
  this.level = config.initLevel;

  this.init();
}

Game.prototype.init = function () {
  this.score = new Score();
  this.initCanvas();
  this.initMap(this.level);
  this.initSound(this.level);
  this.selectPlayMode();
}

Game.prototype.initCanvas = function () {
  this.canvas = document.getElementById(this.canvasId);
  this.ctx = this.canvas.getContext("2d");
};

Game.prototype.initMap = function (mapIndex) {
  this.mapIndex = mapIndex;
  this.map = new Map(this.mapIndex, this.canvas.width, this.canvas.height);
}

Game.prototype.selectPlayMode = function () {
  this.setMenuListeners();
  this.map.clearMap(this.ctx);
  this.map.draw(this.ctx);
  this.drawPlayModeMenu();
  //this.unSetMenuListeners();
}

Game.prototype.drawPlayModeMenu = function () {
  this.ctx.save();
  this.ctx.fillStyle = this.menuBGColor;
  this.ctx.fillRect(this.canvas.width * 1 / 12,
    this.canvas.height * 4 / 12, this.canvas.width * 10 / 12, this.canvas.height * 4 / 12);
  this.ctx.fillStyle = config.fontColor;
  this.ctx.font = "1.7rem pacfontregular";
  this.ctx.fillText("single player", this.canvas.width * 2.5 / 12, this.canvas.height * 5 / 12);
  this.ctx.fillText("double player", this.canvas.width * 2.5 / 12, this.canvas.height * 7 / 12);
  this.ctx.restore();
  this.drawPacmanInMenu(this.playMode);
}

Game.prototype.drawPacmanInMenu = function (mode) {
  this.ctx.save();
  this.ctx.fillStyle = '#FFFF00';
  this.ctx.font = "1.7rem pacfontregular";
  if (mode == "single") {
    this.ctx.fillText("1", this.canvas.width * 1.5 / 12, this.canvas.height * 5 / 12);
  } else if (mode == "double") {
    this.ctx.fillText("1", this.canvas.width * 1.5 / 12, this.canvas.height * 7 / 12);
  }
  this.ctx.restore();
}

Game.prototype.setMenuListeners = function () {
  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 32: case 13:
        this.unSetMenuListeners();
        break;
      case 38:  // arrowUP
        this.playMode = 'single';
        this.drawPlayModeMenu();
        break;
      case 40:  // arrowDown  
        this.playMode = 'double';
        this.drawPlayModeMenu();
        break;
    }
  }.bind(this))
};

Game.prototype.unSetMenuListeners = function () {
  document.removeEventListener("keydown", null);
}

Game.prototype.initSound = function () {
  sound = {
    intro: new Audio('sounds/pacman_beginning.wav'),
    chomp: new Audio('sounds/pacman_chomp.maw'),
    death: new Audio('sounds/pacman_death.wav'),
    eatfruit: new Audio('sounds/pacman_eatfruit.wav'),
    eatghost: new Audio('sounds/pacman_eatghost.wav'),
    extrapac: new Audio('sounds/pacman_extrapac.wav'),
    intermission: new Audio('sounds/pacman_intermission.wav'),
  }
  this.sound = sound;
}

Game.prototype.initLevel = function (level) {
  this.score = 0;
  this.level = level;
  this.speedPxSec = config.speedArr[level];
}

Game.prototype.startGame = function (level) {
  this.initLevel(level);
  this.animate();
}

Game.prototype.animate = function () {
  let prevTime = Date.now();
  function calcStep(speed, timeStamp, prevTime) {
    return speed * (timeStamp - prevTime) / 1000;
  }
  this.map.clearMap(this.ctx);
  this.map.draw(this.ctx);

  function animate(timeStamp) {
    this.step = calcStep(this.speedPxSec, timeStamp, prevTime);
    prevTime = timeStamp;

    //this.updatePlayers();
    //this.computeCollisions();
    //this.updateScore();
    console.log(this.step)
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

}


Game.prototype.updatePlayers = function () {

}

Game.prototype.computeCollisions = function () {

}

Game.prototype.updateScore = function () {

}


/////////////////////////////////////////////////////////////////////
///////////////     SCORE OBJECT
////////////////////////////////////////////////////////////////////

function Score() {
  this.globalScore = 0;
  this.nLifesLeft = config.initLifes;
  this.gameScore = {
    score: 0,
    coinsLeft: 0/////
  }
}

Score.prototype.newLevel = function () {

}

Score.prototype.addScore = function () {

}



