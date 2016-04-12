var width = height = 2000; 

var canvas = document.getElementById('canvas1');
ctx = canvas.getContext('2d');

var scratchCanvas = document.createElement('canvas');
scratchCtx = scratchCanvas.getContext('2d');

canvas.width = scratchCanvas.width = width; // window.innerWidth;
canvas.height = scratchCanvas.height = height; // window.innerHeight;

// e.offsetX or Y is relative to event target (canvas), not supported by Firefox
// e.clientX or Y is relative to browser window  

window.onresize = function(){
  var image = ctx.getImageData(0,0, canvas.width, canvas.height);
  canvas.width = width; // window.innerWidth;
  canvas.height = height; // window.innerHeight;
  ctx = canvas.getContext('2d');
  ctx.putImageData(image,0,0);
}

var canvasImages = [ctx.getImageData(0,0,canvas.width,canvas.height)]; 
var imageVersion = 0;

function setImage(){
  if(imageVersion < canvasImages.length-1){
    canvasImages = canvasImages.slice(0,imageVersion+1);
  }
  var currentImage = ctx.getImageData(0,0,canvas.width,canvas.height);
  canvasImages.push(currentImage);
  imageVersion = canvasImages.length - 1; 
}

function rectCoord(x1,y1,x2,y2){
    var x, y;
    if(x1 < x2){x = x1;}
    else{x = x2;}
    if(y1 < y2){y = y1;}
    else{y = y2;}
    var w = Math.abs(x1 - x2);
    var h = Math.abs(y1 - y2);
    return {x:x, y:y, w:w, h:h}
}


// TO DO: 
// copy/cut/drag/zoom 
// smooth last stroke? 
// grid background 
// show angle and magnitude of lines, change units 
// show size of erasor (thin rectangle), color dot
// curve (use highest point as control) 
// 2 rows, rect erasor 
// cosine, sine waves 

// multiline text, fill, lasso?
// save images and reupload images 
// arrange colors 

// virtual canvas to avoid resizing 
// clear canvas by setting width or height 


// Tool bar 
// Width, scale 
// Shape: line, rect, circ, graph 
// Style: solid, dash, fill? 
// erase: tool, region
// text 
// colors