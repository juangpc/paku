let sx=pmanSX;
  let sy=pmanSY;
  let x=(pmanX+pmanSX*step); //positions in xy plane
  let y=(pmanY+pmanSY*step);
  let xg=pos2grid(x,stepW); //postitions in grid
  let yg=pos2grid(y,stepH);
  
  //if(map[yg+pmanSY][xg+pmanSX] == 1 || 
  //   map[yg+pmanSY][xg+pmanSX] == 2)
  //  console.log("primera!!!")
  //
  //if ((pmanSX*(x-grid2pos(xg,stepW))<=0) && 
  //    (pmanSY*(y-grid2pos(yg,stepH))<=0))
  //console.log("segunda");
    
  if((map[yg+pmanSY][xg+pmanSX] == 1 || 
     map[yg+pmanSY][xg+pmanSX] == 2) ||
      ((pmanSX*(x-grid2pos(xg,stepW))<=0) && 
      (pmanSY*(y-grid2pos(yg,stepH))<=0))) {
    pmanX=x;
    pmanY=y;  