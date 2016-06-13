// DEPENDENCIES
// main.js: ctx

var activeColor,
    transparentColor,
    typing = false;

var colors = [
    'rgb(255,255,255)', // white 
    'rgb(211,211,211)',// 'lightgray', 
    'rgb(128,128,128)', // 'grey', 
    'rgb(255,0,0)', // 'red',
    'rgb(210,105,30)', // 'chocolate',
    'rgb(255,160,122)', // 'lightsalmon', 
    'rgb(255,165,0)', // 'orange',
    'rgb(255,255,0)', // 'yellow', 
    'rgb(253,253,150)', // '#FDFD96', // pastel yellow 
    'rgb(173,255,47)', // 'greenyellow',
    'rgb(3,192,60)', // '#03C03C', // dark pastel green 
    'rgb(144,238,144)', // 'lightgreen',
    'rgb(0,255,255)', // 'cyan', // or aqua  
    'rgb(135,206,250)', // 'lightskyblue',
    'rgb(0,0,255)', // 'blue', 
    'rgb(238,130,238)', // 'violet',
    'rgb(255,0,255)' // 'magenta'
];

function setColor(color){
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    activeColor = color;
    transparentColor = rgbToRgba(color,0);
    var active = document.getElementsByClassName('swatch active')[0];
    if(active) active.className = 'swatch';
    if(typing){
        var text = document.getElementById('text-id');
        text.style.color = color;
        text.focus(); 
    }
}

function rgbToRgba(rgb, a){
    var rgba = rgb.replace(/rgb/i, 'rgba');
    rgba = rgba.replace(/\)/i, ','+a+')');
    return rgba; 
}

function setSwatch(e){
    var swatch = e.target; 
    setColor(swatch.style.backgroundColor);
    swatch.className += ' active';
}

for(var i = 0, n=colors.length; i<n; i++){
    var swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = colors[i];
    swatch.addEventListener('click', setSwatch);
    document.getElementById('colors').appendChild(swatch);
}

setSwatch({target:document.getElementsByClassName('swatch')[0]}); // first swatch default 