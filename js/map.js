function Map(mapIndex, cW, cH) {

  this.index = mapIndex;
  this.inputMatrix= config.maps[this.index];

  this.cW = cW;
  this.cH = cH;
  this.nStepsW = config.stepsW;
  this.nStepsH = config.stepsH;
  this.stepW = Math.round(cW / this.nStepsW);
  this.stepH = Math.round(cH / this.nStepsH);
  this.corrW = (cW / this.nStepsW - this.stepW);
  this.corrH = (cH / this.nStepsH - this.stepH);

  this.backgroundColor = config.backgroundColor;
  this.wallColor = config.mapsColors[this.index];
  this.coinColor = config.coinColor;

  this.initMap();
}

Map.prototype.initMap = function () {
  let map = [];
  this.inputMatrix.forEach(function (row) {
    map.push(row.concat(row.slice(0).reverse()));
  });
  this.matrix=map;
  if (config.debug) {
    console.log("map loaded");
  }
}

Map.prototype.draw = function (ctx) {

  //background
  ctx.save();
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, this.cW, this.cH);

  // walls
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.matrix[hi][wi] === 0) {
        ctx.fillStyle = this.wallColor;
        ctx.fillRect(this.stepW * wi, this.stepH * hi, this.stepW, this.stepH);
      }
    }
  }

  //running channels
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.matrix[hi][wi] === 1 || this.matrix[hi][wi] === 2) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.stepW * wi - this.stepW / 2, this.stepH * hi - this.stepH / 2, this.stepW * 2, this.stepH * 2)
      }
    }
  }

  //coins
  for (let hi = 0; hi < this.nStepsH; hi++) {
    for (let wi = 0; wi < this.nStepsW; wi++) {
      if (this.matrix[hi][wi] === 1) {
        ctx.beginPath();
        ctx.fillStyle = this.coinColor;
        ctx.arc(this.stepW * wi + this.stepW * 5 / 8, this.stepH * hi + this.stepH * 5 / 8, this.stepW / 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();

}