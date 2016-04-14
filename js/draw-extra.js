// optional: only use midpoints as control points 

// drawing circles between the points 
function draw(e) {
  if(!isDrawing)return;

  var thisPoint = {x:e.offsetX, y:e.offsetY};
  var dist = distanceBetween(lastPoint, thisPoint); 
  var angle = angleBetween(lastPoint, thisPoint);

  for (var i = 0; i < dist; i+=1) {
    
    x = lastPoint.x + (Math.sin(angle) * i);
    y = lastPoint.y + (Math.cos(angle) * i);
    
    var radgrad = ctx.createRadialGradient(x,y,radius/2,x,y,radius);
    
    radgrad.addColorStop(0, activeColor);
    radgrad.addColorStop(1, transparentColor);
    
    ctx.fillStyle = radgrad;
    ctx.fillRect(x-radius, y-radius, 2*radius, 2*radius);
  }

  lastPoint = thisPoint; 
}

// create linear gradient to smooth stroke edges 
function draw(e) {
  if(!isDrawing)return; 
  var thisPoint = {x:e.offsetX, y:e.offsetY};
  var dist = distanceBetween(lastPoint, thisPoint); 
  if(dist < radius)return; 

  var angle = angleBetween(lastPoint,thisPoint);  

  var gx1 = lastPoint.x + radius*Math.sin(angle);
  var gy1 = lastPoint.y - radius*Math.cos(angle);
  var gx2 = lastPoint.x - radius*Math.sin(angle);
  var gy2 = lastPoint.y + radius*Math.cos(angle);

  var grd = ctx.createLinearGradient(gx1,gy1,gx2,gy2);
  grd.addColorStop(0, transparentColor);
  grd.addColorStop(0.2, activeColor);
  grd.addColorStop(0.8, activeColor);
  grd.addColorStop(1, transparentColor);
  ctx.strokeStyle = grd; 

  ctx.lineTo(thisPoint.x,thisPoint.y);
  ctx.stroke(); 
  lastPoint = thisPoint; 
  ctx.beginPath(); // needed to clear old gradients; paths overlap and show solid circles 
  ctx.moveTo(e.offsetX,e.offsetY);
}

// combination of linear gradients and bezier curves 
// if control points are outside stroke width, use their distance as gradient edge 
function draw(e) {
  if(!isDrawing)return;

  var thisPoint = {x:e.offsetX, y:e.offsetY};
  var dist = distanceBetween(lastPoint, thisPoint); 
  if(dist < radius)return; 

  if(readyToDraw){
    var midPoint = midPointBtw(control2,thisPoint); 
    var x = midPoint.x, y = midPoint.y;

    var angle = angleBetween(strokeEnd,thisPoint);
    var gx1, gy1, gx2, gy2; 
    var strWid1 = strWid2 = radius;

    // c1
    var c1ang = angleBetween(strokeEnd,control1); 
    var c1r = control1.d * Math.sin(c1ang - angle);
    if(c1ang > 0 && c1r > strWid1){
      strWid1 = c1r;
    } else if (c1ang < 0 && c1r > strWid2){
      strWid2 = c1r; 
    }

    // c2
    var c2ang = angleBetween(strokeEnd,control2); 
    var c2r = control2.d * Math.sin(c2ang - angle);
    if(c2ang > 0 && c2r > strWid2){
      strWid2 = c2r;
    } else if (c2ang < 0 && c2r > strWid2){
      strWid2 = c2r; 
    }

    gx1 = strokeEnd.x + strWid1*Math.sin(angle);
    gy1 = strokeEnd.y - strWid1*Math.cos(angle);
    gx2 = strokeEnd.x - strWid2*Math.sin(angle);
    gy2 = strokeEnd.y + strWid2*Math.cos(angle);

    var grd = ctx.createLinearGradient(gx1,gy1,gx2,gy2);
    grd.addColorStop(0, transparentColor);
    grd.addColorStop(0.25, activeColor);
    grd.addColorStop(0.75, activeColor);
    grd.addColorStop(1, transparentColor);
    ctx.strokeStyle = grd; 

    ctx.bezierCurveTo(control1.x,control1.y,control2.x,control2.y,x,y);
    ctx.stroke(); 
    lastPoint = control1 = thisPoint; 
    control1['d'] = distanceBetween(strokeEnd,thisPoint);
    strokeEnd = {x:x,y:y}; 
    readyToDraw = false; 
  } else {
    lastPoint = control2 = thisPoint; 
    control2['d'] = distanceBetween(strokeEnd,thisPoint);
    readyToDraw = true;
  }
}

