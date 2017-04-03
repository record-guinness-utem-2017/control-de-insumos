<?php

	$con = include __DIR__ . '/../bd.php';

	$CualPiPo_xD=$_POST['mensaje'];

	$sql = "SELECT numeros_de_control.* , personas.nombre, personas.estatus_entrada, personas.id FROM numeros_de_control
	LEFT JOIN personas ON numeros_de_control.persona_id=personas.id WHERE numeros_de_control.numero ='$CualPiPo_xD'";

	if($result=$con->query($sql)){
		$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($json, JSON_PRETTY_PRINT);
	}
	
	

?>