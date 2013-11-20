function Game(){
  
  return {

  }
}

function Player( options ){

  return {  }
}

function Bomb( options ){
  if(!options){ options = {} }
  this.blastRadius = options.blastRadius || 3
  this.timer = options.timer || 3
  this.id = options.id || Date.now()
  getTimer = function(){ return this.timer }
  getBlastRadius = function(){ return this.blastRadius }
  getID = function(){ return this.id }

  return {
    id: getID()
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