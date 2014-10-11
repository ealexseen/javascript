var map,
    ctxMap,
    player,
    enemy = [],
    isPlaying;


/* For creating enemies */
var spawnInterval,
    spawnTime = 6000,
    spawnAmount = 3;
/* For creating enemies */

var requestAnimFrame = window.requestAnimationFrame ||
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
    this.draw = function(){
        player.draw();

        for(var i = 0; i < enemy.length; i++){
            enemy[i].draw();
        }

        requestAnimFrame(method.loop);
    };
    this.loop = function(){
        if(isPlaying){
            method.draw();
            method.update();
        }
    };
    this.startLoop = function(){
        isPlaying = true;
        method.loop();
        method.startCreatingEnemies();
    };
    this.stopLoop = function(){
        isPlaying = false;
    };
    this.update = function(){
        player.update();

        for(var i = 0; i < enemy.length; i++){
            enemy[i].update();
        }
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
    this.startCreatingEnemies = function(){
        method.startCreatingEnemies();
        spawnInterval = setInterval(function(){
            method.spawnEnemy(spawnAmount);
        }, spawnTime);
    };
    this.stopCreatingEnemies = function(){
        clearInterval(spawnInterval);
    }
};


Player.prototype.draw = function(){
    method.background(ctxMap, parents.background, parents.canvasWidth, parents.canvasHeight);

    ctxMap.drawImage(parents.player, this.srcX, this.srcY, this.width, this.height,
                                    this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function(){

    if(this.drawX < 0) this.drawX = 0;
    if(this.drawX > parents.canvasWidth - this.width) this.drawX = parents.canvasWidth - this.width;
    if(this.drawY < 0) this.drawY = 0;
    if(this.drawY > parents.canvasHeight - this.height) this.drawY = parents.canvasHeight - this.height;

    this.chooseDir();
}

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
}

Enemy.prototype.draw = function(){

    ctxMap.drawImage(parents.player, this.srcX, this.srcY, this.width, this.height,
                                    this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.update = function(){
    this.drawX -= this.speed;
    if(this.drawX < 0){
        this.drawX = Math.floor(Math.random() * parents.canvasWidth) + parents.canvasWidth;
        this.drawY = Math.floor(Math.random() * parents.canvasHeight);
    }
}


parents.background.src = 'images/background.jpg';
parents.player.src = 'images/sprite.png';


$(window).load(function(){

    map = document.getElementById('games');
    ctxMap = map.getContext('2d');

    method.canvasWH(map, parents.canvasWidth, parents.canvasHeight);
    method.background(ctxMap, parents.background, parents.canvasWidth, parents.canvasHeight);

    player = new Player();

    method.startLoop();

    document.addEventListener('keydown', method.checKeyDown, false);
    document.addEventListener('keyup', method.checKeyUp, false);

});

