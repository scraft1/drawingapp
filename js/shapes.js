// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: setTool
// drawing.js: distanceBetween 

// ALL SHAPES 
var startPoint = {},
    drawing = false,
    tmpImage; 

function beginShape(e){
    startPoint = {x:e.offsetX,y:e.offsetY};
    drawing = true;
    tmpImage = ctx.getImageData(0,0,canvas.width,canvas.height);
    minX = e.offsetX; // needed for graph 
}

function endShape(){
    drawing = false;
    pages[currentPage].setImage();
}

function shapeTool(e){
    setTool(e.target); // before adding event listeners 
    canvas.addEventListener('mousedown', beginShape);
    canvas.addEventListener('mouseup', endShape);
}

// LINE and DASH 
function drawLine(e){
    if(!drawing)return;
    ctx.putImageData(tmpImage,0,0);

    ctx.beginPath(); 
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}

function activateLine(e){
    shapeTool(e); 
    canvas.addEventListener('mousemove', drawLine);
}

document.getElementById('line').addEventListener('click', activateLine);


// RECTANGLE 
function drawRect(e){
    if(!drawing)return;
    ctx.putImageData(tmpImage,0,0);
    
    var width = e.offsetX - startPoint.x;
    var height = e.offsetY - startPoint.y;
    ctx.strokeRect(startPoint.x,startPoint.y,width,height);
}

function activateRect(e){
    shapeTool(e); 
    canvas.addEventListener('mousemove', drawRect);
}

var rectangle = document.getElementById('rectangle');
rectangle.addEventListener('click', activateRect);


// CIRCLE  
function drawCirc(e){
    if(!drawing)return;
    ctx.putImageData(tmpImage,0,0);
    
    var thisPoint = {x:e.offsetX,y:e.offsetY};
    var circRad = distanceBetween(startPoint,thisPoint); 
    ctx.beginPath(); 
    ctx.arc(startPoint.x,startPoint.y,circRad,0,2*Math.PI); 
    ctx.stroke(); 
}

function activateCirc(e){
    shapeTool(e); 
    canvas.addEventListener('mousemove', drawCirc);
}

var circle = document.getElementById('circle');
circle.addEventListener('click', activateCirc);


// GRAPHS
var minX = canvas.width;

function drawGraph(e){
    if(!drawing)return;
    ctx.putImageData(tmpImage,0,0);
    
    var x = e.offsetX, y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(startPoint.x,startPoint.y);
    ctx.lineTo(startPoint.x,y);
    
    if(graphType == 'tgraph'){
        var xaxis = (y-startPoint.y)/2 + startPoint.y;
        if (x < minX) minX = x;
        ctx.moveTo(minX,xaxis);
        if(x<startPoint.x){x=startPoint.x;}
        ctx.lineTo(x,xaxis);
    } else { // Lgraph 
        var side = y - startPoint.y; // Math.abs() for positive x axis 
        // ctx.lineTo(x,y); // custom L sizes 
        ctx.lineTo(startPoint.x+side,y); // match width and height
    }
    ctx.stroke(); 
}

function activateGraph(e){
    graphType = e.target.id; 
    shapeTool(e);
    canvas.addEventListener('mousemove', drawGraph);
}

var tgraph = document.getElementById('tgraph');
tgraph.addEventListener('click', activateGraph);

var lgraph = document.getElementById('lgraph');
lgraph.addEventListener('click', activateGraph);




