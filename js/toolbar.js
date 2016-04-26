// DEPENDENCIES
// main.js: ctx, canvas, gradrad 

// RADIUS 
var radius = 1.5, // default 
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
    if(radius <= 4){
        radius = Math.round(radius*2)/2; // round to nearest .5 
        setRadius(radius-0.5);
    } else {
        radius = Math.round(radius);
        setRadius(radius-interval);
    }
})

incRad.addEventListener('click', function(){
    if(radius < 4){
        radius = Math.round(radius*2)/2; // round to nearest .5 
        setRadius(radius+0.5);
    }
    else {
        radius = Math.round(radius);
        setRadius(radius+interval);
    }
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
    //ctx.setLineDash([]); 
    canvas.style.cursor = 'crosshair'; 
}

function removeEventListeners(){
    // draw 
    canvas.removeEventListener('mousedown', beginDraw);
    canvas.removeEventListener('mouseup', endDraw);
    canvas.removeEventListener('mousemove', draw);

    // all shapes 
    canvas.removeEventListener('mousedown', beginShape);
    canvas.removeEventListener('mouseup', endShape);

    // line and dash 
    canvas.removeEventListener('mousemove', drawLine);

    // rectangle  
    canvas.removeEventListener('mousemove', drawRect);

    // circle   
    canvas.removeEventListener('mousemove', drawCirc);

    // graph
    canvas.removeEventListener('mousemove', drawGraph);
    
    // text 
    canvas.removeEventListener('mousedown', previewText);
    canvas.removeEventListener('mousemove', moveText);
    canvas.removeEventListener('mouseup', pasteText);
    
    // erasor 
    canvas.removeEventListener('mousedown', beginErase);
    canvas.removeEventListener('mousemove', erase);
    canvas.removeEventListener('mouseup', endErase); 

    // select
    canvas.removeEventListener('mousedown', beginSelect);
    canvas.removeEventListener('mousemove', moveSelect);
    canvas.removeEventListener('mouseup', endSelect);   
}

// TOOL STYLES
function setToolStyle(e){
    var active = document.getElementsByClassName('tool-style active')[0];
    if(active){
        active.className = 'tool-style';
    }
    var toolStyle = e.target;
    toolStyle.className += ' active';

    if(toolStyle.id == 'dash'){
        ctx.setLineDash([2*radius, 6*radius]);
    } else {
        ctx.setLineDash([]);
    }
}

document.getElementById('solid').addEventListener('click', setToolStyle);
document.getElementById('dash').addEventListener('click', setToolStyle);
