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
  mobileCheck();
  //Le damos comportamiento a los e
  $(".projectVideo").draggable({
    stack: "div"
  });
  $('.projectVideo').css('display', "block");
  $(".projectFoto").draggable({
    stack: "div"
  });
  $('.projectFoto').css('display', "block");
  //Ocultamos todos:
  $('.projectVideo').hide();
  $('.projectFoto').hide();
  addListenerToRadio();
  addHoverListenerToRadio();
  showProjectGarden(); //Mostramos el primero
  resizeCanvas();
  createExes();
  animate();
  $('#title-radio-project').text("Click para ver proyectos ➡️")
});



function mobileCheck() {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  if (check) {
    alert("Te recomendamos que para una mejor experiencia de usuario, veas la web desde desktop")
  }
}

function addHoverListenerToRadio() {
  for (let i = 1; i < 8; i++) {
    $("#projectRadio" + i).hover(function () {
      $('.tooltipRadio').show();
      let name = $('#projectRadio' + i).attr('nameTooltip');
      $('.tooltipRadio').text(name);
    }, function () {
      $('.tooltipRadio').hide();
    });
  }
}


function addListenerToRadio() {
  for (let i = 1; i < 8; i++) {
    $('#projectRadio' + i).click(function () {
      var funcName = $(this).attr("func");
      hideAllProjects();
      window[funcName]();
      $('#title-radio-project').text($(this).attr("nameTooltip") + " ➡️")
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
  $('#iframeGarden').attr("src", "");
  $('#iframeTunel').attr("src", "");
}

function showProjectTunel() {
  var values = [$('#projectTunelVideo'), $('#tunelFoto1'), $('#tunelFoto2'), $('#tunelFoto3'), $('#tunelFoto4')];
  $('#iframeTunel').attr('src', 'https://drive.google.com/file/d/198Boh4Ekhn79jT54eDYQP7IciP09GbUj/preview');
  showProject(values);
}

function showProjectGarden() {
  $('#iframeGarden').attr("src", 'https://drive.google.com/file/d/1_Wx2GBKB-xbaAMiW9jzQCKtAeYX0b0Nq/preview');
  var values = [$('#projectFunGarden')]
  showProject(values);
}

function showGifs() {
  var values = [$('#gif1'), $('#gif2')];
  showProject(values);
}

function showIlustrations() {
  var values = [$('#ilustracion1'), $('#ilustracion2'), $('#ilustracion3')];
  showProject(values);
}

function showAbandonedGrafitti() {
  var values = [('#grafittiAbandoned1'), ('#grafittiAbandoned2'), ('#grafittiAbandoned3')]
  showProject(values);
}

function showDownHere() {
  var values = [$('#downhere1'), $('#downhere2'), $('#downhere3'), $('#downhere4'), $('#downhere5'), $('#downhere6'), $('#downhere7')];
  showProject(values);
}

function showLinephoto() {
  var values = [$('#linephoto1'), $('#linephoto2'), $('#linephoto3'),
    $('#linephoto5'), $('#linephoto6'), $('#linephoto7'),
    $('#linephoto8'), $('#linephoto9'), $('#linephoto10'), $('#linephoto11')
  ]
  showProject(values);
}

function showProject( /* [] array of selectors*/ elements, hideAll = true) {
  elements.forEach(function (ele) {
    $(ele).fadeIn(1000);
    applyRandomLeft(ele);
    applyRandomTop(ele);
  })
}

function applyRandomLeft(element) {
  var left = getRandomInt(1, $(window).width() - 300);
  $(element[0]).css('left', left + 'px');
}

function applyRandomTop(element) {
  var top = getRandomInt(1, $(window).height() - 300);
  $(element[0]).css('top', top + 'px');
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
  var rnd = Math.floor(Math.random() * 2);
  switch (rnd) {
    case 0:
      $('#' + id).fadeOut(500);
      break;
    case 1:
      $('#' + id).slideUp(500);
      break;

  }

  if (iframeId) $('iframe').attr('src', $('iframe').attr('src'));
}

function goToInstagram() {
  window.open("https://www.instagram.com/tamosbie/")
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