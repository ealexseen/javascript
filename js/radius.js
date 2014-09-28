window.onload = function(){

    var canvas = document.getElementById('radius');
    var context = canvas.getContext('2d');
    var radius = 60;

    var WH = function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    /* height width (onload, resize) */
    WH();

    $(window).resize(function(){
        WH();
    });

    /* end height width (onload, resize) */

    var putPoint = function(e){
        context.beginPath();

        context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);

        context.fill();
    }

    canvas.addEventListener('mousedown', putPoint, false);

}



