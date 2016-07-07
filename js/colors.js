// DEPENDENCIES
// main.js: ctx

var textColor,
    transparentColor,
    typing = false;

var colors = [
    'rgb(255,255,255)', // white 
    'rgb(200,200,200)',// 'gray', 
    'rgb(210,105,30)', // 'chocolate',
    'rgb(192,186,130)', // light brown
    'rgb(255,105,97)', // pastel red,
    'rgb(254,165,127)', // salmon
    'rgb(244,180,200)', // pastel magenta
    'rgb(249,130,162)', // dark pink 
    'rgb(255,165,0)', // 'orange',
    'rgb(255,237,81)', // yellow
    'rgb(173,255,47)', // 'greenyellow',
    'rgb(148,240,148)', // 'lightgreen',
    'rgb(10,192,70)', // dark pastel green 
    'rgb(72,181,163)', // bluish green 
    'rgb(0,255,255)', // 'cyan', // or aqua 
    'rgb(135,206,250)', // 'lightskyblue'
    'rgb(117,137,191)', // dark blue
    'rgb(165,137,193)', // purple 
];

function setColor(color){
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    textColor = color;
    //transparentColor = rgbToRgba(color,0);
    var active = document.getElementsByClassName('swatch active')[0];
    if(active) active.className = 'swatch';
    if(typing){
        var text = document.getElementById('text-id');
        text.style.color = color;
        text.focus(); 
    }
    var tool = document.getElementsByClassName('tool active')[0];
    if(tool.id=='select')activateDrawing({target:drawingTool}); 
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

// function createColors(){
//     var r,g,b = 255;

//     while(r > 0){
        
//     }
// }

for(var i = 0, n=colors.length; i<n; i++){
    var swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = colors[i];
    swatch.addEventListener('click', setSwatch);
    document.getElementById('colors').appendChild(swatch);
}

// 'rgb(255,255,255)', // white 
//     'rgb(211,211,211)',// 'lightgray', 
//     'rgb(128,128,128)', // 'grey', 
//     'rgb(255,0,0)', // 'red',
//     'rgb(210,105,30)', // 'chocolate',
//     'rgb(255,160,122)', // 'lightsalmon', 
//     'rgb(255,165,0)', // 'orange',
//     'rgb(255,255,0)', // 'yellow', 
//     'rgb(253,253,150)', // '#FDFD96', // pastel yellow 
//     'rgb(173,255,47)', // 'greenyellow',
//     'rgb(3,192,60)', // '#03C03C', // dark pastel green 
//     'rgb(144,238,144)', // 'lightgreen',
//     'rgb(0,255,255)', // 'cyan', // or aqua  
//     'rgb(135,206,250)', // 'lightskyblue',
//     'rgb(0,0,255)', // 'blue', 
//     'rgb(238,130,238)', // 'violet',
//     'rgb(255,0,255)' // 'magenta'