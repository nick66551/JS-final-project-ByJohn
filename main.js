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
{x:512,y:314},
{x:512,y:90}
];
//敵人唷

function Enemy() {
this.x = 64;
    this.y = 480-32;
    this.speedX = 0;
    this.speedY = -64;
    this.pathDes = 0;
    this.speed = 64;
    this.move = function(){
        if( isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, speed/FPS, speed/FPS) ){

            // 首先，移動到下一個路徑點
            this.x = enemyPath[this.pathDes].x;
            this.y = enemyPath[this.pathDes].y;

            // 指定下一個路徑點
            this.pathDes++;

            // 重新設定設定前往目標路徑點的所需的水平/垂直速度
            if (enemyPath[this.pathDes].x>this.x) {
              this.speedX = 64;
              this.speedY = 0;
            } else if (enemyPath[this.pathDes].x<this.x) {
              this.speedX = -64;
              this.speedY = 0;
            } else if (enemyPath[this.pathDes].y>this.y) {
              this.speedX = 0;
              this.speedY = 64;
            } else if (enemyPath[this.pathDes].y<this.y) {
              this.speedX = 0;
              this.speedY = -64;
            }

        } else {
            this.x = this.x + this.speedX/FPS;
            this.y = this.y + this.speedY/FPS;
        }
    };
}
var enemies = [];
var clock=0;

var towerbutton={
  x: 525,
  y: 432,
  width: 50,
  height: 50
};

//畫畫
function draw(){
  if ( clock%80==0 ){
	
  enemies.push(new Enemy());
}
  ctx.drawImage(bgImg,0,0);
  for(var i=0; i<enemies.length; i++){
  enemies[i].move();
  ctx.drawImage(enemyImg, enemies[i].x, enemies[i].y);
}
  ctx.drawImage(towerImg,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
  if(isBuilding){
  ctx.drawImage(towerbuiltImg,cursor.x,cursor.y);
  }
  ctx.drawImage(towerbuiltImg,tower.x,tower.y);
  clock++;
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
