/* object */
var Player = function(){
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 55;
    this.height = 34;

    /* key */
    this.isUp = false;
    this.isDown = false;
    this.isRight = false;
    this.isLeft = false;
    /* end key */

    this.speed = 5;
    this.hp = 100;
}

var Enemy = function(){
    this.srcX = 0;
    this.srcY = 34;
    this.drawX = Math.floor(Math.random() * parents.canvasWidth) + parents.canvasWidth;
    this.drawY = Math.floor(Math.random() * parents.canvasHeight);
    this.width = 55;
    this.height = 34;

    this.speed = 1,
    this.hp = 100;
}
/* end object */

var Bullet = function(x,y){
    this.drawX = x;
    this.drawY = y;
    this.radius = 30;
    this.speed = 10;
    this.damage = 50;
}