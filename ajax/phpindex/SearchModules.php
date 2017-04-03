<?php
$con = include __DIR__ . '/../bd.php';

$mensaje=$_POST['mensaje'];

$sql = "SELECT module FROM numeros_de_control WHERE persona_id='$mensaje'";

if($result=$con->query($sql)){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}
	
	//update numeros_de_control set module='1,1,1,1';

?>