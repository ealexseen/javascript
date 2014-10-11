<?php

$file = $_GET['file'];

header('Content-Type: image/png');
header('Content-disposition: attachment; filename=canvassoutput.png');

readfile($file);
?>