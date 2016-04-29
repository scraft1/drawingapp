// DEPENDENCIES
// main.js: ctx, canvas  

function keyBoardHandler(e){
  if(typing){
    if(e.keyCode == 9){ // tab
      e.preventDefault();
      text.value += '    ';
    }
    else if(e.metaKey && e.keyCode == 83){ // command s 
        e.preventDefault();
        drawText();
    } 
    return; 
  }
  else if(Object.keys(selectRect).length){
    if(e.metaKey && e.keyCode == 67){ // c
      selectCopy = true; 
    }
    else if(e.keyCode == 8){ // backspace  
      e.preventDefault(); // needs to work for textarea 
      ctx.putImageData(tmpImage,0,0);
      ctx.clearRect(selectRect.x,selectRect.y,selectRect.w,selectRect.h); 
      selectStart = selectRect = {};
    }
  }

  if(e.metaKey && e.shiftKey && e.keyCode == 90){ // z 
    redoStroke();
  }
  else if(e.metaKey && e.keyCode == 90){
    undoStroke();
    selectStart = selectRect = {};
  }
}

// UNDO and REDO 
function undoStroke(){
  if(imageVersion == 0)return;
  imageVersion--;
  ctx.putImageData(canvasImages[imageVersion], 0, 0); 
}

function redoStroke(){
  if(imageVersion == canvasImages.length-1)return;
  imageVersion++;
  ctx.putImageData(canvasImages[imageVersion], 0, 0);
}


// PASTE IMAGE 
var scale = 1; 

function pasteClipboard(e){
  var items = e.clipboardData.items;
  if(items[0].type.indexOf('image') == -1)return;
  
  var imgFile = items[0].getAsFile();
  var URLObj = window.URL || window.webkitURL;
  var urlSrc = URLObj.createObjectURL(imgFile);
  
  var img = new Image();
  img.src = urlSrc;
  img.onload = function(){
    var width = img.width * scale,
        height = img.height * scale;

    if(width<10){width=10;}
    else if(height<10){height=10;}
    else if(width>canvas.width){width=canvas.width;}
    else if(height>canvas.height){height=canvas.height;}

    ctx.drawImage(img,100,100,width,height);
    setImage(); 
  }
}

function setScale(value){
  scale = value; 
}

document.getElementById('imgscale').value = 1;


window.addEventListener('keydown', keyBoardHandler);
window.addEventListener('paste', pasteClipboard);