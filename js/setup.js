// Included last 

// DEPENDENCIES
// toolbar.js: removeEventListeners 
// drawing.js: activateDrawing, drawingTool 

var page = new Page();
pages.push(page); 
updateCurrentPage();

activateDrawing({target:drawingTool}); // set drawing tool as default 
//activateText({target:textTool}); 

var defaultStyle = document.getElementById('solid'); 
setToolStyle({target: defaultStyle}); 

setSwatch({target:document.getElementsByClassName('swatch')[0]}); // first swatch default 
