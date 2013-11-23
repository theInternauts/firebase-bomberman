function Bomb( options ){
  if(!options){ options = {} }
  var isActive = true;
  var blastRadius = options.blastRadius || 3
  var timer = options.timer || 3
  var id = options.id || Date.now()
  getTimer = function(){ return timer }
  getBlastRadius = function(){ return blastRadius }
  getID = function(){ return id }
  getStatus = function(){
    return {
      isActive:isActive
    }
  }

  return {
    id: getID,
    getStatus:getStatus
  }
}
