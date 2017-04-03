<?php

$con = include __DIR__ . '/../bd.php';

$numero   = $_POST['mensaje'];
$mensaje2 = $_POST['mensaje2'];

$sql = "SELECT numeros_de_control.numero, numeros_de_control.sessionn, numeros_de_control.rank, numeros_de_control.contra, 
	personas.nombre, personas.id AS 'idPersona'
	FROM numeros_de_control
 	LEFT JOIN personas ON numeros_de_control.persona_id=personas.id 
 	WHERE numeros_de_control.numero='$numero' AND numeros_de_control.contra='$mensaje2'";

if ($result = $con->query($sql) or die($con->error)) {
  $json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
  echo json_encode($json, JSON_PRETTY_PRINT);
}
