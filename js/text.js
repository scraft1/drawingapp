// DEPENDENCIES
// main.js: ctx, canvas  
// toolbar.js: setTool, textToolbar 
// colors.js: typing, textColor 

var fontSize = 26, // default
    lineHeight = 1.25,
    textCoord = {},
    text;

function setFontSize(size){
    fontSize = parseInt(size); 
    if(text) fontSizePosition(); 
}

function fontSizePosition(){
    text.style.fontSize = fontSize+'px';
    text.style.top = (textCoord.y-fontSize*lineHeight/2)+'px'; 
    ctx.font=fontSize+'px sans-serif'; 
}

function createText(e){
    if(typing)drawText();
    textCoord = {x:e.offsetX,y:e.offsetY}; 
    text = document.createElement('textarea');  
    text.style = 'position:absolute;border:none;outline:none;resize:none;z-index:2';
    text.style.backgroundColor = 'transparent';
    text.style.width = width-textCoord.x+'px';
    text.style.height = height-textCoord.y+'px';
    text.style.lineHeight = lineHeight;
    text.style.color = textColor; 
    text.style.left = (textCoord.x)+'px';
    text.id = 'text-id';
    fontSizePosition(); 
    document.body.appendChild(text); 
    text.focus(); 
    typing = true;
}

function drawText(){
    var adj = {16:3,18:3,20:4,22:5,24:5,26:5,28:6,30:7,32:7,34:8,36:8,38:10,40:9,42:10,44:10,46:12,48:12,50:11};
    var x = textCoord.x+2; 
    var y = textCoord.y+fontSize*lineHeight/2 - adj[fontSize];

    var lines = text.value.split('\n'); 
    for(var i = 0; i < lines.length; i++){
        ctx.fillText(lines[i],x,y);
        y += Math.floor(fontSize*lineHeight); 
    }
    text.remove(); 
    if(lines != 0)pages[currentPage].setImage(); 
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