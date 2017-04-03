<?php

$con = include __DIR__ . '/../bd.php';

date_default_timezone_set('UTC');
date_default_timezone_set("America/Mexico_City");

$hoy = date("d-m-Y | H:i:s");

$CualPiPo_xD=$_POST['mensaje'];
$CualPiPo_xD2=$_POST['mensaje2'];

$sql = "UPDATE personas SET estatus_entrada=0 WHERE id='$CualPiPo_xD'";

$sql2 = "INSERT INTO historyinsides VALUES(0,'Salida', '$hoy','$CualPiPo_xD','$CualPiPo_xD2')";
$con->query($sql2);

if($result=$con->query($sql)){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}
	
	

?>