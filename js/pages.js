// DEPENDENCIES
// main.js: ctx, blankCanvas

var blankCanvas = ctx.getImageData(0,0,canvas.width,canvas.height);
var pages = [];
var currentPage = 0;  

class Page {
    constructor(){ 
        this.canvasImages = [blankCanvas]; 
        this.imageVersion = 0;   
    }

    currentImage(){
        return this.canvasImages[this.imageVersion]; 
    }

    setImage(){
      if(this.imageVersion < this.canvasImages.length-1){
        this.canvasImages = this.canvasImages.slice(0,this.imageVersion+1);
      }
      var image = ctx.getImageData(0,0,canvas.width,canvas.height);
      this.canvasImages.push(image);
      this.imageVersion = this.canvasImages.length - 1; 
    }

    undoStroke(){
      if(this.imageVersion == 0)return;
      this.imageVersion--;
      ctx.putImageData(this.currentImage(), 0, 0); 
    }

    redoStroke(){
      if(this.imageVersion == this.canvasImages.length-1)return;
      this.imageVersion++;
      ctx.putImageData(this.currentImage(), 0, 0);
    }
}

function addPage(){
    var page = new Page();
    pages.splice(currentPage+1, 0, page); 
    forwardPage(); 
    document.getElementById('total-pages').innerHTML = pages.length;
}

function removePage(){
    pages.splice(currentPage,1);
    if(currentPage > pages.length - 1) currentPage = pages.length - 1;
    updateCurrentPage(); 
    document.getElementById('total-pages').innerHTML = pages.length;
}

function updateCurrentPage(){
    var cur = document.getElementById('current-page');
    cur.innerHTML = currentPage + 1;
    ctx.putImageData(pages[currentPage].currentImage(), 0, 0); 
}

function forwardPage(){
    if(currentPage == pages.length-1)return;
    currentPage++;
    updateCurrentPage();
}

function backwardPage(){
    if(currentPage == 0)return;
    currentPage--;
    updateCurrentPage();
}

document.getElementById('add-page').addEventListener('click', addPage);
document.getElementById('remove-page').addEventListener('click', removePage);