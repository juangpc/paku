function Player(pType,player,initPos){
  this.type=pType;  // 'ghost' 'pac'
  this.player=player; //'human' 'computer'

  this.x=initPos[0];
  this.y=initPos[1];

  this.speedX=0;
  this.speedY=0;
  
}

Player.prototype.init = function (){
  if(this.type == 'ghost'){

  }else if(this.type == 'pac'){

  }
}

Player.prototype.update = function (step){
  //move eyes.
  if(this.type == 'ghost'){

  }else if(this.type == 'pac'){

  }
}

