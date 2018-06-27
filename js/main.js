window.onload = function () {
  let game = new Game('canvas');
  if (config.debug) {
    console.log("game object created")
    console.log(game);
  }
  game.start();

  if (config.debug)
    console.log("game finished");
}







































