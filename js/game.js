function Game(canvasId) {
  this.canvasId = canvasId;
  this.initGame();
}

Game.prototype.initGame = function () {
  var g=[];
  this.canvas = document.getElementById(this.canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.map = new Map(this.ctx, this.canvas.width, this.canvas.height);
  this.map.setGrid(config.stepsW, config.stepsH);
  this.map.setBGColor(config.backgroundColor);
  this.map.setCoinColor(config.coinColor);
  this.initSound();

  this.pacman = new Pacman(this.ctx, config.pacmanColor);
  this.pacman.setGrid(this.map.stepW, this.map.stepH);
  
  for (var ng = 0; ng < config.numGhosts; ng++) {
    g[ng] = new Ghost(this.ctx, config.colorGhosts[ng]);
    g[ng].setGrid(this.map.stepW, this.map.stepH);
  }
  this.ghosts=g;
  this.score = 0;
  this.lives = config.initLives;
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
  this.speed=config.speedArr[this.level];
  this.map.setWallColor(config.mapsColors[this.level]);
  this.map.setMap(config.maps[this.level], true);
  this.initPosPacman = this.map.getInitPosPacman();
  this.initPosGhosts = this.map.getInitPosGhosts();
  this.teletransL = this.map.getTeletransL();
  this.teletransR = this.map.getTeletransR();
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
  let initPosX = this.map.grid2pos(this.initPosPacman[0], this.stepW) + this.stepW / 2;
  let initPosY = this.map.grid2pos(this.initPosPacman[1], this.stepH);

  this.map.clearMap();
  this.map.drawMap();

  this.pacman.setPos(initPosX, initPosY);
  this.pacman.draw();

  this.ghosts.forEach(function (g) {
    g.setPosGrid(initPosGhosts[0] + Math.floor(Math.random() * 3) - 1, initPosGhosts[1])
  });
  this.ghosts.forEach(function (g) {
    g.draw();
  });
  window.setTimeout(this.mainAnimation, 4000);
  this.setGameListeners();
}

Game.prototype.setListeners = function () {
  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case config.p1KeyBindings.up:
        turnUp = true;
        break;
      case config.p1KeyBindings.down:
        turnDown = true;
        break;
      case config.p1KeyBindings.right:
        turnRight = true;
        break;
      case config.p1KeyBindings.left:
        turnLeft = true;
        break;
    }
  });
}

Game.prototype.unsetListeners = function () {
  document.removeEventListener("keydown", null);
}

Game.prototype.mainAnimation = function () {
  var firstTurn = 1;
  
  function animate(timeStamp) {

    let prevTime = firstTurn * (timeStamp - 17) + !firstTurn * prevTime;
    step = this.speed * (timeStamp - prevTime)/1000;
    prevTime = timeStamp;
    furstTurn=0;

    this.map.clearMap();
    this.map.drawMap();

    this.pacman.update(step);
    this.ghosts.forEach(function(g){
      g.update(step);
    })
    this.pacman.setPos(initPosX, initPosY);
    this.pacman.draw();

    this.ghosts.forEach(function (g) {
      g.setPosGrid(initPosGhosts[0] + Math.floor(Math.random() * 3) - 1, initPosGhosts[1])
    });
    this.ghosts.forEach(function (g) {
      g.draw();
    });
    
    //updateScore();
    
    requestAnimationFrame(animate);
  }

  this.animationID = requestAnimationFrame(animate);

}











// Game.prototype.drawPacmanInMenu = function (mode) {
//   this.ctx.save();
//   this.ctx.fillStyle = '#FFFF00';
//   this.ctx.font = "1.7rem pacfontregular";
//   if (mode == "single") {
//     this.ctx.fillText("1", this.canvas.width * 1.5 / 12, this.canvas.height * 5 / 12);
//   } else if (mode == "double") {
//     this.ctx.fillText("1", this.canvas.width * 1.5 / 12, this.canvas.height * 7 / 12);
//   }
//   this.ctx.restore();
// }


//   this.score = new Score();
//   this.initMap(this.level);
//   this.initSound(this.level);
//   this.selectPlayMode();
// }

// Game.prototype.selectPlayMode = function () {
//   this.setMenuListeners();
//   this.map.clearMap(this.ctx);
//   this.map.draw(this.ctx);
//   this.drawPlayModeMenu();
// }

// Game.prototype.drawPlayModeMenu = function () {
//   this.ctx.save();
//   this.ctx.fillStyle = this.menuBGColor;
//   this.ctx.fillRect(this.canvas.width * 1 / 12,
//     this.canvas.height * 4 / 12, this.canvas.width * 10 / 12, this.canvas.height * 4 / 12);
//   this.ctx.fillStyle = config.fontColor;
//   this.ctx.font = "1.7rem pacfontregular";
//   this.ctx.fillText("single player", this.canvas.width * 2.5 / 12, this.canvas.height * 5 / 12);
//   this.ctx.fillText("double player", this.canvas.width * 2.5 / 12, this.canvas.height * 7 / 12);
//   this.ctx.restore();
//   this.drawPacmanInMenu(this.playMode);
// }

// Game.prototype.drawPacmanInMenu = function (mode) {
//   this.ctx.save();
//   this.ctx.fillStyle = '#FFFF00';
//   this.ctx.font = "1.7rem pacfontregular";
//   if (mode == "single") {
//     this.ctx.fillText("1", this.canvas.width * 1.5 / 12, this.canvas.height * 5 / 12);
//   } else if (mode == "double") {
//     this.ctx.fillText("1", this.canvas.width * 1.5 / 12, this.canvas.height * 7 / 12);
//   }
//   this.ctx.restore();
// }



// Game.prototype.initLevel = function () {
//   this.score.updateScore();
//   this.speedPxSec = config.speedArr[level];
//   this.setGameListeners();
//   if(this.mode=='single'){
//     this.player1 = new Player('pac','human',);
//     this.ghosts=[];
//     this.ghosts.push(new Player('ghost'))
//   }else if(this.mode=='double'){

//   }
// }

// Game.prototype.startGame = function () {
//   this.initLevel();
//   this.animate();
// }


// Game.prototype.updatePlayers = function () {

// }

// Game.prototype.computeCollisions = function () {

// }


// Game.prototype.animate = function () {
//   let prevTime = Date.now();
//   function calcStep(speed, timeStamp, prevTime) {
//     return speed * (timeStamp - prevTime) / 1000;
//   }

//   this.map.clearMap(this.ctx);
//   this.map.draw(this.ctx);

//   function animate(timeStamp) {
//     this.step = calcStep(this.speedPxSec, timeStamp, prevTime);
//     prevTime = timeStamp;

//     //this.updatePlayers();
//     //this.computeCollisions();
//     //this.updateScore();

//     requestAnimationFrame(animate);
//   }

//   requestAnimationFrame(animate);

// }


// 



// Game.prototype.setGameListeners = function () {
//   if (this.mode == 'single') {
//     document.addEventListener("keydown", function (event) {
//       switch (event.keyCode) {
//         case config.p1KeyBindings.up:
//           this.player1.speedX = 0;
//           this.player1.speedY = -1;
//           break;
//         case config.p1KeyBindings.down:
//           this.player1.speedX = 0;
//           this.player1.speedY = 1;
//           break;
//         case config.p1KeyBindings.right:
//           this.player1.speedX = 1;
//           this.player1.speedY = 0;
//           break;
//         case config.p1KeyBindings.left:
//           this.player1.speedX = -1;
//           this.player1.speedY = 0;
//           break;
//       }
//     }.bind(this));
//   } else if (this.mode == 'double') {
//     document.addEventListener("keydown", function (event) {
//       switch (event.keyCode) {
//         case config.p1KeyBindings.up:
//           this.player1.speedX = 0;
//           this.player1.speedY = -1;
//           break;
//         case config.p1KeyBindings.down:
//           this.player1.speedX = 0;
//           this.player1.speedY = 1;
//           break;
//         case config.p1KeyBindings.right:
//           this.player1.speedX = 1;
//           this.player1.speedY = 0;
//           break;
//         case config.p1KeyBindings.left:
//           this.player1.speedX = -1;
//           this.player1.speedY = 0;
//           break;
//         case config.p2KeyBindings.up:
//           this.player2.speedX = 0;
//           this.player2.speedY = -1;
//           break;
//         case config.p2KeyBindings.down:
//           this.player2.speedX = 0;
//           this.player2.speedY = 1;
//           break;
//         case config.p2KeyBindings.right:
//           this.player2.speedX = 1;
//           this.player2.speedY = 0;
//           break;
//         case config.p2KeyBindings.left:
//           this.player2.speedX = -1;
//           this.player2.speedY = 0;
//           break;
//       }
//     }.bind(this));
//   }
// }

// Game.prototype.unSetGameListeners = function () {
//   document.removeEventListener("keydown", null);
// }

//   /////////////////////////////////////////////////////////////////////
//   ///////////////     SCORE OBJECT
//   ////////////////////////////////////////////////////////////////////

//   function Score() {
//         this.globalScore = 0;
//         this.nLifesLeft = config.initLifes;
//         this.gameScore = {
//           score: 0,
//           coinsLeft: 0/////
//         }
//       }

//   Score.prototype.newLevel = function () {

//       }

//   Score.prototype.addScore = function () {

//       }

//   Score.prototype.initScoreLevel = function () {
//         this.gameScore.score = 0;
//         this.gameScore.coinsLeft = 0;
//       }

