
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");



var bgImg = document.createElement("img");
bgImg.src = "images/map.png";


function draw(){
  ctx.drawImage(bgImg,50,20);

}
draw();
