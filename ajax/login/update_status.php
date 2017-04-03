<?php

$con = include __DIR__ . '/../bd.php';

$iddd=$_POST['mensaje'];

$sql = "UPDATE numeros_de_control SET sessionn=1 WHERE persona_id='$iddd'";

$con->query($sql);

?>

