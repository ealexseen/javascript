/*function sayHi(person){
    alert('Привет, ' + person);
}
var func = sayHi;
func('Вася');
sayHi('Маша');*/

window.onload = init;

function init(){
    var time = document.getElementsByClassName('time')[0],
        timer = document.getElementsByClassName('timer')[0];

    var now = new Date(),
        week = now.getDay();

    function getWeekDay(){
        var day = ['вс','пн','вт','ср','чт','пт','сб'],
            month = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
            date = now.getDate() + ' ' + month[now.getMonth()] + ' ' + now.getFullYear();

        time.innerText = 'сегодня ' + day[week] + ': ' + date + ' ' + now.getSeconds() + ' года';
    }

    var iframeGame = document.getElementById('iframeGame'),
        iframeGameWidth = 1000,
        iframeGameHeight = 800;

    iframeGame.width = iframeGameWidth;
    iframeGame.height = iframeGameHeight;

    /* таймер обратного отсчёта */
    var sec = 9999;

    var arrayNum = sec.toString().split(''),
        arrayNumLength = arrayNum.length;

    for(var i = 0; i < arrayNumLength; i++){
        $('#displayTimers').prepend('<span class="num' + i + '"></span>');
    }

    function timers(){
        sec--;

        var arrayNumMain = sec.toString().split('');

        $('#displayTimers span').each(function(i){
            var self = $(this);
            self.text(arrayNumMain[i]);
        });

        if(sec == 0){
            $('#displayTimers').fadeOut();
            $('.title').fadeOut();
            $('#iframeGame').show();
        }

        setTimeout(timers, 1000);
    }
    timers();

    var video = document.getElementById('video'),
        audio = document.getElementById('Audio');

    var audioMethod = new function(){
        this.play = function(){
            audio.play();
        };
        this.pause = function(){
            audio.pause();
        };
        this.reload = function(){
            audio.load();
        };
        this.clickAudio = function(){
            var menu__audioSpan = $('.menu__audio span');

            menu__audioSpan.on('click', function(){
                var self = $(this);

                if(!self.hasClass('active') && self.hasClass('menu__pause')){
                    menu__audioSpan.removeClass('active');
                    self.addClass('active');
                    audioMethod.pause();
                } else if (self.hasClass('menu__play')){
                    menu__audioSpan.removeClass('active');
                    self.addClass('active');
                    audioMethod.play();
                } else if (self.hasClass('menu__load')){
                    menu__audioSpan.removeClass('active');
                    self.addClass('active');
                    audioMethod.play();
                }
            });
        };
        this.mouseOver = function(){
            var menu__audioSpan = $('.menu__audio span');

            menu__audioSpan.on({
                mouseenter: function(){
                    var self = $(this),
                        selfI = self.find('i');

                    selfI.stop().animate({
                        width: '100%',
                        height: '100%'
                    }, 100);
                },
                mouseleave: function(){
                    var self = $(this),
                        selfI = self.find('i');

                    selfI.stop().animate({
                        width: '0%',
                        height: '0%'
                    }, 100);
                }
            })
        }
    };

    audioMethod.clickAudio();
    audioMethod.mouseOver();
    audio.autoplay = true;
    video.autoplay = true;

    function videoF(){
        video.play();
        setTimeout(videoF, 0);
    }
    videoF();
    /* end таймер обратного отсчёта */
}




