
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");



var bgImg = document.createElement("img");
bgImg.src = "images/mapwithwater.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";
var towerImg = document.createElement("img");
towerImg.src = "images/tower-btn.png";
var towerbuiltImg = document.createElement("img");
towerbuiltImg.src = "images/tower.png";
var enemy ={
  x: 115,
  y: 480-32
};


function draw(){
  ctx.drawImage(bgImg,50,0);
  ctx.drawImage(enemyImg,enemy.x,enemy.y);
  ctx.drawImage(towerImg,590,432,50,50);
  ctx.drawImage(towerbuiltImg,cursor.x,cursor.y);

}

var cursor = {};
$( "#game-canvas" ).on( "mousemove", function( event ) {
cursor{
x: event.offsetX
y: event.offsetY
}
  
setInterval(draw, 16);
});
