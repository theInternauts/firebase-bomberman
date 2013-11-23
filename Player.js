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
  var isSpacebarBtn = false
  var speed = 9

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
      case 'isSpacebarBtn':
        isSpacebarBtn  = value
        break
    }
  }

  update = function(){
    if (isUpBtn){
      drawY -= speed
    } else if (isRightBtn){
      drawX += speed
    } else if (isDownBtn){
      drawY += speed
    } else if (isLeftBtn){
      drawX -= speed
    }
  }

  return {
    id:getID,
    getConfig:getConfig,
    getPosition:getPosition,
    setButton:setButton,
    update:update
  }
}
