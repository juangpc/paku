function Game(canvasId) {
  this.canvasId = canvasId;

  this.init();

}

Game.prototype.init = function () {
  /* //parse config object <== (config.js)
  this.level=config.initialLevel;
  this.score=config.score;
  this.speeds=config.speeds;
  
  this.speed=config.speeds[this.level];

  */
  this.canvas = document.getElementById(this.canvasId);
  this.ctx = this.canvas.getConext("2d");

  initBackground();

}

Game.prototype.initCanvas = function () {

};

Game.prototype.initBackground = function () {
  this.bg = new Background(this);
}