// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: radius 
// colors.js: activeColor 

var isDrawing = false, 
    lastPoint = {};
ctx.lineCap = ctx.lineJoin = "round";
// ctx.imageSmoothingEnabled = true;

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function beginDraw(e) {
  isDrawing = true;
  lastPoint = {x:e.offsetX, y:e.offsetY};
  drawDot(e);
}

function drawDot(e){
  var x = e.offsetX, y = e.offsetY;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2); 
  ctx.fillStyle = activeColor;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if(!isDrawing)return;

  var thisPoint = {x:e.offsetX, y:e.offsetY};
  var dist = distanceBetween(lastPoint, thisPoint);
  if(dist < 4)return; // replace with stroke polishing method?? 

  var midPoint = midPointBtw(lastPoint,thisPoint); 
  ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
  ctx.stroke(); 
  lastPoint = thisPoint;
  
  var x = midPoint.x, y = midPoint.y;
  ctx.beginPath();
  var radgrad = ctx.createRadialGradient(x,y,0.1,x,y,radius);  
  // radgrad.addColorStop(0, color?);
  // radgrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = radgrad;
  ctx.fillRect(x-radius, y-radius, 2*radius, 2*radius);
  
  ctx.beginPath();
  ctx.moveTo(x,y); 
}

function endDraw(e) {
  isDrawing = false;
  ctx.beginPath(); 

  setImage();
}

function activateDrawing(e){
    setTool(e.target);
    
    canvas.style.cursor = 'pointer'; 
    canvas.addEventListener('mousedown', beginDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mousemove', draw);
}

var drawingTool = document.getElementById('draw');
drawingTool.addEventListener('click', activateDrawing);

