///////////////////////////////////////////////////////////
//////////
//////////   -->  CONFIG FILE     /////////////////////////
//////////
///////////////////////////////////////////////////////////
var config = {

  // game configuration
  // level 0  1   2   3
  speedArr: [0, 5, 10, 20],
  coinValue: 10,
  initPlayMode:'single',
  initLevel:0,
  initLifes:4,
  maxLifes:6,
  numGohsts:3,

  p1KeyBindings: {
    up: 38,
    down: 40,
    right: 39,
    left: 37,
  },

  p2KeyBindings: {
    up: 87,
    down: 83,
    right: 65,
    left: 68,
  },

  //grahical config 

  //fps: ,
  stepsW: 28, //even always
  stepsH: 31, //odd always
  menuBGColor:'rgba(0, 0, 0, 0.8)',
  fontColor:'rgb(211, 211, 104)',
  fontFamily:'pacfontregular',
  fontSize:'3rem',
  backgroundColor: '#000000',
  coinColor: '#FFFF00',
  mapsColors: ['#01007c', '#cc0000'],
  // 0 wall
  // 1 path & star
  // 2 big star
  // 3 staring point?
  // 4 door 
  // 8 do nothing
  maps: [
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [8, 8, 8, 8, 8, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [8, 8, 8, 8, 8, 0, 1, 0, 0, 1, 1, 1, 1, 1],
      [8, 8, 8, 8, 8, 0, 1, 0, 0, 1, 0, 0, 4, 4],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 1, 1, 1, 1, 0, 8, 8, 8],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 8, 8, 8],
      [8, 8, 8, 8, 8, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [8, 8, 8, 8, 8, 0, 1, 0, 0, 1, 1, 1, 1, 1],
      [8, 8, 8, 8, 8, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 1, 1, 1, 1, 0, 8, 8, 8],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 8, 8, 8],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]],

  // debugging
  debug: false,

  //  profiling
  profile: false,

}

 var sound = new Audio('sounds/pacman_beginning.wav');
 
