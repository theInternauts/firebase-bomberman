function Game(){
  var startPositions = { player1: {x:83,y:39}, player2: {x:680,y:510}, player3: {x:680,y:39}, player4: {x:83,y:510} }
  var stage, ctxStage, actors, ctxActors, gameWidth, gameHeight, isPlaying, textures, localUser
  var players = []
  var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        }
  var bombacache = {}

  getBombs = function(){ return bombacache }

  init = function(){
    console.log("initializing...")
    stage = document.getElementById("mainBG")
    ctxStage = stage.getContext("2d")
    actors = document.getElementById("actors")
    ctxActors = actors.getContext("2d")
    gameWidth = stage.width
    gameHeight = stage.height
    isPlaying = false
    var options = {id:"White Bomberman"}
    options.drawX = startPositions.player1.x
    options.drawY = startPositions.player1.y
    localUser = new Player(options)
    players.push(localUser)
    document.addEventListener("keydown", function(e) {setKeyFlags(e, true);}, false);
    document.addEventListener("keyup", function(e) {setKeyFlags(e, false);}, false);
    // buildStagePillars()
    start()
  }

  load = function(){
    console.log("loading...")
    textures = new Image();
    textures.src = "images/bomberman_sprites.png";
    textures.addEventListener("load", init, false);
  }

  start = function(){
    console.log("starting...")
    ctxStage.drawImage(textures, 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight)
    isPlaying = true;
    requestAnimFrame(gameLoop);
  }

  stop = function(){
    isPlaying = false
    console.log("stopping...")
  }

  gameLoop = function(){
    // console.log("looping!")
    if(isPlaying){
      /* This is probably gobbling up memory over time.
      Will possibly casue a stack overflow or memory full runtime error over a
      long period of time.  There MUST be a better way to do this! */
      clearCtx(ctxActors)
      drawAllBombs(ctxActors)
      drawAllPlayers(ctxActors)
      requestAnimFrame(gameLoop)
    }
  }

  isOutOfBounds = function(actor){
        vector = actor.getVector(),
        config = actor.getConfig(),
        newTopY = vector.drawY,
        newBottomY = vector.drawY + config.height,
        newLeftX = vector.drawX,
        newRightX = vector.drawX + config.width,
        arenaTop = 5,
        arenaBottom = 570,
        arenaRight = 750,
        arenaLeft = 65;
    if (vector.isUpBtn){
      newTopY -= vector.speed
      newBottomY -= vector.speed
    }
    if (vector.isRightBtn){
      newLeftX += vector.speed
      newRightX += vector.speed
    }
    if (vector.isDownBtn){
      newTopY += vector.speed
      newBottomY += vector.speed
    }
    if (vector.isLeftBtn){
      newLeftX -= vector.speed
      newRightX -= vector.speed
    }
    return newBottomY > arenaBottom ||
        newTopY < arenaTop ||
        newRightX > arenaRight ||
        newLeftX < arenaLeft;
  }

  drawAllPlayers = function(ctx){
    player1 = players[0]
    if (!isOutOfBounds(player1)) {
      //possible race condition here
      player1.update()
    }
    ctxActors.drawImage(textures, player1.getConfig().srcX, player1.getConfig().srcY, player1.getConfig().width, player1.getConfig().height, player1.getPosition().drawX, player1.getPosition().drawY, player1.getConfig().width, player1.getConfig().height)
  }

  drawAllBombs = function(ctx){
    for (i in bombacache){
      ctx.drawImage(textures, bombacache[i].getConfig().srcX, bombacache[i].getConfig().srcY, bombacache[i].getConfig().width, bombacache[i].getConfig().height, bombacache[i].getPosition().drawX, bombacache[i].getPosition().drawY, bombacache[i].getConfig().width, bombacache[i].getConfig().height)
    }
  }

  buildStagePillars = function(){
    var pillarWidth = 60
    var offsetX = 70
    var offsetY = 29
    return [
              new Pillar(offsetX + 60, offsetY + 60, pillarWidth, pillarWidth),
              new Pillar(offsetX + 180, offsetY + 60, pillarWidth, pillarWidth),
              new Pillar(offsetX + 300, offsetY + 60, pillarWidth, pillarWidth),
              new Pillar(offsetX + 420, offsetY + 60, pillarWidth, pillarWidth),
              new Pillar(offsetX + 600, offsetY + 60, pillarWidth, pillarWidth),
              new Pillar(offsetX + 60, offsetY + 180, pillarWidth, pillarWidth),
              new Pillar(offsetX + 180, offsetY + 180, pillarWidth, pillarWidth),
              new Pillar(offsetX + 300, offsetY + 180, pillarWidth, pillarWidth),
              new Pillar(offsetX + 420, offsetY + 180, pillarWidth, pillarWidth),
              new Pillar(offsetX + 600, offsetY + 180, pillarWidth, pillarWidth),
              new Pillar(offsetX + 60, offsetY + 300, pillarWidth, pillarWidth),
              new Pillar(offsetX + 180, offsetY + 300, pillarWidth, pillarWidth),
              new Pillar(offsetX + 300, offsetY + 300, pillarWidth, pillarWidth),
              new Pillar(offsetX + 420, offsetY + 300, pillarWidth, pillarWidth),
              new Pillar(offsetX + 600, offsetY + 300, pillarWidth, pillarWidth),
              new Pillar(offsetX + 60, offsetY + 420, pillarWidth, pillarWidth),
              new Pillar(offsetX + 180, offsetY + 420, pillarWidth, pillarWidth),
              new Pillar(offsetX + 300, offsetY + 420, pillarWidth, pillarWidth),
              new Pillar(offsetX + 420, offsetY + 420, pillarWidth, pillarWidth),
              new Pillar(offsetX + 600, offsetY + 420, pillarWidth, pillarWidth)


           ]
  }

  function clearCtx(ctx) {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
  }

  setKeyFlags = function(e, value){
    var buttonCode = e.which || e.keyCode;
    var button = ""
    switch (buttonCode) {
      case 38,119,87:
        e.preventDefault()
        button = 'up'
        localUser.setButton('isUpBtn', value)
        break
      case 40,115,83:
        e.preventDefault();
        button = 'down'
        localUser.setButton('isDownBtn', value)
        break
      case 37,97,65:
        e.preventDefault();
        button = 'left'
        localUser.setButton('isLeftBtn', value)
        break
      case 39,100,68:
        button = 'right'
        e.preventDefault();
        localUser.setButton('isRightBtn', value)
        break
      case 32:
        button = 'space'
        e.preventDefault();
        localUser.setButton('isSpacebarBtn', value)
        //this logic is in a bad bad place.  it's buggy/laggey here.  bombs aren't made until the spacebar is held for a few cycles
        if (value){
          var response = localUser.setBomb();
          if(response){
            bomb = new Bomb(response)
            bombacache[bomb.id()] = bomb
          }
        }
        break
      case 13:
        button = 'enter'
        e.preventDefault();
        break
    }    
  }


  return {
    load:load,
    stop:stop,
    playerCount: function(){ return players.count },
    getBombs:getBombs
  }
}
