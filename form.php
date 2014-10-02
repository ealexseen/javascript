<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $text = $_POST['text'];

    echo $name;
    echo $email;
    echo $text;

    $to      = 'ealexsee@gmail.com';
    $subject = 'the subject';
    $message = $text;
    $headers = 'From:' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
?>