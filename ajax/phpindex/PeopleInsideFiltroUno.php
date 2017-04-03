<?php
$con = include __DIR__ . '/../bd.php';

$sql = "SELECT personas.nombre, numeros_de_control.numero FROM personas
		LEFT JOIN numeros_de_control ON numeros_de_control.persona_id=personas.id
		WHERE personas.estatus_entrada=1";

if($result=$con->query($sql)){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}
	
	

?>