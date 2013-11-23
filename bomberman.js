function Game(){

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

	init = function(){
		console.log("initializing...")
		stage = document.getElementById("mainBG")
		ctxStage = stage.getContext("2d")
		actors = document.getElementById("actors")
		ctxActors = actors.getContext("2d")
		gameWidth = stage.width
		gameHeight = stage.height
		isPlaying = false
    localUser = new Player({id:"White Bomberman"})
    players.push(localUser)
    document.addEventListener("keydown", function(e) {setKeyFlags(e, true);}, false);
    document.addEventListener("keyup", function(e) {setKeyFlags(e, false);}, false);
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

	stop = function(){ isPlaying = false }

	gameLoop = function(){
		console.log("looping!")
		if(isPlaying){
			/* This is probably gobbling up memory over time.
			Will possibly casue a stack overflow or memory full runtime error over a
			long period of time.  There MUST be a better way to do this! */
      // clearCtx(ctxActors)
      drawAllPlayers(ctxActors)
			requestAnimFrame(gameLoop)
		}
	}

  drawAllPlayers = function(ctx){
    player1 = players[0]
    ctxActors.drawImage(textures, player1.getConfig().srcX, player1.getConfig().srcY, player1.getConfig().width, player1.getConfig().height, 82, 37, player1.getConfig().width, player1.getConfig().height)
  }



  setKeyFlags = function(e, value){
    var buttonCode = e.which || e.keyCode;
    var button = ""
    switch (buttonCode) {
      case 38,119,87:
        button = 'up'
        e.preventDefault()
        break
      case 40,115,83:
        button = 'down'
        e.preventDefault();
        break
      case 37,97,65:
        button = 'left'
        e.preventDefault();
        break
      case 39,100,68:
        button = 'right'
        e.preventDefault();
        break
      case 32:
        button = 'space'
        e.preventDefault();
        break
      case 13:
        button = 'enter'
        e.preventDefault();
        break
    }
    console.log(buttonCode+": ", button)
  }


	return {
		load:load,
		stop:stop,
    playerCount: function(){ return players.count }
	}
}

function Player( options ){
  if(!options){ options = {} }
  var id = options.id || Date.now()
  var srcX = 0;
  var srcY = 600;
  var width = 35;
  var height = 54;
  var drawX = 400;
  var drawY = 300;
  var centerX = drawX + (width / 2);
  var centerY = drawY + (height / 2);
  var isUpBtn = false
  var isRightBtn = false
  var isDownBtn = false
  var isLeftBtn = false
  var isSpacebar = false

  getID = function(){ return id }
  getConfig = function(){
    return {
      srcX: srcX,
      srcY: srcY,
      width: width,
      height: height
    }
  }

  getPosition = function(){
    return {
      drawX: drawX,
      drawY: drawY,
      centerX: centerX,
      centerY: centerY
    }
  }

  setButton = function(key, value){
    switch (key) {
      case 'isUpBtn':
        isUpBtn = value
        break
      case 'isLeftBtn':
        isLeftBtn = value
        break
      case 'isDownBtn':
        isDownBtn = value
        break
      case 'isRightBtn':
        isRightBtn = value
        break
      case 'isSpacebar':
        isSpacebar  = value
        break
    }
  }

  return {
    id:getID,
    getConfig:getConfig,
    getPosition:getPosition,
    setButton:setButton
  }
}

function Bomb( options ){
  if(!options){ options = {} }
  var blastRadius = options.blastRadius || 3
  var timer = options.timer || 3
  var id = options.id || Date.now()
  getTimer = function(){ return timer }
  getBlastRadius = function(){ return blastRadius }
  getID = function(){ return id }

  return {
    id: getID
  }
}
