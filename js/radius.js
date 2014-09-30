window.onload = function(){

    var canvas = document.getElementById('radius');
    var context = canvas.getContext('2d');
    var radius = 20;
    var dragging = false;



    var WH = function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    /* height width (onload, resize) */
    WH();

    $(window).resize(function(){
        WH();
    });
    /* end height width (onload, resize) */
    
    context.lineWidth = radius*2;

    var putPoint = function(e){
        if(dragging){
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
            context.fill();
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        }
    };

    var engage = function(e){
        dragging = true;
        putPoint(e);
    }

    var disengage = function(e){
        dragging = false;
        context.beginPath();
    }

    canvas.addEventListener('mousedown', engage, false);
    canvas.addEventListener('mousemove', putPoint, false);
    canvas.addEventListener('mouseup', disengage, false);

};



