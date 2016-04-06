// DEPENDENCIES
// main.js: ctx

// RADIUS 
var radius = 2, // default 
    minRad = 0.5,
    maxRad = 20,
    interval = 1,
    radInput = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');

function setRadius(newRadius){
    if(newRadius < minRad)
        newRadius = minRad;
    else if (newRadius>maxRad)
        newRadius = maxRad;
    radius = newRadius;
    ctx.lineWidth = 2*radius;

    radInput.value = radius;

    var tool = document.getElementsByClassName('tool active')[0];
    if(tool && tool.id == 'dash'){
        ctx.setLineDash([2*radius, 6*radius]);
    }
}

decRad.addEventListener('click', function(){
    radius = Math.round(radius);
    setRadius(radius-interval);
})

incRad.addEventListener('click', function(){
    if(radius == 0.5)
        radius = 0.0;
    radius = Math.round(radius);
    setRadius(radius+interval);
})

setRadius(radius);

// TOOLS 
var textToolbar = document.getElementById('text-toolbar');

function setTool(tool){
    var active = document.getElementsByClassName('tool active')[0];
    if(active){
        active.className = 'tool';
    }
    tool.className += ' active';

    removeEventListeners();
    textToolbar.style.display = 'none'; 
    ctx.setLineDash([]); 
}

function removeEventListeners(){
    // drawing
    canvas.removeEventListener('mousedown', beginDraw);
    canvas.removeEventListener('mouseup', endDraw);
    canvas.removeEventListener('mousemove', draw);

    // line 
    canvas.removeEventListener('mousedown', beginLine);
    canvas.removeEventListener('mousemove', drawLine);
    canvas.removeEventListener('mouseup', endLine);

    // erasor 
    canvas.removeEventListener('mousedown', beginErase);
    canvas.removeEventListener('mousemove', erase);
    canvas.removeEventListener('mouseup', endErase);

    // text 
    canvas.removeEventListener('mousedown', previewText);
    canvas.removeEventListener('mousemove', moveText);
    canvas.removeEventListener('mouseup', pasteText);
}
