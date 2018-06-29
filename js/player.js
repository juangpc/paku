function Player(ctx,size,color){
  this.ctx=ctx;
  //position in canvas (px)
  this.x=undefined;
  this.y=undefined;
  //grided position
  this.xg=undefined;
  this.yg=undefined;
  //speeds
  this.sx=0;
  this.sy=0;
  this.stepW=undefined;
  this.stepH=undefined;
  this.size=size;
  this.color=color;
  this.starred=false;
}

Player.prototype.setGrid = function (stepW,stepH){
  this.stepW=stepW;
  this.stepH=stepH;
}

Player.prototype.setPos=function(x,y){
  this.x=x;
  this.y=y;
  this.xg= ~~(x/this.stepW);
  this.yg= ~~(y/this.stepH);
}

Player.prototype.setPosGrid=function(xg,yg){
  this.xg=xg;
  this.yg=yg;
  this.x=xg*this.stepW+this.stepW*5/8;
  this.y=yg*this.stepH+this.stepH*5/8;
}

function Pacman(ctx,size,color){
  Player.call(this,ctx,size,color);
  this.mouthIndex=7;
}

Pacman.prototype = Object.create(Player.prototype);
Pacman.prototype.constructor = Pacman;

Pacman.prototype.draw = function (){
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color;
  this.ctx.arc(this.x,this.y,this.size,
    Math.PI / this.mouthIndex,-Math.PI / this.mouthIndex,false);
  this.ctx.lineTo(this.x,this.y,this.size)
  this.ctx.fill();
  this.ctx.restore();
}

//ctx.translate(midX,midY);
// ctx.rotate(radianAngle);

function Ghost(ctx,size,color){
  Player.call(this,ctx,size,color);
  this.eyesX=0;
  this.eyesY=0;
}

Ghost.prototype = Object.create(Player.prototype);
Ghost.prototype.constructor = Ghost;

Ghost.prototype.draw = function (){
  let size= this.size;
  let x = this.x - size/2;
  let y = this.y + size/2;
  this.ctx.save();
  this.ctx.fillStyle = this.color;
  this.ctx.beginPath();
  this.ctx.moveTo(x, y);
  this.ctx.lineTo(x, y-size*2/5);
  this.ctx.bezierCurveTo(x, y-size*4/5, x+size/4, y-size, x+size/2, y-size);
  this.ctx.bezierCurveTo(x+size*4/5, y-size, x+size, y-size*4/5, x+size, y-size/2);
  this.ctx.lineTo(x+size, y);
  this.ctx.lineTo(x+size*5/6, y-size*1/6);
  this.ctx.lineTo(x+size*4/6, y);
  this.ctx.lineTo(x+size*3/6, y-size*1/6);
  this.ctx.lineTo(x+size*2/6, y);
  this.ctx.lineTo(x+size*1/6, y-size*1/6);
  this.ctx.lineTo(x, y);
  this.ctx.fill();
  
  //eyes
  this.ctx.fillStyle = 'white';
  this.ctx.beginPath();
  this.ctx.moveTo(x+size*2/10, y-size*5/10);
  this.ctx.ellipse(x+size/3, y-size/2, size/7, size/5, 0, 0, 2 * Math.PI);
  this.ctx.ellipse(x+size*2/3, y-size/2, size/7, size/5, 0, 0, 2 * Math.PI);
  this.ctx.fill();
  
  this.ctx.fillStyle = 'black';
  this.ctx.beginPath();
  this.ctx.arc(x+size/3+this.eyesX*size/20,y-size/2+this.eyesY*size/20,size/20,0,Math.PI*2);
  this.ctx.arc(x+size*2/3+this.eyesX*size/20,y-size/2+this.eyesY*size/20,size/20,0,Math.PI*2);
  this.ctx.fill();
  this.ctx.restore();

}

Ghost.prototype.setGhostEyesDir= function (eyesX,eyesY){
  this.eyesX=eyesX;
  this.eyesY=eyesY;
}






