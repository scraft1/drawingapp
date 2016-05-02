// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: setTool, textToolbar 

var fontSize = 40, // default
    typing = false,
    textCoord = {},
    text;

function setFontSize(size){
    fontSize = parseInt(size); 
    if(text) fontSizePosition(); 
}

function fontSizePosition(){
    text.style.fontSize = fontSize+'px';
    text.style.top = (textCoord.y-fontSize/2)+'px'; 
    ctx.font=fontSize+'px sans-serif'; 
}

function createText(e){
    if(typing)drawText();
    textCoord = {x:e.offsetX,y:e.offsetY}; 
    text = document.createElement('textarea');  
    text.style = 'position:absolute;border:none;outline:none;resize:none';
    text.style.backgroundColor = 'transparent';
    text.style.width = width-e.offsetX+'px';
    text.style.height = height-e.offsetY+'px';
    text.style.lineHeight = 1; // needed ? 
    text.style.color = activeColor; 
    text.style.left = (textCoord.x)+'px';
    fontSizePosition(); 
    document.body.appendChild(text); 
    text.focus(); 
    typing = true;
}

function drawText(){
    var adj = fontSize/10; 
    if(fontSize < 34)adj = Math.floor(adj);
    else adj = Math.ceil(adj); 
    var x = textCoord.x+2; 
    var y = textCoord.y+fontSize/2-adj;

    var lines = text.value.split('\n'); 
    for(var i = 0; i < lines.length; i++){
        ctx.fillText(lines[i],x,y);
        y += fontSize; 
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