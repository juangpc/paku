function Game(canvasId) {

  this.canvasId = canvasId;
  this.menuBGColor = config.menuBGColor;
  this.fontColor = config.fontColor;
  this.fontFamily = config.fontFamily;
  this.fontSize = config.fontSize;
  this.initCanvas();
  this.init();
}

Game.prototype.init = function () {
  this.mapIndex = 0;
  this.map = new Map(this.mapIndex,
    this.canvas.width, this.canvas.height);
  //initSound();
  this.map.draw(this.ctx);
  this.initScores();

  this.setListeners();
  this.drawMenu();
}

Game.prototype.initCanvas = function () {
  this.canvas = document.getElementById(this.canvasId);
  this.ctx = this.canvas.getContext("2d");
};

// Game.prototype.initScores = function();

Game.prototype.drawMenu = function () {
  this.drawMenu = true;
  this.endMenu = false;
  do {
    ctx.save();
    ctx.fillStyle = this.menuBGColor;
    ctx.fillRect(this.canvas.width * 2 / 12, this.canvas.height * 2.5 / 12, this.canvas.width * 8 / 12, this.canvas.height * 6 / 12);
    ctx.font = config.fontSize + " " + config.fontFamily;
    ctx.fillStyle = config.fontColor;
    ctx.fillText("PAKU", this.canvas.width * 4 / 10, this.canvas.height * 3 / 10);
    ctx.fillStyle = '#FF4873';
    ctx.font = "2.5rem pacfontregular";
    ctx.fillText("Single Player", this.canvas.width * 3.6 / 12, this.canvas.height * 5 / 12);
    ctx.fillText("Double Player", this.canvas.width * 3.6 / 12, this.canvas.height * 7 / 12);
    ctx.fillStyle = '#FFFF00';
    ctx.fillText("1&#8203", this.canvas.width * 2 / 12, this.canvas.height * 5 / 12)
    ctx.restore();

  } while (this.endMenu)
}

// Player.prototype.setListeners = function () {
//   document.onkeydown = function (event) {
//     if (event.keyCode === TOP_KEY && this.y == this.y0) {
//       this.y -= 5;
//       this.vy -= 10;
//     } else if (event.keyCode == SPACE) {
//       this.shoot();
//     }
//   }.bind(this);
// };



