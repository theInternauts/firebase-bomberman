function Game(){

	var stage, ctxStage, actors, ctxActors, gameWidth, gameHeight, isPlaying, textures
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
    players.push(new Player({id:"White Bomberman"}))
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
    ctxActors.drawImage(textures, player1.config().srcX, player1.config().srcY, player1.config().width, player1.config().height, 82, 37, player1.config().width, player1.config().height)
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

  getID = function(){ return id }
  config = function(){
    return {
      srcX: srcX,
      srcY: srcY,
      width: width,
      height: height
    }
  }

  position = function(){
    return {
      drawX: drawX,
      drawY: drawY,
      centerX: centerX,
      centerY: centerY
    }
  }

  return {
    id:getID,
    config:config,
    position:position
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


// document.onkeypress = function(myEvent) { console.log(myEvent.keyCode); };
//utilities
function getKey(e){
	var buttonCode = e.which || e.keyCode;
	switch (buttonCode) {
		case 38,119:
			button = 'up'
			e.preventDefault()
			break
		case 40,115:
			button = 'down'
       		e.preventDefault();
			break
		case 37,97:
			button = 'left'
       		e.preventDefault();
			break
		case 39,100:
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
	return button
}
