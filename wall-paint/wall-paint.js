const canvas = document.querySelector('canvas');
let w;
let h;
const ctx = canvas.getContext('2d');
const position = document.querySelector('#position');
const wallPicker = document.querySelector('select#wall');
const colorPicker = document.querySelector('select#color');
let color = 'rgb(20,250,20)';
let wall = "url('wall.jpg')"; 
let e = window.event;
let isDrawing = false;
let circleRad = 25;
let prevX = null;
let prevY = null;
let isErasing = false;

function resizeCanvas(){
// create a temporary canvas obj to cache the pixel data //
    var temp_cnvs = document.createElement('canvas');
    var temp_cntx = temp_cnvs.getContext('2d');
// set it to the new width & height and draw the current canvas data into it  
    w = innerWidth;
    h = innerHeight;
    temp_cnvs.width = w; 
    temp_cnvs.height = h;
    //temp_cntx.fillStyle = _background;  // the original canvas's background color
    //temp_cntx.fillRect(0, 0, w, h);
    temp_cntx.drawImage(canvas, 0, 0);
// resize & clear the original canvas and copy back in the cached pixel data //
    canvas.width = w; 
    canvas.height = h;
    ctx.drawImage(temp_cnvs, 0, 0);
}

resizeCanvas();


function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

function circle(x, y){
	ctx.fillStyle = color;
	//ctx.strokeStyle = 'rgb(red, green, blue)';
	ctx.beginPath();
	ctx.arc(x, y, circleRad, degToRad(0), degToRad(360), false);
	ctx.fill();
}

function mouseCircle(x, y){

  //find dot distance
  let distance;
  if(prevY !== null || prevX !== null){
    distance = Math.sqrt((y-prevY)**2+(x-prevX)**2);
  }

  //if it's more than 1.5x dot's radius, draw dots in between
  if(distance > 1.5*circleRad){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth=circleRad*2;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x,y);
    ctx.stroke();
  }

  //draw circle
  ctx.fillStyle = color;
  console.log(color);
  //ctx.strokeStyle = 'rgb(red, green, blue)';
  ctx.beginPath();
  ctx.arc(x, y, circleRad, degToRad(0), degToRad(360), false);
  ctx.fill();

  //save previous x,y
  prevX = x;
  prevY = y; 
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function trackMouse(evt){
  var mousePos = getMousePos(canvas, evt);
  var message = mousePos.x + ',' + mousePos.y;
  var mousePos = getMousePos(canvas, evt);
  position.textContent = 'X;Y:'+ message;
  if(isDrawing === true){
    //circle(mousePos.x, mousePos.y);
    mouseCircle(mousePos.x, mousePos.y);
  }
}
canvas.addEventListener('mousedown', function(){
   isDrawing = true;
});

canvas.addEventListener('mouseup', function(){
   isDrawing = false; 
   prevX=null;
   prevY=null;     
});

canvas.addEventListener('mousemove', trackMouse, false);


colorPicker.addEventListener("change", function(){
  color = colorPicker.value;
});

wallPicker.addEventListener("change", function(){
  wall = wallPicker.value;
  document.querySelector('body').style.backgroundImage = wall;
});

document.querySelector('#resetButton').addEventListener("click", function() {
  ctx.clearRect(0,0,w,h);
});
 

/*document.querySelector('#eraseButton').addEventListener("click", function() {
  if (isErasing = false){
    console.log("erasing");
    isErasing = true;
    document.querySelector('#eraseButton').value = 'on';
  }
  else if (isErasing = true){
    isErasing = false;
    document.querySelector('#eraseButton').value = 'off';    
  }
}); */


document.querySelector('#submitButton').addEventListener("click",function(){
  circleRad = document.querySelector('input#brushSize').value;
});

     
window.addEventListener('resize', resizeCanvas, false);
