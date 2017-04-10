<?php
$con = include __DIR__ . '/../bd.php';

$sql = "SELECT personas.nombre, numeros_de_control.numero, numeros_de_control.rank FROM personas
		LEFT JOIN numeros_de_control ON numeros_de_control.persona_id=personas.id
		WHERE numeros_de_control.rank is not null";

if($result=$con->query($sql)){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}

?>