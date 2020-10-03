//to do: remove eraser gaps

//to do: make eraser a cirlce

//maybe: change curser & favicon

const canvas = document.querySelector('canvas');
let w;
let h;
const ctx = canvas.getContext('2d');
const position = document.querySelector('#position');
//const eventType = document.querySelector('#evtype');
const wallPicker = document.querySelector('select#wall');
const colorPicker = document.querySelector('select#color');
const music = document.querySelector('audio');
const musicButton = document.querySelector('#musicButton');
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

function playMusic() {
  music.play();
}

function stopMusic() {
  music.pause();
}

function mouseCircle(x, y){

  //find dot distance
  let distance;
  if(prevY !== null || prevX !== null){
    distance = Math.sqrt((y-prevY)**2+(x-prevX)**2);
  }

  if( isErasing){
    ctx.globalCompositeOperation = "destination-out";
  }
  else{
    ctx.globalCompositeOperation = 'source-over';
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
  //ctx.strokeStyle = 'rgb(red, green, blue)';

  ctx.beginPath();
  ctx.arc(x, y, circleRad, degToRad(0), degToRad(360), false);
  ctx.fill();

  //save previous x,y
  prevX = x;
  prevY = y; 
}

function playMusic() {
  music.play();
  console.log("mus");
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var x = evt.type === "mousemove" ? evt.clientX : evt.touches[0].clientX;
  var y = evt.type === "mousemove" ? evt.clientY : evt.touches[0].clientY;
  return {

    x: x - rect.left,
    y: y - rect.top
  };
}


function trackMouse(evt){
  //if (evt.type === "mousemove"){
    //console.log(evt);
    var mousePos = getMousePos(canvas, evt);
    var message = mousePos.x + ',' + mousePos.y;
    position.textContent = 'X;Y:'+ message;
    //eventType.textContent = evt.type;
    if(isDrawing === true || evt.type==="touchmove"){
        mouseCircle(mousePos.x, mousePos.y);
    }
    evt.preventDefault();
}

function erasingOn(){
  document.body.style.cursor = 'crosshair';
  isErasing = true;
  document.querySelector('#eraseButton').value = 'on';
}

function erasingOff(){
    document.body.style.cursor = 'default';
    isErasing = false;
    document.querySelector('#eraseButton').value = 'off';
}

function stopDraw(){
   isDrawing = false; 
   prevX=null;
   prevY=null; 
   document.body.style.cursor = isErasing ? 'crosshair' : 'default';
   event.preventDefault();
}

canvas.addEventListener('mousedown', function(){
  isDrawing = true;
  document.body.style.cursor = 'pointer';
  //console.log(ctx.globalCompositeOperation);
});

canvas.addEventListener('mousemove', trackMouse, false);
canvas.addEventListener('mouseup', stopDraw, false);
canvas.addEventListener('mouseout', stopDraw, false);


canvas.addEventListener('touchstart', trackMouse, false, {passive: true});
canvas.addEventListener('touchmove', trackMouse, false, {passive: true});
canvas.addEventListener('touchend', stopDraw, false);
canvas.addEventListener('touchcancel', stopDraw, false);


colorPicker.addEventListener("change", function(){
  color = colorPicker.value;
  erasingOff();
});



wallPicker.addEventListener("change", function(){
  wall = wallPicker.value;
  document.querySelector('body').style.backgroundImage = wall; 
});

document.querySelector('#resetButton').addEventListener("click", function() {
  ctx.restore();
  ctx.clearRect(0,0,w,h);
});
 
document.querySelector('#musicButton').addEventListener('click', function(){
 if (musicButton.value === "on"){
  stopMusic();
  musicButton.value = "off";
 }
 else {
  playMusic();
  musicButton.value = "on";
 }
});

document.querySelector('#eraseButton').addEventListener("click", function() {
  if (isErasing === false){
    erasingOn();
  }
  else if (isErasing === true){
    erasingOff();
  }
}); 
wallPicker.addEventListener("load", function(){
  console.log("wallpick");
});
window.addEventListener('resize', resizeCanvas, false);

window.addEventListener('DOMContentLoaded', function(){
  console.log('page is fully loaded');
});

document.querySelector('#submitButton').addEventListener("click",function(){
  circleRad = document.querySelector('input#brushSize').value;
});