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
  //Le damos comportamiento a los e
  $(".projectVideo").draggable();
  $('.projectVideo').css('display', "block");
  $(".projectFoto").draggable();
  $('.projectFoto ').css('display', "block");
  //Ocultamos todos:
  $('.projectVideo').hide();
  $('.projectFoto').hide();
  addListenerToRadio();
  addHoverListenerToRadio();
  showProjectGarden();//Mostramos el primero
  //resize canvas
  resizeCanvas();
  //Create svg elements
  createExes();
  animate();
});

function addHoverListenerToRadio(){
  for(let i = 1; i < 7; i++){
    $("#projectRadio" + i).hover(function(){
      $('.tooltipRadio').show();
      let name = $('#projectRadio' + i).attr('name');
      $('.tooltipRadio').text(name);
    }, function(){
      $('.tooltipRadio').hide();
    });
  }
}

function addListenerToRadio(){
  for(let i = 1; i < 7; i++ ){
    $('#projectRadio' + i).click(function(){
      if($(this).attr("func") == "funInTheGarden"){
        showProjectGarden();
      } else if($(this).attr("func") == "Tunel"){
        showProjectTunel();
      }else if($(this).attr("func") == "Gifs"){
        showGifs();
      }
  });
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideAllProjects() {
  $('.projectVideo').fadeOut(500);
  $('.projectFoto').fadeOut(500);
}

function showProjectTunel() {
  hideAllProjects();
  $('#title-radio-project').text("Tunel ➡️")
  let elementsTunel = [];
  elementsTunel.push($('#projectTunelVideo').fadeIn(1000));
  $('#iframeTunel').attr('src', 'https://drive.google.com/file/d/198Boh4Ekhn79jT54eDYQP7IciP09GbUj/preview');
  elementsTunel.push($('#tunelFoto1').fadeIn(1000));
  elementsTunel.push($('#tunelFoto2').fadeIn(1000));
  elementsTunel.push($('#tunelFoto3').fadeIn(1000));
  elementsTunel.push($('#tunelFoto4').fadeIn(1000));
  elementsTunel.forEach(element => {
    applyRandomLeft(element);
  });
}

function showProjectGarden() {
  $('#title-radio-project').text("Fun in the garden ➡️")
  hideAllProjects();
  var element =  $('#projectFunGarden')
  $(element).fadeIn(1000);
  applyRandomLeft(element);
}

function showGifs(){
  $('#title-radio-project').text("Misc Gifs ➡️")
  hideAllProjects();
  var element1 = $('#gif1');
  var element2 = $('#gif2');
  $(element1).fadeIn(1000);
  $(element2).fadeIn(1000);
  applyRandomLeft(element1);
  applyRandomLeft(element2);
}

function applyRandomLeft(element){
  var left = getRandomInt(1, $(window).width() - 300);
  $(element[0]).css('left', left + 'px');
}

function resizeCanvas() {
  var canvas = document.getElementById("myCanvas");
  canvas.width = percentage(90, $(window).width());
  canvas.height = percentage(60, $(window).height())
}

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2)
}

function closeProject(id, iframeId) {
  $('#' + id).fadeOut(500);
  if (iframeId) $('iframe').attr('src', $('iframe').attr('src'));
}

function goToInstagram() {
  window.open("mailto:meteomartinm@gmail.com")
}


//SVG ANIMATION
function createExes() {
  for (var i = 0; i < 3000; i++) {
    xs.push(i);
  }
}

function animate() {
  let points = xs.map(x => {
    let y = 40 + 20 * Math.sin((x + t) / 30)
    return [x, y]
  })
  let path = "M" + points.map(p => {
    return p[0] + "," + p[1]
  }).join(" L")
  document.querySelector("path").setAttribute("d", path)
  t += 0.7
  requestAnimationFrame(animate);
}