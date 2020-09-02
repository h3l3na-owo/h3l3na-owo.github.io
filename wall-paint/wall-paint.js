const canvas = document.querySelector('canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const position = document.querySelector('#position');
const colorPicker = document.querySelector('select#color');
let color = 'rgb(20,250,20)'; 
let e = window.event;
let isDrawing = false;
let circleRad = 25;
let prevX = null;
let prevY = null;



//let posX = e.clientX;
//let posY = e.clientY;


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
    console.log("distance: "+distance);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth=circleRad*2;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x,y);
    ctx.stroke();
  }

  //draw circle
  ctx.fillStyle = color;
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

document.querySelector('#resetButton').addEventListener("click", function() {
  ctx.clearRect(0,0,width,height);
});
   
document.querySelector('#submitButton').addEventListener("click",function(){
  circleRad = document.querySelector('input#brushSize').value;
})
      
