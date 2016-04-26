// Included last 

// DEPENDENCIES
// toolbar.js: removeEventListeners 
// drawing.js: activateDrawing, drawingTool 

activateDrawing({target:drawingTool}); // set drawing tool as default 

var defaultStyle = document.getElementById('solid'); 
setToolStyle({target: defaultStyle}); 
