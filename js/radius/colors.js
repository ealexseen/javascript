var colors = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

var swatches = document.getElementsByClassName('swatch');

for(var i = 0, n = colors.length; i < n; i++){
    var swatch = document.createElement('li');

    swatch.className = 'swatch';
    swatch.style.backgroundColor = colors[i];

    swatch.addEventListener('click', setSwatch, false);

    document.getElementById('colors').appendChild(swatch);
}

function setColors(color){
    context.fillStyle = color;
    context.strokeStyle = color;

    var active = document.getElementsByClassName('active')[0];
    if(active){
        active.className = 'swatch';
    }
}

function setSwatch(e){
    var swatch = e.target;

    setColors(swatch.style.backgroundColor);

    swatch.className += ' active';
}

//setSwatch({target: document.getElementsByClassName('swatch')[0]});
