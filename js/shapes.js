// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: setTool 
// drawing.js: activateDrawing, drawingTool 

var lineStart = {},
    drawingLine = false,
    tmpImage;

function beginLine(e){
    lineStart = {x:e.offsetX,y:e.offsetY};
    drawingLine = true;
    tmpImage = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function drawLine(e){
    if(!drawingLine)return;

    ctx.putImageData(tmpImage, 0, 0);
    ctx.beginPath(); 
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}

function endLine(){
    drawingLine = false;
    setImage();
}

function activateLine(e){
    setTool(e.target);

    canvas.addEventListener('mousedown', beginLine);
    canvas.addEventListener('mousemove', drawLine);
    canvas.addEventListener('mouseup', endLine);
}

function activateDash(e){
    setTool(e.target);

    ctx.setLineDash([2*radius, 6*radius]);
    canvas.addEventListener('mousedown', beginLine);
    canvas.addEventListener('mousemove', drawLine);
    canvas.addEventListener('mouseup', endLine);
}

document.getElementById('line').addEventListener('click', activateLine);
document.getElementById('dash').addEventListener('click', activateDash);