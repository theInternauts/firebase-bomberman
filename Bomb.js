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
