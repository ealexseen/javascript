var map,
    ctxMap;

var parents = new function(){
    this.canvasWidth = 1000;
    this.canvasHeight = 800;
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
    }
    this.getObject = function(ctx, bg, widthObjVal, heightObgVal){
        var heightObj = heightObgVal,
            widthObj = widthObjVal;

        ctx.drawImage(bg, 0, 0, widthObj, heightObj, 0, 0, widthObj, heightObj);
    }
};

var Player = function(){
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 120;
}

parents.background.src = 'images/background.jpg';
parents.player.src = 'images/sprite.png';


window.onload = function(){

    map = document.getElementById('games');
    ctxMap = map.getContext('2d');

    method.canvasWH(map, parents.canvasWidth, parents.canvasHeight);
    method.background(ctxMap, parents.background, parents.canvasWidth, parents.canvasHeight);
    method.getObject(ctxMap, parents.player, 55, 34);
};
