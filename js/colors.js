// DEPENDENCIES
// main.js: ctx

var activeColor; 

var colors = [
    'white',
    'lightgray', 
    'grey', 
    'red',
    'chocolate',
    'lightsalmon', 
    'orange',
    'yellow', 
    '#FDFD96', // pastel yellow 
    'greenyellow',
    '#03C03C', // dark pastel green 
    'lightgreen',
    'cyan', // or aqua  
    'lightskyblue',
    'blue', 
    'violet',
    'magenta'
];

function setColor(color){
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    activeColor = color;
    var active = document.getElementsByClassName('swatch active')[0];
    if(active){
        active.className = 'swatch';
    }
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