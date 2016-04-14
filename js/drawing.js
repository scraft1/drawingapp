// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: radius 
// colors.js: activeColor 

var isDrawing = false, 
    control1 = {},
    control2 = {},
    lastPoint = {},
    strokeEnd = {},
    readyToDraw = false,
    gradrad; 

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

function angleBetween(point1, point2) {
  return Math.atan2( point2.y - point1.y, point2.x - point1.x );
}

function beginDraw(e) {
  isDrawing = true;
  lastPoint = control1 = {x:e.offsetX, y:e.offsetY};
  drawDot(e);
  ctx.beginPath();
  ctx.moveTo(e.offsetX,e.offsetY); 
}

function drawDot(e){
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2); 
  ctx.fillStyle = activeColor;
  ctx.fill();
}

function draw(e) {
  if(!isDrawing)return;

  var thisPoint = {x:e.offsetX, y:e.offsetY};
  var dist = distanceBetween(lastPoint, thisPoint); 
  if(dist < radius)return; 

  if(readyToDraw){
    var midPoint = midPointBtw(control2,thisPoint); 
    var x = midPoint.x, y = midPoint.y;
    ctx.bezierCurveTo(control1.x,control1.y,control2.x,control2.y,x,y);
    ctx.stroke(); 
    lastPoint = control1 = thisPoint; 
    readyToDraw = false; 
  } else {
    lastPoint = control2 = thisPoint; 
    readyToDraw = true;
  }
}

function endDraw(e) {
  ctx.lineTo(e.offsetX,e.offsetY);
  ctx.stroke(); 
  ctx.beginPath(); 
  isDrawing = readyToDraw = false;
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

