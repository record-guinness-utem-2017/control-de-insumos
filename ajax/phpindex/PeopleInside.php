<?php
$con = include __DIR__ . '/../bd.php';

$sql = "SELECT COUNT(*) as cantidad FROM personas WHERE estatus_entrada=1";

if($result=$con->query($sql)){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}
	
	

?>