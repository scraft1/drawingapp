// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: setTool, textToolbar 

var preview = false,
    inputText = '',
    tmpImage;

function previewText(e){
    preview = true; 
    tmpImage = ctx.getImageData(0,0,canvas.width,canvas.height);
    inputText = document.getElementById('text-value').value;
    moveText(e);
}

function moveText(e){
    if(!preview)return;

    ctx.putImageData(tmpImage, 0, 0);
    ctx.fillText(inputText,e.offsetX,e.offsetY);
}

function pasteText(){
    preview = false;
    setImage();
}

function activateText(e){
    setTool(e.target);

    textToolbar.style.display = 'inline'; 
    canvas.style.cursor = 'default'; 
    canvas.addEventListener('mousedown', previewText);
    canvas.addEventListener('mousemove', moveText);
    canvas.addEventListener('mouseup', pasteText);
}

function changeFontSize(size){
    document.getElementById('text-value').style.fontSize = size+'px';
    ctx.font=size+'px sans-serif'; 
}

var textTool = document.getElementById('text');
textTool.addEventListener('click', activateText);

var fontSize = document.getElementById('font-size');
for(var i = 16; i<52; i+=2){
    var option = document.createElement('option');
    option.value = i
    option.innerHTML = i;
    if(i == 40){
        changeFontSize(i);
        option.selected = 'selected'; 
    }
    fontSize.appendChild(option);
}

// change font-family ?? 