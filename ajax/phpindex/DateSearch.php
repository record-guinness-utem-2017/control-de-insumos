<?php
$con = include __DIR__ . '/../bd.php';

$mensaje=$_POST['mensaje'];

$sql = "SELECT historyinsides.dato, historyinsides.time, historyinsides.Por,
		personas.nombre FROM historyinsides
		LEFT JOIN personas ON historyinsides.id_person=personas.id
		WHERE time LIKE '%$mensaje%' OR personas.nombre LIKE '%$mensaje%'";

if($result=$con->query($sql)){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}
	
	

?>