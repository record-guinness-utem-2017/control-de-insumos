<?php
$con = include __DIR__ . '/../bd.php';

$mensaje=$_POST['mensaje'];
$sql = "UPDATE numeros_de_control SET sessionn=0 WHERE persona_id='$mensaje'";
$con->query($sql);
	
	

?>