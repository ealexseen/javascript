var map,
    ctxMap,
    player,
    enemy = [],
    bullet = [],
    isPlaying,
    bulletStatus = false;


/* For creating enemies */
var spawnAmount = 50;
/* end For creating enemies */

var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

var parents = new function(){
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.background = new Image();
    this.player = new Image();
};

var method = new function(){
    this.canvasWH = function(canvas, width, height){
        canvas.height = height;
        canvas.width = width;
    };
    this.background = function(ctx, bg, width, height){
        var heightImg = bg.height,
            widthImg = bg.width;

        ctx.drawImage(bg, 0, 0, 1200, 900, 0, 0, width, height);
    };
    this.getObject = function(ctx, bg, widthObjVal, heightObgVal){
        var heightObj = heightObgVal,
            widthObj = widthObjVal;

        ctx.drawImage(bg, 0, 0, widthObj, heightObj, 0, 0, widthObj, heightObj);
    };

    /* up date */
    this.draw = function(){

        player.draw();

        for(var i = 0; i < enemy.length; i++){
            enemy[i].draw();
        }

        for(var r = 0; r < bullet.length; r++){
            bullet[r].draw();
        }

        requestAnimFrame(method.loop);
    };
    this.update = function(){
        player.update();

        for(var i = 0; i < enemy.length; i++){
            enemy[i].update();
        }

        method.spawnBullet();

        for(var r = 0; r < bullet.length; r++){
            bullet[r].update();
        }
    };
    this.loop = function(){
        if(isPlaying){

            method.background(ctxMap, parents.background, parents.canvasWidth, parents.canvasHeight);

            method.draw();

            method.update();

        }
    };
    /* end up date */

    this.startLoop = function(){
        isPlaying = true;
        method.loop();
    };
    this.stopLoop = function(){
        isPlaying = false;
    };

    this.checKeyDown = function(e){
        var keyID = e.keyCode || e.which;
        var keyChar = String.fromCharCode(keyID);

        if(keyChar == 'W'){
            player.isUp = true;
            e.preventDefault();
        }
        if(keyChar == 'S'){
            player.isDown = true;
            e.preventDefault();
        }
        if(keyChar == 'A'){
            player.isLeft = true;
            e.preventDefault();
        }
        if(keyChar == 'D'){
            player.isRight = true;
            e.preventDefault();
        }
    };
    this.checKeyUp = function(e){
        var keyID = e.keyCode || e.which;
        var keyChar = String.fromCharCode(keyID);

        if(keyChar == 'W'){
            player.isUp = false;
            e.preventDefault();
        }
        if(keyChar == 'S'){
            player.isDown = false;
            e.preventDefault();
        }
        if(keyChar == 'A'){
            player.isLeft = false;
            e.preventDefault();
        }
        if(keyChar == 'D'){
            player.isRight = false;
            e.preventDefault();
        }
    };
    this.spawnEnemy = function(count){
        for(var i = 0; i < count; i++){
            enemy[i] = new Enemy();
        }
    };
    this.updateStart = function(hp, x, y){
        ctxMap.fillStyle = '#fff';
        ctxMap.font = 'bold 15px Arial';
        ctxMap.fillText('HP: ' + hp, x, y-5);
    };

    /* статус выстрела */
    this.bulletTrue = function(){
        bulletStatus = true;
    };
    this.bulletFalse = function(){
        bulletStatus = false;
    };
    /* end статус выстрела */
    this.bulletCoords = function(e){
        method.mouseX = e.offsetX;
        method.mouseY = e.offsetY;
    };
    this.spawnBullet = function(){
        if(bulletStatus){
            var x = this.mouseX - player.drawX,
                y = this.mouseY - player.drawY,
                radiants = Math.atan2(x,y),
                angle = radiants * (180/Math.PI);

            var bulletMain = new Bullet(player.drawX+37, player.drawY+8);

            bulletMain.speedX = bulletMain.speed * Math.sin(radiants);
            bulletMain.speedY = bulletMain.speed * Math.cos(radiants);

            bullet.push(bulletMain);
        }
    }
};


Player.prototype.draw = function(){
    ctxMap.drawImage(parents.player, this.srcX, this.srcY, this.width, this.height,
                                    this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function(){
    method.updateStart(this.hp, this.drawX, this.drawY);

    if(this.hp < 0) this.hp = 100;

    //  player.splice(player.indexOf(this), 1);

    if(this.drawX < 0) this.drawX = 0;
    if(this.drawX > parents.canvasWidth - this.width) this.drawX = parents.canvasWidth - this.width;
    if(this.drawY < 0) this.drawY = 0;
    if(this.drawY > parents.canvasHeight - this.height) this.drawY = parents.canvasHeight - this.height;

    for(var i = 0; i < enemy.length; i++){
        if(this.drawX + this.width >= enemy[i].drawX &&
            this.drawX <= enemy[i].drawX + this.width &&
            this.drawY + this.height >= enemy[i].drawY &&
            this.drawY <= enemy[i].drawY + this.height){
            this.hp--;
        }
    }
    this.chooseDir();
};

Player.prototype.chooseDir = function(){
    if(this.isUp){
        this.drawY -= this.speed;
    }
    if(this.isDown){
        this.drawY += this.speed;
    }
    if(this.isLeft){
        this.drawX -= this.speed;
    }
    if(this.isRight){
        this.drawX += this.speed;
    }
};

Enemy.prototype.draw = function(){
    ctxMap.drawImage(parents.player, this.srcX, this.srcY, this.width, this.height,
                                    this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function(){
    method.updateStart(this.hp, this.drawX, this.drawY);

    if(this.hp <= 0) enemy.splice(enemy.indexOf(this), 1);

    if(this.drawX + this.width >= player.drawX &&
        this.drawX <= player.drawX + this.width &&
        this.drawY + this.height >= player.drawY &&
        this.drawY <= player.drawY + this.height){
        this.hp--;
    }

    this.drawX -= this.speed;
    if(this.drawX + parents.canvasWidth < 0){
        this.drawX = parents.canvasWidth + 100;
    }
};

Enemy.prototype.destroy = function(){
    enemy.splice(enemy.indexOf(this), 1);
};

Bullet.prototype.draw = function(){
    ctxMap.fillStyle = '#000';
    ctxMap.beginPath();
    ctxMap.arc(this.drawX, this.drawY, this.radius, 0, 2*Math.PI);
    ctxMap.fill();
};

Bullet.prototype.update = function(){
    this.drawX += this.speedX;
    this.drawY += this.speedY;

    if(this.drawX < 0 || this.drawX > parents.canvasWidth || this.drawY < 0 || this.drawY > parents.canvasHeight){
        bullet.splice(bullet.indexOf(this), 1);
    }

    for(var i = 0; i < enemy.length; i++){
        if(this.drawX + this.radius >= enemy[i].drawX &&
            this.drawX <= enemy[i].drawX + enemy[i].width &&
            this.drawY + this.radius >= enemy[i].drawY &&
            this.drawY <= enemy[i].drawY + enemy[i].height){

            enemy[i].hp = enemy[i].hp - this.damage;
            bullet.splice(bullet.indexOf(this), 1);
        }
    }

};

parents.background.src = 'images/background.jpg';
parents.player.src = 'images/sprite.png';

$(window).load(function(){

    map = document.getElementById('games');
    ctxMap = map.getContext('2d');

    method.canvasWH(map, parents.canvasWidth, parents.canvasHeight);
    method.background(ctxMap, parents.background, parents.canvasWidth, parents.canvasHeight);

    player = new Player();

    method.spawnEnemy(spawnAmount);

    method.startLoop();

    document.addEventListener('keydown', method.checKeyDown, false);
    document.addEventListener('keyup', method.checKeyUp, false);

    document.addEventListener('mousedown', method.bulletTrue, false);
    document.addEventListener('mouseup', method.bulletFalse, false);
    document.addEventListener('mousemove', method.bulletCoords, false);

});

