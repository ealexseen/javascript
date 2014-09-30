$(function(){
    $('.button').on('click', function(){
        var self = $(this),
            selfFormName = $('.form input[name="name"]').val(),
            selfFormEmail = $('.form input[name="email"]').val(),
            selfFormText = $('.form textarea[name="text"]').val();

        $.ajax({
            type: 'post',
            url: 'form.php',
            data: {name: selfFormName, email: selfFormEmail, text: selfFormText},
            success: function(data){
                console.log(data);

            },
            beforeSend: function(){
            }
        });

        return false;
    });
});