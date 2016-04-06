var width = height = 2000; 

var canvas = document.getElementById('canvas1');
ctx = canvas.getContext('2d');
canvas.width = width; // window.innerWidth;
canvas.height = height; // window.innerHeight;

window.onresize = function(){
  var image = ctx.getImageData(0,0, canvas.width, canvas.height);
  canvas.width = width; // window.innerWidth;
  canvas.height = height; // window.innerHeight;
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

// NOTES 

// e.offsetX or Y is relative to event target (canvas), not supported by Firefox
// e.clientX or Y is relative to browser window  

// TO DO: 
// scrolling 
// copy/cut/drag/zoom, fill 
// multiline text
// insert pictures, circle, square  
// smooth last stroke?,lasso?, color dot?
// save images and reupload images 
// arrange colors 
// show angle of lines

// virtual canvas to avoid resizing 
// clear canvas by setting width or height 