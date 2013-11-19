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