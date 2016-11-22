//設定畫布環境
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
    ctx.font = "28px Arial";
    ctx.fillStyle = "white";
var FPS = 50;
var clock=0;
var treehp=100;
var money=25;
var score=0;
var enemies=[];
var towers=[];
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";
//找出圖片
var bgImg = document.createElement("img");
bgImg.src = "images/mapwithwater.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/toy.png";
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
this.hp= 10;
    this.y = 480-32;
    this.speedX = 0;
    this.speedY = -64;
    this.pathDes = 0;
    this.speed = 64;
    this.move = function(){
        if( isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, this.speed/FPS, this.speed/FPS) ){

            if (this.pathDes === enemyPath.length-1) {
                this.hp=0;
                treehp -= 10;
               
            }
           
            else{
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
           }
        } else {
            this.x = this.x + this.speedX/FPS;
            this.y = this.y + this.speedY/FPS;
        }
    };
}

var enemy=new Enemy();
var towerbutton={
  x: 525,
  y: 432,
  width: 50,
  height: 50
};

//畫畫
function draw(){
  
    ctx.drawImage(bgImg,0,0);
  if(clock%80==0){
  var newenemy= new Enemy();
  enemies.push(newenemy);
  }
  
  // 設定與印出文字

  ctx.fillText( "HP:"+treehp , 20, 20 );
  ctx.fillText( "Money:"+money , 20, 40 );
  ctx.fillText( "Score:"+score , 20, 60 );

  //敵人移動    
  for(var i=0;i<enemies.length;i++){
      
      if (enemies[i].hp<=0) {
           enemies.splice(i,1);
           money+=25;
           score+=25;
      }
      
    enemies[i].move();
    ctx.drawImage(enemyImg, enemies[i].x, enemies[i].y);   
  
  } 

 
    
  ctx.drawImage(towerImg,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
  if(isBuilding){
  ctx.drawImage(towerbuiltImg,cursor.x,cursor.y);
  }
    
 for(var i=0;i<towers.length;i++){
  ctx.drawImage(towerbuiltImg,towers[i].x,towers[i].y);  
  towers[i].searchEnemy();
  if(towers[i].aimingEnemyId!=null){
  var id = towers[i].aimingEnemyId;
  ctx.drawImage(crosshairImg,enemies[id].x,enemies[id].y);    
      
  }   
  
 }
  clock++;

}

//製造城堡
var isBuilding = false;
function Tower(x,y){
    this.x=x;
    this.y=y;
    this.range=96;
    this.aimingEnemyId=null;
    this.fireRate=1; 
    this.readyToShootTime=1;
    this.damage=5;
    this.searchEnemy=function(){
        
        this.readyToShootTime -= 1/FPS;
        

       for(var i=0; i<enemies.length; i++){
           var distance = Math.sqrt( 
           Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2) 
           );
       if (distance<=this.range) {
           this.aimingEnemyId = i;
           
           if(this.readyToShootTime<=0) {
           this.shoot(i);
           this.readyToShootTime = this.fireRate;
                }

           return;
             }
           }
         // 如果都沒找到，會進到這行，清除鎖定的目標
           this.aimingEnemyId = null;
           };
     this.shoot=function(id){
         ctx.beginPath(); // 開始畫線
         ctx.moveTo(this.x, this.y); // 先將畫筆移動到 (x1, y1)
         ctx.lineTo(enemies[id].x, enemies[id].y); // 畫一條直線到 (x2, y2)
         ctx.strokeStyle = 'red'; // 設定線條顏色
         ctx.lineWidth = 3; // 設定線條寬度
         ctx.stroke(); // 上色
         enemies[id].hp = enemies[id].hp - this.damage;


           };
         };
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
  else if(isBuilding&&money>=25){
  towers.push(new Tower(cursor.x-cursor.x%32,cursor.y-cursor.y%32));
  money-=25;
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
