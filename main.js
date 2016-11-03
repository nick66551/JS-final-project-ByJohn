//設定畫布環境
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 50;

//找出圖片
var bgImg = document.createElement("img");
bgImg.src = "images/mapwithwater.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";
var towerImg = document.createElement("img");
towerImg.src = "images/tower-btn.png";
var towerbuiltImg = document.createElement("img");
towerbuiltImg.src = "images/tower.png";

//路徑
var enemyPath = [
{x:64, y:92},
{x:224,y:92},
{x:224,y:220},
{x:320,y:220},
{x:320,y:314},
{x:192,y:314},
{x:192,y:378},
{x:416,y:378},
{x:416,y:314},
{x:512,y:314}
]
//變數用
var enemy ={
  pathDes: 0,
  x: 64,
  y: 480-32,
  speedx:0,
  speedy:-64,
  move: function(){
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y,this.x,this.y, this.speedx/FPS, this.speedy/FPS)){
        this.x = enemyPath[this.pathDes].x;
        this.y = enemyPath[this.pathDes].y;
        this.pathDes++;
        console.log("gogog")
      if(this.x>enemyPath[this.pathDes].x){
      this.speedx=-64;
      this.speedy = 0;
    } 
      else if(this.x<enemyPath[this.pathDes].x){
      this.speedx=64;
      this.speedy=0;
    }
      else if(this.y<enemyPath[this.pathDes].y){
      this.speedx=0;
      this.speedy=64;
    }
      else{
      this.speedx=0;
      this.speedy=-64;
      }}
      else{
    this.x=this.x+this.speedx/FPS;
    this.y=this.y+this.speedy/FPS;
      }
  
  }

};
var towerbutton={
  x: 525,
  y: 432,
  width: 50,
  height: 50
};

//畫畫
function draw(){

  enemy.move();
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(enemyImg,enemy.x,enemy.y);
  ctx.drawImage(towerImg,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
  if(isBuilding){
  ctx.drawImage(towerbuiltImg,cursor.x,cursor.y);
  }
  ctx.drawImage(towerbuiltImg,tower.x,tower.y);
}

//製造城堡
var isBuilding = false;
var tower={};
var cursor = {};
$( "#game-canvas" ).on( "click", function(){
  if(isCollided(cursor.x, cursor.y, 540, 432, 50, 50)){
    if(isBuilding){
    isBuilding= false;
  }
    else{
    isBuilding = true;
  }
  }
  else if(isBuilding){
  tower.x=cursor.x-cursor.x%32;
  tower.y=cursor.y-cursor.y%32;
  isBuilding=false;
  }
  
 
});



//抓出遊標
$( "#game-canvas" ).on( "mousemove", function( event ) {
cursor = {
x: event.offsetX,
y: event.offsetY
};
});
  





//判斷之間

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}
setInterval(draw, 1000/FPS);
