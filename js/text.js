// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: setTool, textToolbar 

var fontSize = 40, // default
    typing = false,
    textCoord = {},
    size,
    text,
    textId = 'text-area';

function createText(e){
    if(typing)drawText();
    size = document.getElementById('font-size').value; 
    var adj = size/10; 
    if(size < 34)adj = Math.floor(adj);
    else adj = Math.ceil(adj); 
    textCoord = {x:e.offsetX+2,y:e.offsetY+size/2-adj};
    
    text = document.createElement('textarea');  
    text.id = textId; 
    text.style = 'position:absolute;border:none;outline:none;resize:none';
    text.style.backgroundColor = 'transparent';
    text.style.left = (e.offsetX)+'px';
    text.style.top = (e.offsetY-size/2)+'px'; 
    text.style.width = width-e.offsetX+'px';
    text.style.height = height-e.offsetY+'px';
    text.style.fontSize = size+'px';
    text.style.lineHeight = 1; 
    ctx.font=size+'px sans-serif'; 
    text.style.color = activeColor; 
    document.body.appendChild(text); 
    text.focus(); 
    typing = true;
}

function drawText(){
    var lines = text.value.split('\n');
    var y = textCoord.y; 
    for(var i = 0; i < lines.length; i++){
        ctx.fillText(lines[i],textCoord.x,y);
        y += parseInt(size); 
    }
    
    text.remove(); 
    setImage(); 
    typing = false; 
}

function activateText(e){
    setTool(e.target);

    canvas.style.cursor = 'text'; 
    canvas.addEventListener('click', createText);
}

var textTool = document.getElementById('text');
textTool.addEventListener('click', activateText);

var fontSelect = document.getElementById('font-size');
for(var i = 16; i<52; i+=2){
    var option = document.createElement('option');
    option.value = i
    option.innerHTML = i;
    if(i == fontSize){
        option.selected = 'selected'; 
    }
    fontSelect.appendChild(option);
}

// change font-family ?? 


// text.setAttribute('xmlns', text.namespaceURI);
// var outer = text.outerHTML;
// var index = outer.indexOf('</textarea>');
// var html = outer.substring(0,index)+text.value+outer.substring(index);
        
// var data = '<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">' +
//    '<foreignObject width="100%" height="100%">' +
//    html+ 
//    '</foreignObject>' +
//    '</svg>';


// var DOMURL = window.URL || window.webkitURL || window;
// var img = new Image();
// var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
// var url = DOMURL.createObjectURL(svg);

// img.crossOrigin = 'Anonymous';
// img.onload = function(){
//     ctx.drawImage(img,0,0);
//     DOMURL.revokeObjectURL(url);
//     setImage(); 
// }
// img.src = url;