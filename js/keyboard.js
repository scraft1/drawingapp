var undoStroke = function(){
  if(imageVersion == 0)return;
  imageVersion--;
  ctx.putImageData(canvasImages[imageVersion], 0, 0);
}

var redoStroke = function(){
  if(imageVersion == canvasImages.length-1)return;
  imageVersion++;
  ctx.putImageData(canvasImages[imageVersion], 0, 0);
}

var keyBoard = function(e){
  if(e.keyCode == 90 && e.shiftKey && e.metaKey){
    redoStroke();
  }
  else if(e.keyCode == 90 && e.metaKey){
    undoStroke();
  }
}


window.addEventListener('keydown', keyBoard);