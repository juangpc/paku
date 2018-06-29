function Player(ctx, size, color) {
  this.ctx = ctx;
  //position in canvas (px)
  this.x = undefined;
  this.y = undefined;
  //grided position
  this.xg = undefined;
  this.yg = undefined;
  //speeds
  this.sx = 1;
  this.sy = 0;
  this.map = undefined;
  this.stepW = undefined;
  this.stepH = undefined;
  this.size = size;
  this.color = color;
  this.starred = false;

  this.initPos;
}

Player.prototype.setGrid = function (stepW, stepH) {
  this.stepW = stepW;
  this.stepH = stepH;
}

Player.prototype.setPos = function (x, y) {
  this.x = x;
  this.y = y;
  this.xg = ~~(x / this.stepW);
  this.yg = ~~(y / this.stepH);
}

Player.prototype.setPosGrid = function (xg, yg) {
  this.xg = xg;
  this.yg = yg;
  this.x = xg * this.stepW + this.stepW * 5 / 8;
  this.y = yg * this.stepH + this.stepH * 5 / 8;
}

Player.prototype.turn = function (dir,map) {
  let x = this.x;
  let y = this.y;
  let xg = this.xg;
  let yg = this.yg;
  let sx = this.sx;
  let sy = this.sy;

  switch (dir) {
    case "up":
      if (map.map[yg - 1][xg] == 1 ||
        map.map[yg - 1][xg] == 2 ||
        map.map[yg - 1][xg] == 3 ||
        map.map[yg - 1][xg] == 5 ||
        map.map[yg - 1][xg] == 7) {
        sx = 0;
        sy = -1;
        //pmanX = map.map.grid2pos(xg, map.stepW);
        //pmanY = map.map.grid2pos(yg, map.stepH);
      }
      break;
    case "down":
      if (map.map[yg + 1][xg] == 1 ||
        map.map[yg + 1][xg] == 2 ||
        map.map[yg + 1][xg] == 3 ||
        map.map[yg + 1][xg] == 5 ||
        map.map[yg + 1][xg] == 7) {
        sx = 0;
        sy = 1;
        //pmanX=map.map.grid2pos(xg,stepW);
        //pmanY=map.map.grid2pos(yg,stepH);
      }
      break;
    case "right":
      if (map.map[yg][xg + 1] == 1 ||
        map.map[yg][xg + 1] == 2 ||
        map.map[yg][xg + 1] == 3 ||
        map.map[yg][xg + 1] == 5 ||
        map.map[yg][xg + 1] == 7) {
        sx = 1;
        sy = 0;
        //pmanX=grid2pos(xg,stepW);
        //pmanY=grid2pos(yg,stepH);
      }
      break;
    case "left":
      if (map.map[yg][xg - 1] == 1 ||
        map.map[yg][xg - 1] == 2 ||
        map.map[yg][xg - 1] == 3 ||
        map.map[yg][xg - 1] == 5 ||
        map.map[yg][xg - 1] == 7) {
        sx = -1;
        sy = 0;
        //pmanX = grid2pos(xg, stepW);
        //pmanY = grid2pos(yg, stepH);
      }
      break;
  }

  this.sx = sx;
  this.sy = sy;
}

///////////////////////////////////////////////////////
/////////   PACMAN OBJECT DEFINITION
///////////////////////////////////////////////////////

function Pacman(ctx, size, color) {
  Player.call(this, ctx, size, color);
  this.teletransL = undefined;
  this.teletransR = undefined;
  this.mouthIndex = 7;
  this.mouthClosing = true;
}

Pacman.prototype = Object.create(Player.prototype);
Pacman.prototype.constructor = Pacman;

Pacman.prototype.draw = function () {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color;
  this.ctx.arc(this.x, this.y, this.size,
    Math.PI / this.mouthIndex, -Math.PI / this.mouthIndex, false);
  this.ctx.lineTo(this.x, this.y, this.size)
  this.ctx.fill();
  this.ctx.rotate(calcRotationAngle());
  this.ctx.restore();

  function calcRotationAngle() {
    if (this.sx)
      return Math.PI;
    else
      return -Math.PI / 2 * this.sy;
  }
}

Pacman.prototype.update = function (step, map) {
  let sx = this.sx;
  let sy = this.sy;
  let xg = this.xg; //postitions in grid
  let yg = this.yg;
  let x = this.x; //positions in xy plane
  let y = this.y;

  //normal Flow
  x += sx * step; //positions in xy plane
  y += sy * step;

  //normal change
  if ((this.map[yg + sy][xg + sx] == 1 ||
    this.map[yg + sy][xg + sx] == 2 ||
    this.map[yg + sy][xg + sx] == 3 ||
    this.map[yg + sy][xg + sx] == 5 ||
    this.map[yg + sy][xg + sx] == 7) ||
    ((sx * (x - map.grid2pos(xg, this.stepW)) <= 0) &&
      (sy * (y - map.grid2pos(yg, this.stepH)) <= 0))) {
    this.x = x;
    this.y = y;
    this.xg = xg;
    this.yg = yg;
  }

  this.updateMouth();
  this.teletrans(map);
}

Pacman.prototype.updateMouth = function () {
  if (this.mouthClosing)
    if (!--this.mouthIndex)
      this.mouthClosing = false;
  if (this.mouthIndex++ > 20)
    this.moughClosing = true;
}

Pacman.prototype.teletrans = function (map) {
  if (this.xg === this.teletransR[0] &&
    this.yg === this.teletransR[1]) {
    this.xg = this.teletransL[0];
    this.yg = this.teletransL[1];
    this.x = map.grid2pos(this.xg, this.stepW);
    this.y = map.grid2pos(this.yg, this.stepH);
  } else if (this.xg === this.teletransL[0] &&
    this.yg === this.teletransL[1]) {
    this.xg = this.teletransR[0];
    this.yg = this.teletransR[1];
    this.x = map.grid2pos(this.xg, this.stepW);
    this.y = map.grid2pos(this.yg, this.stepH);
  }
}

///////////////////////////////////////////////////////
/////////   GHOST OBJECT DEFINITION
///////////////////////////////////////////////////////

function Ghost(ctx, size, color) {
  Player.call(this, ctx, size, color);
  this.eyesX = 0;
  this.eyesY = 0;
  this.changeDirInterval = 10000;
  //window.setTimeInterval(this._proto_.turn().bind(this), this.changeDirInterval);
}

Ghost.prototype = Object.create(Player.prototype);
Ghost.prototype.constructor = Ghost;

Ghost.prototype.draw = function () {
  let size = this.size;
  let x = this.x - size / 2;
  let y = this.y + size / 2;
  this.ctx.save();
  this.ctx.fillStyle = this.color;
  this.ctx.beginPath();
  this.ctx.moveTo(x, y);
  this.ctx.lineTo(x, y - size * 2 / 5);
  this.ctx.bezierCurveTo(x, y - size * 4 / 5, x + size / 4, y - size, x + size / 2, y - size);
  this.ctx.bezierCurveTo(x + size * 4 / 5, y - size, x + size, y - size * 4 / 5, x + size, y - size / 2);
  this.ctx.lineTo(x + size, y);
  this.ctx.lineTo(x + size * 5 / 6, y - size * 1 / 6);
  this.ctx.lineTo(x + size * 4 / 6, y);
  this.ctx.lineTo(x + size * 3 / 6, y - size * 1 / 6);
  this.ctx.lineTo(x + size * 2 / 6, y);
  this.ctx.lineTo(x + size * 1 / 6, y - size * 1 / 6);
  this.ctx.lineTo(x, y);
  this.ctx.fill();

  //eyes
  this.ctx.fillStyle = 'white';
  this.ctx.beginPath();
  this.ctx.moveTo(x + size * 2 / 10, y - size * 5 / 10);
  this.ctx.ellipse(x + size / 3, y - size / 2, size / 7, size / 5, 0, 0, 2 * Math.PI);
  this.ctx.ellipse(x + size * 2 / 3, y - size / 2, size / 7, size / 5, 0, 0, 2 * Math.PI);
  this.ctx.fill();

  this.ctx.fillStyle = 'black';
  this.ctx.beginPath();
  this.ctx.arc(x + size / 3 + this.eyesX * size / 20, y - size / 2 + this.eyesY * size / 20, size / 20, 0, Math.PI * 2);
  this.ctx.arc(x + size * 2 / 3 + this.eyesX * size / 20, y - size / 2 + this.eyesY * size / 20, size / 20, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.restore();
}

Ghost.prototype.setGhostEyesDir = function (eyesX, eyesY) {
  this.eyesX = eyesX;
  this.eyesY = eyesY;
}

Ghost.prototype.update = function (step, map) {
  let sx = this.sx;
  let sy = this.sy;
  let xg = this.xg; //postitions in grid
  let yg = this.yg;
  let x = this.x; //positions in xy plane
  let y = this.y;

  //normal Flow
  x += sx * step; //positions in xy plane
  y += sy * step;

  //normal change
  if ((this.map[yg + sy][xg + sx] == 1 ||
    this.map[yg + sy][xg + sx] == 2 ||
    this.map[yg + sy][xg + sx] == 3 ||
    this.map[yg + sy][xg + sx] == 5 ||
    this.map[yg + sy][xg + sx] == 7) ||
    ((sx * (x - map.grid2pos(xg, this.stepW)) <= 0) &&
      (sy * (y - map.grid2pos(yg, this.stepH)) <= 0))) {
    this.x = x;
    this.y = y;
    this.xg = xg;
    this.yg = yg;
  }

}

Ghost.prototype.checkIntersection = function () {
  let sx = this.sx;
  let sy = this.sy;
  let xg = this.xg; //postitions in grid
  let yg = this.yg;
  let x = this.x; //positions in xy plane
  let y = this.y;

  let possibleDirs = [];
  if ((this.map[yg + 1][xg] == 1 ||
    this.map[yg + 1][xg] == 2 ||
    this.map[yg + 1][xg] == 3 ||
    this.map[yg + 1][xg] == 5 ||
    this.map[yg + 1][xg] == 7))
    possibleDirs.push('down');
  if ((this.map[yg - 1][xg] == 1 ||
    this.map[yg - 1][xg] == 2 ||
    this.map[yg - 1][xg] == 3 ||
    this.map[yg - 1][xg] == 5 ||
    this.map[yg - 1][xg] == 7))
    possibleDirs.push('up');
  if ((this.map[yg][xg - 1] == 1 ||
    this.map[yg][xg - 1] == 2 ||
    this.map[yg][xg - 1] == 3 ||
    this.map[yg][xg - 1] == 5 ||
    this.map[yg][xg - 1] == 7))
    possibleDirs.push('left');
  if ((this.map[yg][xg + 1] == 1 ||
    this.map[yg][xg + 1] == 2 ||
    this.map[yg][xg + 1] == 3 ||
    this.map[yg][xg + 1] == 5 ||
    this.map[yg][xg + 1] == 7))
    possibleDirs.push('right');

  if (possibleDirs.length) {
    let newDir = Math.floor(Math.random() * possibleDirs.length);
    this._proto_.turn(possibleDirs[newDir]);
  }
}

Ghost.prototype.updateEyes = function (pac) {
  this.eyesX = Math.sign(this.xg - pac.xg);
  this.eyesY = Math.sign(this.yg - pac.yg);

}




