// DEPENDENCIES
// main.js: ctx, canvas, scratchCanvas, scratchCtx   
// toolbar.js: setTool, radius 

// ERASOR
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
    pages[currentPage].setImage();
}

function activateErasor(e){
    setTool(e.target);

    canvas.style.cursor = 'default';
    canvas.addEventListener('mousedown', beginErase);
    canvas.addEventListener('mousemove', erase);
    canvas.addEventListener('mouseup', endErase);
}

var erasor = document.getElementById('erase');
erasor.addEventListener('click', activateErasor);


// SELECT
var selecting = false,
    movingSelection = false,
    selectCopy = false,
    selectStart = {},
    selectRect = {},
    scratchImg,
    selectImg,
    xDiff,
    yDiff; 

function withinRect(e,rect){
    var x = e.offsetX, y = e.offsetY;
    if(rect.x<x && x<(rect.x+rect.w) && rect.y<y && y<(rect.y+rect.h)){
        return true;
    } return false;
}

function beginSelect(e){
    if(withinRect(e,selectRect)){
        movingSelection = true; 
        xDiff = e.offsetX - selectRect.x;
        yDiff = e.offsetY - selectRect.y; 

        ctx.putImageData(tmpImage,0,0); 
        selectImg = ctx.getImageData(selectRect.x,selectRect.y,selectRect.w,selectRect.h);
        if(!selectCopy){
            ctx.clearRect(selectRect.x,selectRect.y,selectRect.w,selectRect.h); 
            tmpImage = ctx.getImageData(0,0,canvas.width,canvas.height);
            ctx.putImageData(selectImg,selectRect.x,selectRect.y);
        }
        ctx.drawImage(scratchCanvas,0,0); 
    } else {
        selecting = true; 
        if(!Object.keys(selectRect).length)tmpImage = ctx.getImageData(0,0,canvas.width,canvas.height); 
        selectStart = {x:e.offsetX,y:e.offsetY};
        selectRect = {}; 
        ctx.putImageData(tmpImage,0,0); 
    } 
}

function moveSelect(e){
    if(selecting){
        selectRect = rectCoord(selectStart.x, selectStart.y, e.offsetX, e.offsetY); 
        scratchCtx.putImageData(scratchImg,0,0);
        scratchCtx.strokeRect(selectRect.x,selectRect.y,selectRect.w,selectRect.h);
        ctx.putImageData(tmpImage,0,0);
        ctx.drawImage(scratchCanvas,0,0); 
    } else if(movingSelection){
        ctx.putImageData(tmpImage,0,0); 
        ctx.putImageData(selectImg,e.offsetX-xDiff,e.offsetY-yDiff);

        scratchCtx.putImageData(scratchImg,0,0);
        scratchCtx.strokeRect(e.offsetX-xDiff,e.offsetY-yDiff,selectRect.w,selectRect.h);
        ctx.drawImage(scratchCanvas,0,0);
    } else if(withinRect(e,selectRect)){
        canvas.style.cursor = 'move';
    } else {
        canvas.style.cursor = 'default';
    }
}

function endSelect(e){
    if(selecting){
        selecting = false;
    } else if(movingSelection){
        movingSelection = false;
        canvas.style.cursor = 'default';

        ctx.putImageData(tmpImage,0,0); 
        ctx.putImageData(selectImg,e.offsetX-xDiff,e.offsetY-yDiff);
        pages[currentPage].setImage();
        selectStart = selectRect = {}; 
    }
    selectCopy = false; 
}

function activateSelect(e){
    setTool(e.target);

    scratchCanvas.width = width; // clears canvas 
    scratchImg = scratchCtx.getImageData(0,0,scratchCanvas.width,scratchCanvas.height);
    scratchCtx.strokeStyle = 'lightblue'; 
    scratchCtx.setLineDash([10,10]);

    canvas.addEventListener('mousedown', beginSelect);
    canvas.addEventListener('mousemove', moveSelect);
    canvas.addEventListener('mouseup', endSelect);
}

var select = document.getElementById('select');
select.addEventListener('click', activateSelect);
