function Map(ctx, cW, cH) {
  this.ctx = ctx;
  this.cW = cW;
  this.cH = cH;
  this.mapCode = {
    'wall': 0,
    'path_star': 1,
    'path_no_star': 2,
    'start': 3,
    'door': 4,
    'bigStar': 5,
    'reserved1': 6,
    'teletrans': 7,
    'reserved2': 8,
  };
}

Map.prototype.setGrid = function (nStepsW, nStepsH) {
  this.nStepsW = nStepsW;
  this.nStepsH = nStepsH;
  this.stepW = Math.round(this.cW / nStepsW);
  this.stepH = Math.round(this.cH / nStepsH);
}

Map.prototype.setBGColor = function (color) {
  this.bgColor = color;
}

Map.prototype.setWallColor = function (color) {
  this.wallColor = color;
}

Map.prototype.setCoinColor = function (color) {
  this.coinColor = color;
}

Map.prototype.clearMap = function (ctx) {
  this.ctx.clearRect(0, 0, this.cW, this.cH);
}

Map.prototype.setMap = function (inputMap, calcSymmetry) {
  if (calcSymmetry) {
    let map = [];
    inputMap.forEach(function (row) {
      map.push(row.concat(row.slice(0).reverse()))
    });
    this.map = map;
  } else {
    this.map = inputMap;
  }
}

Map.prototype.drawMap = function () {

  //background
  this.ctx.save();
  this.ctx.fillStyle = this.bgColor;
  this.ctx.fillRect(0, 0, this.cW, this.cH);

  // walls
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.map[hi][wi] === this.mapCode['wall']) {
        this.ctx.fillStyle = this.wallColor;
        this.ctx.fillRect(this.stepW * wi, this.stepH * hi,
          this.stepW, this.stepH);
      }
    }
  }

  //running channels
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.map[hi][wi] === this.mapCode['path_star'] ||
        this.map[hi][wi] === this.mapCode['path_no_star'] ||
        this.map[hi][wi] === this.mapCode['start'] ||
        this.map[hi][wi] === this.mapCode['teletrans']) {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(this.stepW * wi - this.stepW / 2,
          this.stepH * hi - this.stepH / 2,
          this.stepW * 2, this.stepH * 2)
      }
    }
  }

  //coins
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.map[hi][wi] === this.mapCode['path_star']) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.coinColor;
        this.ctx.arc(this.stepW * wi + this.stepW * 5 / 8,
          this.stepH * hi + this.stepH * 5 / 8,
          this.stepW / 6, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  this.ctx.restore();
}

Map.prototype.getInitPosPacman = function () {
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.map[hi][wi] === this.mapCode['start']) {
        return [wi, hi];
      }
    }
  }
}

Map.prototype.getInitPosGhosts = function () {
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.map[hi][wi] === this.mapCode['door']) {
        return [wi, hi + 2];
      }
    }
  }
}

Map.prototype.getTeletransL = function () {
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW / 2; wi++) {
      if (this.map[hi][wi] === this.mapCode['teletrans']) {
        return [wi, hi];
      }
    }
  }
}

Map.prototype.getTeletransR = function () {
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = this.nStepsW / 2; wi < this.nStepsW; wi++) {
      if (this.map[hi][wi] === this.mapCode['teletrans'])
        return [wi, hi];
    }
  }
}

Map.prototype.pos2grid = function (p, step) {
  return ~~(p / step);
}

Map.prototype.grid2pos = function (p, step) {
  return step * p + step * 5 / 8;
}

Map.prototype.countCoins = function () {
  let ncoins = 0;
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.map[hi][wi] === this.mapCode['path_star']) {
        ncoins++
      }
    }
  }
  return ncoins;
}

Map.prototype.collectCoin = function (pacman) {
  if (this.map[pacman.yg][pacman.xg] == this.mapCode['path_star']) {
    this.map[pacman.yg][pacman.xg] = his.mapCode['path_no_star'];
    return true;
  }
  return false;
}

