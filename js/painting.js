
var mousePressed = false;
var lastX, lastY;
var ctx;

function InitCanvas() {
  ctx = document.getElementById('myCanvas').getContext("2d");

  $('#myCanvas').mousedown(function (e) {
    mousePressed = true;
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  });

  $('#myCanvas').mousemove(function (e) {
    if (mousePressed) {
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    }
  });

  $('#myCanvas').mouseup(function (e) {
    mousePressed = false;
  });
  $('#myCanvas').mouseleave(function (e) {
    mousePressed = false;
  });
}

function Draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    ctx.strokeStyle = $('#selColor').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.strokeStyle = getSelectedColor();
    ctx.shadowColor = getSelectedColor();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.lineWidth = getWidthOfPainting();
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.stroke();
  }

  lastX = x;
  lastY = y;
}

function getSelectedColor() {
  return $('#canvasColor').val();
}

function getWidthOfPainting() {
  console.log($('#canvasStrokeWidth').val());
  return $('#canvasStrokeWidth').val();
}

function saveCanvas() {
  var canvas = document.getElementById('myCanvas');
  ReImg.fromCanvas(canvas).downloadPng();
}


function clearCanvas() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let xs = [];
let t = 0
$(document).ready(function () {
  InitCanvas();
  $(".projectVideo").draggable();
  $('.projectVideo').css('display', "block");

  createExes();
  animate();
});

//PLAY, PAUSE, CLOSE PROJECT

function pauseVideo(id){
  $('#' + id).get(0).pause();
}

function playVideo(id){
  $('#' + id).get(0).play();
}

function closeProject(id, videoId){
  $('#' + id).fadeOut(500);
  pauseVideo(videoId);
}

function goToInstagram(){
  window.open("mailto:webmaster@example.com")
}



function createExes(){
  for(var i = 0; i < 500; i++){
    xs.push(i);
  }
}

function animate(){
  let points = xs.map(x => {
    
    let y = 200 + 20 * Math.sin((x + t) / 50)
    
    return [x, y]
  })
  
  let path = "M" + points.map(p => {
    return p[0] + "," + p[1]
  }).join(" L")
  
  document.querySelector("path").setAttribute("d", path)
  
  t += 0.5

  requestAnimationFrame(animate);
}