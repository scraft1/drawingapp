// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: setTool, radius 

var erasing = false;

function beginErase(e){
    erasing = true; 
}

function erase(e){
    if(!erasing)return;
    var s = 3*radius; 
    ctx.clearRect(e.offsetX-s/2,e.offsetY-s/2,s,s);
}

function endErase(){
    erasing = false;
    setImage();
}

function activateErasor(e){
    setTool(e.target);

    canvas.addEventListener('mousedown', beginErase);
    canvas.addEventListener('mousemove', erase);
    canvas.addEventListener('mouseup', endErase);
}

var erasor = document.getElementById('erasor');
erasor.addEventListener('click', activateErasor);