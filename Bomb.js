function Bomb( options ){
  var srcX = 200
  var srcY = 600
  var width = 35
  var height = 35
  var drawX = options.drawX
  var drawY = options.drawY
  var isActive = true
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

  getConfig = function(){
    return {
      srcX:srcX,
      srcY:srcY,
      width:width,
      height:height
    }
  }

  getPosition = function(){
    return {
      drawX: drawX,
      drawY: drawY
    }
  }

  return {
    id: getID,
    getTimer: getTimer,
    getStatus: getStatus,
    getConfig: getConfig,
    getPosition: getPosition
  }
}
