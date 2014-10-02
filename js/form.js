$(function(){

    $('.form').validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            text: "required"
        },
        messages: {
            name: "Please enter your firstname",
            email: "Please enter a valid email address",
            text: "Please enter your firstname"
        },
        submitHandler: function(form) {
            ajaxSend();
        }
    });


    function ajaxSend(){
        $('.button').each(function(){
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

        });
    }


});