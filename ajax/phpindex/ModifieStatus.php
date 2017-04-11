<?php
$con = include __DIR__ . '/../bd.php';

date_default_timezone_set("America/Mexico_City");

$hoy = date("d-m-Y | H:i:s");

$CualPiPo_xD=$_POST['mensaje'];
$CualPiPo_xD2=$_POST['mensaje2'];
$AreaSelected=$_POST['mensaje3'];

$sql = "UPDATE personas SET estatus_entrada=1 WHERE id='$CualPiPo_xD'";

$sql2 = "INSERT INTO historyinsides VALUES(0,'Entrada', '$hoy','$CualPiPo_xD','$CualPiPo_xD2', '$AreaSelected')";
$con->query($sql2);

if($result=$con->query($sql)){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}

?>